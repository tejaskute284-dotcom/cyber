import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { authenticateToken } from '../middleware/auth';

dotenv.config();

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const SYSTEM_PROMPT = `
You are the Cyber Hygiene Coach Assistant. Your goal is to help users improve their digital security.
- Provide concise, actionable advice on passwords, phishing, 2FA, etc.
- If asked about the specific user's score, explain you don't have direct access but can guide them on how to improve it.
- Keep the tone professional, encouraging, and "cyber-futuristic".
- Do not provide code unless asked. Focus on general cybersecurity advice.
`;

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) return res.status(400).json({ error: "Message required" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am online and ready to assist with cyber hygiene protocols." }],
                },
                ...(history || []).map((msg: any) => ({
                    role: msg.role === 'bot' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                }))
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

export default router;
