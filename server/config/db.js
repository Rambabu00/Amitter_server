const mongodb=require('mongoose');
require('dotenv').config()
mongodb.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("mongodb is connected...")
})
.catch(err=>{
    console.log(err)
})
