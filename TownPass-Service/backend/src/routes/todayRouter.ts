import express from 'express';
import {db} from '../db';
import {sessions, foodLog} from '../db/schema.js';
import {eq} from 'drizzle-orm';

const router = express.Router();

router.get('/', async (req, res) => {
    const user = req.query.id;
    
    let todaySessions = await db.select().from(sessions).where(eq(sessions.userId, user as string));
    
    todaySessions = todaySessions.filter((session) => {
        return new Date(session.time!).getDate() === new Date().getDate();
    });
    
    let duration = 0;
    let burned = 0;
    todaySessions.forEach((session) => {
        duration += parseInt(session.duration!);
        burned += parseFloat(session.calories!);
    });
    
    let food = await db.select().from(foodLog).where(eq(foodLog.userId, user as string));
    food = food.filter((f) => {
        return f.time ? new Date(f.time).getDate() === new Date().getDate() : false;
    });
    
    let intake = 0;
    food.forEach((f) => {
        intake += parseFloat(f.calories ?? '0') * parseFloat(f.amount ?? '0');
    });
    
    res.json({
        burned,
        intake,
        time: duration,
    });
});

export default router;
