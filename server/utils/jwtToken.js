
const jwt=require("jsonwebtoken");

const jwtTokenCreation=  async (name, email, userId, SECRET_KEY)=>{
    
   
    try {
        const data={
            name,
            email,
            userId
           }
           console.log(data)
            let token=jwt.sign(data,SECRET_KEY, { expiresIn: "24h" })
            return token
    } catch (error) {
        throw new error
    }
}
module.exports=jwtTokenCreation