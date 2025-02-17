const express=require('express');
require('dotenv').config();
const host=process.env.HOST;
const port=3000;
var app=express();
app.use(express.json());
var cors=require('cors');
app.use(cors());
const mongoose=require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;
const DBNAME = process.env.DATABASE;
mongoose.connect(`${MONGODB_URL}/${DBNAME}`)
.then(() => console.log('Your Connexion To MongoDB Is Successful (❁´◡`❁)'))
.catch(err => console.error('Error connectiong to MongoDB:', err));
const db=mongoose.connection;
const technologiesRoute=require('./Routes/technologies');
app.use('/technologies',technologiesRoute);
const ChefRoute=require('./Routes/Chef');
app.use('/chefs',ChefRoute);
const RecetteRoute=require('./Routes/Recette');
app.use('/recettes',RecetteRoute);
const RestaurantRoute=require('./Routes/Restaurant');
app.use('/restaurants',RestaurantRoute);
const UserRoute=require('./Routes/User');
app.use('/user',UserRoute);
app.listen(port, () => {
    console.log( `The Server Is Executing On Port: http://localhost:  ${port}`);
});