const joi = require("joi")
const leaderBoardSchema = require("../model/leaderBoardSchema.js")
const post_result = async (req, res) =>{
     
   try {
    const isvailed = joi.object({
        language:joi.string().required(),
        proficiency:joi.number().required(),
        score:joi.number().required()
    }).validate(req.body)
    if(!isvailed.error){
        const data = await leaderBoardSchema.findOne({userId:req.locals.userId, language:req.body.language})
        if(data){  
            await leaderBoardSchema.findOneAndUpdate({userId:req.locals.userId, language:req.body.language},{proficiency:req.body.proficiency, score:req.body.score});
          return  res.status(200).json({
                "statusCode":200,
                "message":"updated your score and proficiency"
            })
        }
        else{
           const obj=new leaderBoardSchema({
               "userId":req.locals.userId,
               "username":req.locals.name,
              "language":req.body.language,
              "proficiency":req.body.proficiency,
              "score":req.body.score
           })
           await  obj.save()
           return  res.status(200).json({
            "statusCode":200,
            "message":"successfuly stored your score and proficiency"
        })
        }
        
    }
    else{
        return  res.status(403).json({
            "statusCode":403,
            "message":isvailed.error.message
        })
    }
   } catch (error) {
    return  res.status(404).json({
        "statusCode":404,
        "message":error
    })
   }
}
const get_results = async (req, res) =>{
  try {
    const data = await leaderBoardSchema.find();
    return  res.status(200).json({
        "statusCode":200,
        "message":"successfuly fetched results",
        "data":data
    })
  } catch (error) {
    return  res.status(404).json({
        "statusCode":404,
        "message":error
    })
  }
}
module.exports= {post_result, get_results}