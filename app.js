import Express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import recipeRouter from './routes/recipeRouter.js';


const app = Express();

app.use(cors());

app.use(Express.json());

app.use(Express.urlencoded({ extended: true }))
const port = process.env.PORT || 3200;

//for mongo db connection
const url = process.env.MONGODB_URI
    || "mongodb://localhost/RecipeDB";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("Mongo DB connected"));
//

//for routing
app.use('/auth', authRouter);
app.use('/recipes', recipeRouter);


app.listen(port, () => console.log(`node server is running on port :${port}`));
