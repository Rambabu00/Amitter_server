const userSchema= require("../model/userSchema.js")
const emailExist= require("../utils/emailExist.js")
const {emailSend}= require("../utils/emailSent.js")
const emailValidation = require("../utils/emailValidation.js");
const jwtTokenCreation= require("../utils/jwtToken.js")
const joi=require("joi")
const  bcrypt = require("bcrypt")
const register= async (req, res) =>{

 try {
    // vaildating the user given data by using joi module
    let isVailed= joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).alphanum().required()
    }).validate(req.body)
    // there is no error in the validation of user data
    if(!isVailed.error){
        // checking the user entered email is valid or not
    const verify= await emailValidation(req.body.email);
    if(verify.status==="ok"){
        // checking the user entered email already existing in the db or not
        const emailData=await emailExist(req.body.email, userSchema);
        //email exist it means user have already an account or already used this email
        if(emailData.message==="exist"){
          return res.json({
            "statusCode":403,
            "message":"Email already exists"
           })
           
        }
        // adding user to db
        else if(emailData.message==="Not exist"){
            let hash=bcrypt.hashSync(req.body.password, 15);
            let data=new userSchema({
                "name":req.body.name,
                "email":req.body.email,
                "password": hash
            })
             await  data.save();
             await emailSend(req.body.email);
             return res.json({
                'statusCode':200,
                "message": "successfuly registered..",
            })
        }
        else {
            return res.json({
                "statusCode":404,
                "message":"something wrong...! please try again",
                "data":emailData.data
               })
        }
    }
    // email is not vaild
    else if(verify.status==="Not ok"){
        return res.json({
            "statusCode":400,
            "message":"Enter vaild email",
           })
    }
    else{
        return res.json({
            "statusCode":404,
            "message":"something wrong...! please try again",
           })
    }
}
else{
  return  res.json(
        {
        "statusCode":300,
        "message": isVailed.error.message,
        "data":isVailed.error
        }
    )
}

 } catch (error) {
    return res.json({
        "statusCode":404,
        "message":"something wrong...! please try again",
        "data":error
       })
 }
 
}
const login= async (req, res) =>{ 
    try {
const emailData= await emailExist(req.body.email, userSchema);
if(emailData.message==="Not exist"){
    return  res.json(
        {
        "statusCode":300,
        "message": "email not exist",
        }
    )
}
else if(emailData.message==="exist"){
    const hash= bcrypt.compareSync(req.body.password, emailData.data.password)
    if(hash===true){
        let token = await jwtTokenCreation(emailData.data.name, emailData.data.email, emailData.data._id, process.env.SECRET_KEY);

       return res.json({
            "statusCode" : 200,
            "message" : "Successfuly logged...!",
            "token":token
        })
    }
    else{
        return res.json({
            "statusCode" : 400,
            "message" : "check the password...!",
            
        })
    }
}
else {
    return res.json({
        "statusCode":404,
        "message":"something wrong...! please try again",
        "data":emailData.data
       })
}
    } catch (error) {
        return res.json({
            "statusCode":404,
            "message":"something wrong...! please try again",
            "data":error
           })
    }
}
module.exports={register, login}