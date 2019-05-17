const express = require('express');
const app= express();
const PORT = 4003;

const cors= require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const Router = express.Router();

Router.route('/confirm').post(function(req,res){
    const reservation =req.body.reservation;
    console.log(reservation)
    //Dependiencies needed for Email service
    const nodemailer = require('nodemailer');
    const ejs = require("ejs");
    const creds = require('./config/credential.js')

    //Creating transport instance
    var transport = {
        host: 'smtp.gmail.com',
        auth: {
        user: creds.USER,
        pass: creds.PASS
        }
    }

    //Creating a Nodemailer Transport instance
    var transporter = nodemailer.createTransport(transport)

    //Verifying the Nodemailer Transport instance
    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });

    //Manipulating data to ejs mail template
    ejs.renderFile(__dirname + "/template/Hello.ejs", { 
                                                            fullName: reservation.user,
                                                            trainService:reservation.trainService,
                                                            trainClass:reservation.trainClass,
                                                            numTickets:reservation.numTickets,
                                                            scheduleDate:reservation.scheduleDate,
                                                            scheduleTime:reservation.scheduleTime,
                                                            netAmount:reservation.netAmount
                                                            }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: '"FindMyTrip" findmytrip2017@gmail.com',
                to: reservation.email,
                subject: 'Train Ticket Receipt',
                html: data
            };
            // console.log("html data ======================>", mainOptions.html);
    
            transporter.sendMail(mainOptions, function (err, info) {
              if (err) {
                res.status(200).json({"MAIL":"Not Sent"})
              } else {
                res.status(200).json({"MAIL":"Successfully Sent"})
              }
          });
        }
    });

    
})

app.use('/email',Router);


app.listen(PORT,(err)=>{
    console.log("Email Server running on Port : ",PORT)
})