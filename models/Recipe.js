import mongoose from 'mongoose';


const recipeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    category: {
        required: true,
        type: String,
    },
    ingredients: [{
        type: String,
        required: true,
    }],
    instructions: [{
        type: String,
        required: true,
    }],
    likes: {
        type: Number,
        default: 0,
    },
    disLikes: {
        type: Number,
        default: 0,
    },
    dateModified: {
        type: Date,
        default: Date.now(),
    }

});


export const Recipe = mongoose.model('Recipe', recipeSchema);