import Express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';

const authRouter = Express.Router();

authRouter
    .route('/signup')
    .post(async (req, res) => {
        console.log(req.body);

        const user = new User(req.body);

        console.log(user);
        try {
            const savedUser = await user.save();
            console.log(savedUser);
            res.json({ error: null, status: 'success' });
        } catch (error) {
            res.json({ error, status: 'failed' });
        }
    })


authRouter
    .route('/login')
    .post(async (req, res) => {
        console.log('in login')
        console.log(req.body);

        let query = {
            email: req.body.email
        };

        console.log({ query });
        try {
            const userFound = await User.find(query)
            console.log({userFound})
            if (userFound.length) {
                const originalPassword = await bcrypt.compare(req.body.password, userFound[0].password);
                console.log({originalPassword});
                if (!originalPassword) {
                    throw new Error('Error P01:Password is incorrect.');
                }
            }
            else throw new Error('Error U01:User not found.');

            res.json({ error: null, status: 'success' });

        } catch (error) {
            res.json({ error:error.message, status: 'failed' });
        }
    })


export default authRouter;