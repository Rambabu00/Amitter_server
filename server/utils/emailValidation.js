let verifalia=require("verifalia");
let emailValidation= async (email) =>{
    try{
        const verify = new verifalia.VerifaliaRestClient({
            username: process.env.EMAIL_VALIDATION_PASS
        });
        const result = await verify.emailValidations.submit(email);
        const entry = result.entries[0];
 
         console.log(entry)
        if(entry.status==="Success"){
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