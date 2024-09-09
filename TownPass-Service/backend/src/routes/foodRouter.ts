import express from 'express';
import {db} from '../db';
import {foodLog} from '../db/schema.js';
import {eq, desc} from 'drizzle-orm';

const router = express.Router();

router.get('/', async (req, res) => {
    const user = req.query.user;
    const food = await db.select().from(foodLog).where(eq(foodLog.userId, user as string)).orderBy(desc(foodLog.time));
    res.json(food);
});

router.post('/', async (req, res) => {
    const food = req.body;
    const new_food = await db.insert(foodLog).values(food).returning();
    res.json(new_food[0]);
});

export default router;
