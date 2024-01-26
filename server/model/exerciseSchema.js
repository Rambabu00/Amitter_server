const mongodb= require("mongoose");
const Schema= mongodb.Schema;
const exerciseSchema= new Schema({
    question:{
        type:String,
        require:true,
        unique:true
    },
    language:{
        type:String,
        require:true,
    },
    difficult_level:{
        type:String,
        require:true,     
    },
    option1:{
        type:String,
        require:true,
    },
    option2:{
        type:String,
        require:true,
    },
    option3:{
        type:String,
        require:true,
    },
    corrcet_answer:{
        type:String,
        require:true,
    }
})

module.exports=mongodb.model("exercises", exerciseSchema)