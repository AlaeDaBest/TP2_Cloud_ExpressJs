const mongoose=require('mongoose');
const RecetteSchema=new mongoose.Schema({
    name:{type:String,required:true},
    ingerediants:{type:String},
    description:{type:String}
})
module.exports=mongoose.model('Recette',RecetteSchema);