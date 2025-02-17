const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    res.send("Technologyy route is displaying data")
})
module.exports=router;