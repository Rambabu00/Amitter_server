
const emailExist= async (email, Schema) =>{
    try {
        const userData= await Schema.findOne({email:email});
        if(!userData){
            let res={
                "message":"Not exist",
                "data":userData
            }
            return res;
        }
        else{
            let res={
                "message":"exist",
                "data":userData
            }
            return res;
        }
    } catch (error) {
        let res={
            "message":"error",
            "data":userData
        }
        return res;
    }
  
}
module.exports= emailExist