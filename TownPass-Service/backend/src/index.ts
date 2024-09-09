import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/userRouter';
import sessionRouter from './routes/sessionRouter';
import weightRouter from './routes/weightRouter';
import foodRouter from './routes/foodRouter';
import todayRouter from "./routes/todayRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/session', sessionRouter);
app.use('/weight', weightRouter);
app.use('/food', foodRouter);
app.use('/today', todayRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
