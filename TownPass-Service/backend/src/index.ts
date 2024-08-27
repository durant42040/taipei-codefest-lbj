import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { db } from './db/index.js';
import { monster } from './db/schema.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get('/api/monster', async (req, res) => {
    const monsters = await db.select().from(monster);
    res.json(monsters[0]);
});

await db.delete(monster);
await db.insert(monster).values({
    name: 'Wukong',
    health: 100,
    ugly: true,
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
