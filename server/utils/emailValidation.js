let verify=require("deep-email-validator");
let emailValidation= async (email) =>{
    try{
        let {valid}=await verify.validate(email)
         
        if(valid){
            return data={
                "status": "ok",
            }
        }
        else{
            return data={
                "status": "Not ok",
            }
        }
    }
    catch(err){
        return data={
            "status": "error"
        }
    }
}
module.exports=emailValidation