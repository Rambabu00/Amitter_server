const express= require("express");
const app= express();
const cors=require("cors");
require("./config/db.js");
require('dotenv').config();
app.use(express.json());
app.use(cors({
    origin:"*"
}));
// import routes 
const user= require("./routes/userRoute.js");
const admin=require("./routes/adminRoute.js");
const exercise= require("./routes/exerciseRoute.js")
const leaderBoard = require("./routes/leaderBoardRoute.js")
app.use("/", user)
app.use("/", admin)
app.use("/", exercise)
app.use("/", leaderBoard)
app.listen(process.env.PORT, (err)=>{
    if(err)
    console.log("there is a error in sever", err)
else{
    console.log("server is runnig in " , process.env.PORT)
}
})