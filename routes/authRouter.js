import Express from 'express';
import { User } from '../models/user.js';

const authRouter = Express.Router();

authRouter
    .route('/register')
    .post(async (req, res) => {
        console.log(req.body);

        const user = new User({
            email: req.body.email,
            password: req.body.password,
        });

        console.log({ user });
        try {
            const savedUser = await user.save();
            res.json({ error: null, data: savedUser });
        } catch (error) {
            res.status(400).json({ error });
        }
    })

export default authRouter;