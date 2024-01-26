const express= require("express");
 const app= express();
 const {login}= require("../controllers/admin.js")
 app.post("/admin", login)
 module.exports=app