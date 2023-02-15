import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

//const CONNECTION_URL = 'mongodb+srv://sainyamagg:test123@website1.jcg5tgf.mongodb.net/memories?retryWrites=true&w=majority';
const PORT = process.env.PORT;

mongoose.set("strictQuery", false);

mongoose.connect(process.env.CONNECTION_URL)
.then(()=> {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
})
.catch((err) => {
    console.log(err.message);
});

