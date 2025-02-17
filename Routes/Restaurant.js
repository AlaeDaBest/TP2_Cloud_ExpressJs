const express=require('express');
const router=express.Router();
const Restaurant=require('../Models/RestaurantModel');
router.get('/',async(req,res)=>{
    try{
        const restaurants=await Restaurant.find();
        res.json(restaurants); 
    }catch(error){
        res.status(500).send(`Error:${error.message}`);
    }
});
router.post('/add',async(req,res)=>{
    const newRestaurant=new Restaurant(req.body);
    await newRestaurant.save();
    res.json(newRestaurant);
})
router.get('/names',async(req,res)=>{
    try{
        const restaurants=await Restaurant.find().select('name');
        res.json(restaurants);
    }catch(error){
        res.status(500).send(`Error:${error.message}`)
    }
})
router.put('/update/:name',async(req,res)=>{
    try{
        const name=req.params.name;
        const newRestaurant=req.body;
        const restaurant=await Restaurant.updateOne({"name":name},newChef);
        res.json(restaurant);
    }catch(error){
        res.status(500).send(`Error:${error.message}`)
    }
})
router.delete('/:name',async(req,res)=>{
    const name=req.params.name;
    const restaurant=await Restaurant.deleteOne({"name":name});
    res.json(restaurant)
})
module.exports=router;