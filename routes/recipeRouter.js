import Express, { request, response } from 'express';
import ObjectID from 'mongodb';
import { Recipe } from '../models/Recipe.js';

const recipeRouter = Express.Router();

recipeRouter
    .use((request, response, next) => {
        console.log(request.url);
        request.time = Date.now();
        next();
    });

recipeRouter
    .route('/')
    .get(async (request, response) => {
        let query = {};

        if (request.query.name) {
            query.name = request.query.name.toLowerCase();
        }

        console.log({ query });

        try {
            const recipes = await Recipe.find(query);
            response.json(recipes);
        }
        catch (err) {
            response.send('No data found...');
        }
    })
    .post(async (request, response) => {

        let recipeObj = new Recipe({
            "name": request.body.name,
            "imgUrl": request.body.imgUrl,
            "category": request.body.category,
            "ingredients": [...request.body.ingredients],
            "instructions": [...request.body.instructions],
            "likes": request.body.likes,
            "disLikes": request.body.disLikes,
            "dateModified": Date.now()
        });

        console.log({ recipeObj });

        try {
            const savedRecipe = await recipeObj.save();
            response.json({ data: savedRecipe });
        }
        catch (err) {
            response.send('Error S01: Unable to save data...');
        }
    })
    .patch(async (request, response) => {

        let query = {};
        //update by name
        if (request.query.name) query.name = request.query.name;

        //update by name
        if (request.query._id) query._id = request.query._id;

        let recipeObj = request.body;

        try {
            const updatedRecipe = await Recipe.findOneAndUpdate(query, recipeObj, { new: true });
            response.json({ data: updatedRecipe });
        }
        catch (err) {
            response.send('Error U01: Unable to update data...');
        }
    })

recipeRouter
    .route('/getRecipe/:id')
    .get(async (request, response) => {
        let id = request.params.id;
        try {
            const recipeData = await Recipe.findById(id);
            response.json({ recipeData });
        }
        catch (err) {
            console.log(err);
            response.send('Error G02: Unable to fetch recipe data...');
        }
    })

recipeRouter
    .route('/delete/:id')
    .delete(async (request, response) => {

        // let query = {};
        // let oid = request.params.id;
        // query._id = ObjectID(`"${oid}"`);
        // console.log({ query });

        try {
            // const deletedRecipe = await Recipe.deleteOne({ _id: ObjectID(`${request.params.id}`) });
            const deletedRecipe = await Recipe.findById(request.params.id).remove();
            response.json({ deletedRecipe });
        }
        catch (err) {
            console.log(err);
            response.send('Error D01: Unable to delete data...');
        }
    })



export default recipeRouter;