import express from 'express';
import {db} from '../db';
import {weights} from '../db/schema.js';
import {eq, and} from 'drizzle-orm';

const router = express.Router();

const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

router.get('/', async (req, res) => {
    const userId = req.query.id;
    const weight = await db.select().from(weights).where(eq(weights.userId, userId as string)).orderBy(weights.month);
    const updatedWeights = weight.map(w => ({
        month: months[w.month! - 1],
        weight: w.weight,
    }));
    res.json(updatedWeights);
});

router.post('/', async (req, res) => {
    let weight = req.body;
    const month = new Date().getMonth() + 1;
    weight.month = month;
    
    const isExist = await db.select().from(weights).where(and(eq(weights.userId, weight.userId), eq(weights.month, month)));
    if (isExist.length > 0) {
        await db.update(weights).set(weight).where(and(eq(weights.userId, weight.userId), eq(weights.month, month))).execute();
    } else {
        await db.insert(weights).values(weight).execute();
    }
    weight.month = months[month - 1];
    res.json(weight);
});

export default router;
