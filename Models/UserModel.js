const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    nom:{type:String,minlength:5},
    prenom:{type:String,minlength:5},
    mdp:{type:String,minlength:5}
})
module.exports=mongoose.model('User',UserSchema);