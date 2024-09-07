import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './db/index.js';
import {sessions, users} from './db/schema.js';
import {eq} from "drizzle-orm";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.post('/user', async (req, res) => {
    const user = req.body;
    // @ts-ignore
    const isUserExist = await db.select().from(users).where(eq(users.id, user.id));
    if (isUserExist.length === 0) {
        // @ts-ignore
        await db.insert(users).values(user).execute();
    }
    res.json(user);
});

app.get('/session', async (req, res) => {
    const user = req.query.user;
    // @ts-ignore
    const session = await db.select().from(sessions).where(eq(sessions.userId, user));
    res.json(session);
});

app.get('/weight', async (req, res) => {

});

app.get('/food', async (req, res) => {

});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
