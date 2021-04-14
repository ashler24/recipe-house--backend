import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim:true,
        unique:true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
});

userSchema.pre('save', async function (next) {
    try {
        // hash the password
        const salt = await bcrypt.genSalt(10);// salt is a random string
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    }
    catch (err) {
        next(err);
    }
});

export const User = mongoose.model('User', userSchema);