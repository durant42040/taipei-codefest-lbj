import express from 'express';
import {db} from '../db';
import {users, weights} from '../db/schema.js';
import {eq} from 'drizzle-orm';

const router = express.Router();

router.post('/', async (req, res) => {
    const user = req.body;
    const weight = user.weight;
    
    const isUserExist = await db.select().from(users).where(eq(users.id, user.id));
    if (isUserExist.length === 0) {
        await db.insert(users).values(user).execute();
        await db.insert(weights).values({userId: user.id, weight: weight, month: new Date().getMonth() + 1}).execute();
    }
    res.json(user);
});

router.get('/', async (req, res) => {
    const userId = req.query.id as string;
    const user = await db.select().from(users).where(eq(users.id, userId as string));
    res.json(user);
});

export default router;
