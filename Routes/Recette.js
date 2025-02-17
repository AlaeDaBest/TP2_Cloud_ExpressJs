const express=require('express');
const router=express.Router();
const Recette=require('../Models/RecetteModel');
const verifyToken=require('../Middleware/auth')
router.get('/',verifyToken,async(req,res)=>{
    try{
        const recettes=await Recette.find();
        res.json(recettes); 
    }catch(error){
        res.status(500).send(`Error:${error.message}`);
    }
});
router.post('/add',async(req,res)=>{
    const newRecette=new Recette(req.body);
    await newRecette.save();
    res.json(newRecette);
})
router.get('/names',async(req,res)=>{
    try{
        const recettes=await Recette.find().select('name');
        res.json(recettes);
    }catch(error){
        res.status(500).send(`Error:${error.message}`)
    }
})
router.put('/update/:name',async(req,res)=>{
    try{
        const name=req.params.name;
        const newRecette=req.body;
        const recette=await Recette.updateOne({"name":name},newRecette);
        res.json(recette);
    }catch(error){
        res.status(500).send(`Error:${error.message}`)
    }
})
router.delete('/:name',async(req,res)=>{
    const name=req.params.name;
    const recette=await Recette.deleteOne({"name":name});
    res.json(recette)
})
module.exports=router;