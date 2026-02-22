import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readDb, writeDb } from '../lib/db';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.warn('⚠️ WARNING: JWT_SECRET not set in environment. Authentication will fail.');
}

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // --- STRICT INPUT VALIDATION & SANITIZATION ---
        if (!email || typeof email !== 'string' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || email.length > 254) {
            return res.status(400).json({ error: "Invalid email format (max 254 chars)" });
        }
        if (!password || typeof password !== 'string' || password.length < 8 || password.length > 128) {
            return res.status(400).json({ error: "Password must be 8-128 characters" });
        }
        if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
            return res.status(400).json({ error: "Name is required (max 100 chars)" });
        }
        // ---------------------------------------------

        const db = readDb();
        const existingUser = db.users.find((u: any) => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = {
            id: Date.now().toString(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            name: name.trim(),
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

        if (!JWT_SECRET) return res.status(500).json({ error: "Server authentication error" });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error("[Auth Register] Error:", error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // --- STRICT INPUT VALIDATION ---
        if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
            return res.status(400).json({ error: "Email and password are required" });
        }
        // -------------------------------

        const db = readDb();
        const user = db.users.find((u: any) => u.email === email.toLowerCase().trim());

        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

        if (!JWT_SECRET) return res.status(500).json({ error: "Server authentication error" });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error("[Auth Login] Error:", error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

export default router;
