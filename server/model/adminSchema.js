const mongodb=require('mongoose');
const Schema=mongodb.Schema;
 const adminSchema=new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }
 })
 module.exports=mongodb.model("admins", adminSchema)