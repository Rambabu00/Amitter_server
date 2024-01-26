const express= require("express")
const app= express();
const {postExercise, getExerciseByLanguage, deleteExercise, updateExercise, getAllExercises} = require("../controllers/exercise.js");
const adminAuth= require("../middleware/adminAuth.js")
const userAuth= require("../middleware/userAuth.js")
app.delete("/delete-exercise", adminAuth, deleteExercise);
app.post("/post-exercise", adminAuth, postExercise);
app.put("/update-exercise",adminAuth, updateExercise)
app.get("/get-exercise", userAuth, getExerciseByLanguage)
app.get("/get-all-exercises",adminAuth, getAllExercises)
module.exports=app