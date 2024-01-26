const mongodb = require("mongoose")
const Schema = mongodb.Schema;
const leaderBoardSchema= new Schema({
       userId:{
        type:String,
        require:true,
       },
       username:{
        type:String,
        require:true,
       },
       language:{
        type:String,
        require:true,
       },
       proficiency:{
        type:Number,
        require:true,
       },
       score:{
        type:Number,
        require:true,
       }
})
module.exports=mongodb.model("leader-board",leaderBoardSchema)