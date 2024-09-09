import express from 'express';
import {db} from '../db';
import {sessions} from '../db/schema.js';
import {eq, desc} from 'drizzle-orm';

const router = express.Router();

router.get('/', async (req, res) => {
    const id = Number(req.query.id);
    const session = await db.select().from(sessions).where(eq(sessions.id, id));
    res.json(session);
});

router.get('/all', async (req, res) => {
    const user = req.query.user;
    const userSessions = await db.select().from(sessions).where(eq(sessions.userId, user as string)).orderBy(desc(sessions.time));
    res.json(userSessions);
});

router.post('/', async (req, res) => {
    const session = req.body;
    const newSession = await db.insert(sessions).values(session).returning();
    res.json(newSession[0]);
});

export default router;
