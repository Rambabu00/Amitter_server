const exerciseSchema = require("../model/exerciseSchema.js");
const joi= require("joi")
const postExercise = async (req, res)=>{
try {
    let isVailed= joi.object({
        question: joi.string().required(),
        language: joi.string().required(),
        difficult_level: joi.string().required(),
        option1: joi.string().required(),
        option2: joi.string().required(),
        option3: joi.string().required(),
        corrcet_answer: joi.string().required(),
    }).validate(req.body)
    
    if(!isVailed.error){
        let data=new exerciseSchema({
            "question":req.body.question,
            "language":req.body.language,
            "difficult_level":req.body.difficult_level,
            "option1":req.body.option1,
            "option2":req.body.option2,
            "option3":req.body.option3,
            "corrcet_answer":req.body.corrcet_answer
        })
        await data.save();
        return res.json({
            "statusCode": 200,
            "message": "successfuly posted the question...!"
        })
        
    }
    else 
        return res.json({
            "statusCode": 400,
            "message": isVailed.error.message,
        })
    
} catch (error) {
    return res.json({
        "statusCode": 404,
        "message": error,
    })
}
}
const getExerciseByLanguage = async (req, res) =>{
    try {
        if(req.body.language){
            const data= await exerciseSchema.aggregate([
                { $match: { difficult_level: "easy" , language: req.body.language} },
                { $sample: { size: 1 } },
                { $unionWith: { coll: "exercises", pipeline: [
                  { $match: { difficult_level: "medium" , language: req.body.language} },
                  { $sample: { size: 2 } }
                ] } },
                { $unionWith: { coll: "exercises", pipeline: [
                  { $match: { difficult_level: "hard" , language: req.body.language } },
                  { $sample: { size: 2 } }
                ] } }
              ])
             
              if(data.length===5){
               return res.json({
                    "statusCode":200,
                    "message":"successfuly fetched data...",
                    "data":data
                  })
              }
              else if(data.length<5){
                return res.json({
                    "statusCode":400,
                    "message":"your required exercise does not containes the require questions.please try after some time"
                  })
              }
        }
        else{
           return res.json({
                "statusCode":300,
                "message":"language is not selected or not passed to body..."
              })
        }
      
    } catch (error) {
        res.json({
            "statusCode":404,
            "message":"something wrong please try again",
            "data":error
          })
    }
}
const deleteExercise = async (req, res) =>{
    try {
        if(req.body._id){
            const data= await exerciseSchema.findOneAndDelete({_id:req.body._id});
            if(data){
                return  res.status(200).json({
                    "statusCode":200,
                    "message":"successfuly deleted...!"
                 })
            }
            else{
                return  res.status(403).json({
                    "statusCode":403,
                    "message":"id is not present in the DB...!"
                 })
            }
        }
        else{
            return  res.status(401).json({
                "statusCode":401,
                "message":"id is missing or not passed id to body...!"
             })
        }
    } catch (error) {
        return  res.status(404).json({
            "statusCode":404,
            "message":"id is not present in the DB",
            "error":error
         })
    }
}
const updateExercise = async (req, res) =>{
    try {
        if(req.body.id && req.body.question && req.body.difficult_level && req.body.corrcet_answer && req.body.language && req.body.option1 && req.body.option2 && req.body.option3){
            const obj={
            "question":req.body.question,
            "language":req.body.language,
            "difficult_level":req.body.difficult_level,
            "option1":req.body.option1,
            "option2":req.body.option2,
            "option3":req.body.option3,
            "corrcet_answer":req.body.corrcet_answer
            }
            const data= await exerciseSchema.findOneAndUpdate({_id:req.body.id}, obj);
            
            if(data){
                return  res.status(200).json({
                    "statusCode":200,
                    "message":"successfuly updated...!"
                 })
            }
            else{
                return  res.status(403).json({
                    "statusCode":403,
                    "message":"update exercise id is not present in the DB...!"
                 })
            }
        }
        else{
            return  res.status(401).json({
                "statusCode":401,
                "message":"update data is missing or not passed data to body...!"
             })
        }
    } catch (error) {
        return  res.status(404).json({
            "statusCode":404,
            "message":"update exercise id is not present in the DB",
            "error":error
         })
    }
}
const getAllExercises = async (req, res) =>{
    try {
        const data= await exerciseSchema.find();
        res.status(200).json({
            "statusCode":200,
            "message":"successfuly fetched data...!",
            "data":data
        })
    } catch (error) {
        res.status(404).json({
            "statusCode":404,
            "message":"something wrong please try again or db error...!",
            "data":error
        })
    }
}

module.exports={postExercise, getExerciseByLanguage, deleteExercise, updateExercise, getAllExercises}