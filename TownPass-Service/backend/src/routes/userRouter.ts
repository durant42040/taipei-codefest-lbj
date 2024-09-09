import express from 'express';
import {v4 as uuidv4} from 'uuid';
import {db} from '../db';
import {users, weights} from '../db/schema.js';
import {eq} from 'drizzle-orm';

const router = express.Router();

router.post('/', async (req, res) => {
    const user = req.body;
    const weight = user.weight;
    
    user.id = uuidv4();
    
    const isUserExist = await db.select().from(users).where(eq(users.id, user.id));
    if (isUserExist.length === 0) {
        const newUser = await db.insert(users).values(user).returning();
        await db.insert(weights).values({userId: user.id, weight: weight, month: new Date().getMonth() + 1}).execute();
        console.log('New user created:', newUser);
        res.json(newUser);
    } else {
        res.json(isUserExist[0]);
    }
});

router.get('/', async (req, res) => {
    const userId = req.query.id as string;
    const user = await db.select().from(users).where(eq(users.id, userId as string));
    res.json(user);
});

export default router;
