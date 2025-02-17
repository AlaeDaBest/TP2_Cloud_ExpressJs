const mongoose=require('mongoose');
const RestaurantSchema=new mongoose.Schema({
    name:{type:String,required:true},
    location:{type:String},
    description:{type:String}
})
module.exports=mongoose.model('Restaurant',RestaurantSchema);