const express=require('express');
const router=express.Router();
const Chef=require('../Models/ChefModel');
router.get('/',async(req,res)=>{
    try{
        const chefs=await Chef.find();
        res.json(chefs); 
    }catch(error){
        res.status(500).send(`Error:${error.message}`);
    }
});
router.post('/add',async(req,res)=>{
    const newChef=new Chef(req.body);
    await newChef.save();
    res.json(newChef);
})
router.get('/names',async(req,res)=>{
    try{
        const chefs=await Chef.find().select('name');
        res.json(chefs);
    }catch(error){
        res.status(500).send(`Error:${error.message}`)
    }
})
router.put('/update/:name',async(req,res)=>{
    try{
        const name=req.params.name;
        const newChef=req.body;
        const chef=await Chef.updateOne({"name":name},newChef);
        res.json(chef);
    }catch(error){
        res.status(500).send(`Error:${error.message}`)
    }
})
router.delete('/:name',async(req,res)=>{
    const name=req.params.name;
    const chef=await Chef.deleteOne({"name":name});
    res.json(chef)
})
module.exports=router;