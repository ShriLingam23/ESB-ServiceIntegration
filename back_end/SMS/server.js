const express = require('express');
const app= express();
const PORT = 4004;

const cors= require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const Router = express.Router();

//For otp generation
const Speakeasy = require("speakeasy");

Router.route('/otp').post(function(req,res){

    const secret = req.body.secret;

    //Sending otp through SMS
    const accountSid = 'ACfac48b96bdef37ed98ebacace0ef8180';
    const authToken = 'da940e6680eeb69e76927b87e6f9a548';
    const client = require('twilio')(accountSid, authToken);

    const token = Speakeasy.totp({
        secret: secret,
        encoding: "base32",
        step: 60, // specified in seconds
        digits :4
    });

    client.messages
        .create({
            body: 'Your Loops Train Reservation 4 digit OTP :'+token,
            from: '+12029028295',
            to: '+94777304722'
        })
        .then(message => console.log(message.sid));

    res.send({
        "token": token,
        "remaining": (60 - Math.floor((new Date()).getTime() / 1000.0 % 60))
    });
    
})

Router.route('/validate').post(function(req,res){
    const pass = req.body.pass;
    console.log(pass.secret)
    console.log(pass.otp)
    res.send({
        "valid": Speakeasy.totp.verify({
            secret: pass.secret,
            encoding: "base32",
            token: pass.otp,
            step: 60,
            digits :4
        })
    });
})

app.use('/sms',Router);


app.listen(PORT,(err)=>{
    console.log("SMS Server running on Port : ",PORT)
})