const nodemailer = require("nodemailer");
require('dotenv').config()
let mailTransport = async () =>{
    let transport= nodemailer.createTransport({
     host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    })
     return transport;
}
 module .exports=mailTransport;