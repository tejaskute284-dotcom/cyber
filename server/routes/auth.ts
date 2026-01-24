import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readDb, writeDb } from '../lib/db';

const router = express.Router();
const JWT_SECRET = 'supersecretkey';

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const db = readDb();

        const existingUser = db.users.find((u: any) => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            id: Date.now().toString(),
            email,
            password: hashedPassword,
            name,
            scores: [
                {
                    score: 60,
                    breakdown: JSON.stringify({ passwords: 10, phishing: 20, devices: 30 }),
                    createdAt: new Date()
                }
            ],
            tasks: [
                { id: "1", title: "Enable 2FA on Email", category: "Account Security", completed: false },
                { id: "2", title: "Update PC Operating System", category: "Device Security", completed: false },
                { id: "3", title: "Run a Virus Scan", category: "Malware Prevention", completed: false }
            ]
        };

        db.users.push(user);
        writeDb(db);

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = readDb();

        const user = db.users.find((u: any) => u.email === email);

        if (!user) return res.status(400).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

export default router;
