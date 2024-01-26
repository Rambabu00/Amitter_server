const mongodb=require('mongoose');
const Schema=mongodb.Schema;
 const userSchema=new Schema({
    name:{
        type:String,
        require:true,
       
    },
   
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
 module.exports=mongodb.model("users", userSchema)