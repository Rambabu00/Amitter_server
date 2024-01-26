const adminSchema = require("../model/adminSchema.js");
const emailExist = require("../utils/emailExist.js");
const jwtTokenCreation= require("../utils/jwtToken.js")
const bcrypt= require("bcrypt")


const login = async (req, res) =>{
 const emailData = await emailExist(req.body.email, adminSchema);
  if(emailData.message==="exist"){
    const hash=bcrypt.compareSync(req.body.password, emailData.data.password);
    if(hash===true){
      console.log(emailData)
         const token= await jwtTokenCreation(req.body.email, req.body.email, emailData.data._id,process.env.ADMIN_SECRET_KEY)
        return res.json({
            "statusCode":200,
            "message":"successfully logged admin...!",
            "data": token
        })
    }
    else{
        return res.json({
            "statusCode":400,
            "message":"check password...!"
        }) 
    }
  }
  else if(emailData.message==="Not exist"){
    return res.json({
        "statusCode":400,
        "message":"check email you entered...!"
    }) 
  }
  else{
    return res.json({
        "statusCode":404,
        "message":"something wrong please try again...!"
    }) 
  }
}
module.exports={login}