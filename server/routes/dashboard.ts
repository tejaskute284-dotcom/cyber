import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { readDb, writeDb } from '../lib/db';

const router = express.Router();

// Get Tips
router.get('/tips', authenticateToken, (req, res) => {
    const db = readDb();
    res.json(db.tips);
});

// Get Education
router.get('/education', authenticateToken, (req, res) => {
    const db = readDb();
    res.json(db.resources);
});

// Get Leaderboard
router.get('/leaderboard', authenticateToken, (req, res) => {
    const db = readDb();
    res.json(db.leaderboard);
});

// Get Settings
router.get('/settings', authenticateToken, (req: AuthRequest, res) => {
    const db = readDb();
    const user = db.users.find((u: any) => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ name: user.name, email: user.email });
});

// Update Settings
router.put('/settings', authenticateToken, (req: AuthRequest, res) => {
    try {
        const { name, email } = req.body;
        const db = readDb();
        const user = db.users.find((u: any) => u.id === req.user.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;

        writeDb(db);
        res.json({ message: "Profile updated successfully", user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Error updating settings" });
    }
});

// Get Dashboard Data
router.get('/', authenticateToken, (req: AuthRequest, res) => {
    try {
        const userId = req.user.id;
        const db = readDb();
        const user = db.users.find((u: any) => u.id === userId);

        if (!user) return res.status(404).json({ error: "User not found" });

        const latestScore = user.scores[user.scores.length - 1];
        const tasks = user.tasks;
        const activities = [
            { id: 1, action: "Login detected", time: "Just now" },
            { id: 2, action: "Assessment completed", time: "1 day ago" }
        ];

        res.json({
            score: latestScore,
            tasks,
            activities
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching dashboard data' });
    }
});

// Toggle Task Completion
router.post('/tasks/:taskId/toggle', authenticateToken, (req: AuthRequest, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.params;

        const db = readDb();
        const user = db.users.find((u: any) => u.id === userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const task = user.tasks.find((t: any) => t.id === taskId);

        if (!task) return res.status(404).json({ error: "Task not found" });

        task.completed = !task.completed;

        writeDb(db); // Save changes

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Error updating task" });
    }
});

export default router;
