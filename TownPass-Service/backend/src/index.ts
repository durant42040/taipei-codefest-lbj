import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './db/index.js';
import {sessions, users, weights,} from './db/schema.js';
import {eq} from "drizzle-orm";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.post('/user', async (req, res) => {
    const user = req.body;
    // console.log(user);
    // @ts-ignore
    const isUserExist = await db.select().from(users).where(eq(users.id, user.id));
    if (isUserExist.length === 0) {
        // @ts-ignore
        await db.insert(users).values(user).execute();
    }
    res.json(user);
});

app.get('/user', async (req, res) => {
    // @ts-ignore
    // console.log(req.query);
    const user = await db.select().from(users).where(eq(users.id, req.query.id));
    // console.log(user)
    res.json(user);
});

app.get('/session', async (req, res) => {
    const user = req.query.user;
    console.log("user", req.query);
    // @ts-ignore
    const userSessions = await db.select().from(sessions).where(eq(sessions.userId, user));
    // console.log("sessions", userSessions);
    res.json(userSessions);
});

app.get('/onesession', async (req, res) => {
    const id = req.query.id;
    // @ts-ignore
    const session = await db.select().from(sessions).where(eq(sessions.id, id));
    res.json(session);
});

app.post('/session', async (req, res) => {
    const session = req.body;
    // add time field
    // current year month day
    // @ts-ignore
    const new_session = await db.insert(sessions).values(session).returning();
    
    console.log("new_session", new_session);
    res.json(new_session[0]);
});

app.get('/weight', async (req, res) => {
    const user = req.query.user;
    // @ts-ignore
    const weight = await db.select().from(weights).where(eq(weights.userId, user)).orderBy(weights.time);
    
    res.json(weight);
});

app.post('/weight', async (req, res) => {
    const weight = req.body;
    // @ts-ignore
    const new_weight = await db.insert(weights).values(weight).returning();
    
    res.json(new_weight[0]);
});

app.get('/food', async (req, res) => {
    const user = req.query.user;
    // @ts-ignore
    const food = await db.select().from(foods).where(eq(foods.userId, user)).orderBy(foods.time);
    
    res.json(food);
});

app.post('/food', async (req, res) => {
    const food = req.body;
    // @ts-ignore
    const new_food = await db.insert(foods).values(food).returning();
    
    res.json(new_food[0]);
});

app.get("/today", async (req, res) => {
    const user = req.query.id;
    // @ts-ignore
    let today = await db.select().from(sessions).where(eq(sessions.userId, user));
    
    today = today.filter((session) => {
        return new Date(session.time).getDate() === new Date().getDate();
    });
    
    let duration = 0;
    today.forEach((session) => {
        duration += parseInt(session.duration);
    });
    
    let burned = 0;
    today.forEach((session) => {
        burned += parseFloat(session.calories);
    });
    
    console.log("duration", duration);
    console.log("calories", burned);
    const intake = 169;
    
    res.json({
        burned,
        intake,
        time: duration,
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
