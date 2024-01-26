
let mailTransport = require("./mailTransport.js");
let emailSend= async (email) =>{
    
    let transport= await mailTransport();
    const mailOptions = {
        from:  "noreply@Quiz_App.com",
        to: email,
        subject: 'QUIZ APP Registration',
       html: `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div style="background-color: aliceblue; border: 1px solid black; box-shadow: 0px 0px 3px white, 0px 0px 7px white, 0px 0px 10px white; color: black; "> 
     <p style="padding: 20px">you are successfully registered to Quiz App</p>
    </div>
</body>
</html>
       `
    };
    transport.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("successfully sent email...!");
        }
    })
}
 module.exports= {emailSend}