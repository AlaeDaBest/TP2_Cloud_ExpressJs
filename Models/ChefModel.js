const mongoose=require('mongoose');
const ChefSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:String},
    speciality:{type:String},
    experience:{type:String},
})
module.exports=mongoose.model('Chef',ChefSchema);