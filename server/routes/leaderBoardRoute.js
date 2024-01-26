const express = require("express")
const app = express();
const {post_result, get_results} = require("../controllers/leaderBoard.js")
const userAuth = require("../middleware/userAuth.js")
app.post("/result", userAuth, post_result)
app.get("/get-results", userAuth, get_results)
module.exports=app