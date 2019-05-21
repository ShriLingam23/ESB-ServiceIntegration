const express = require('express');
const app= express();
const PORT = 4002;

const cors= require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const Router = express.Router();
const paypal = require('paypal-rest-sdk');

Router.route('/pay').post(function(req,res){
    const reservation = req.body.reservation;
    console.log(reservation);
    
    // Configuring paypal with the credentials obtained when creating paypal account
    paypal.configure({
        'mode': 'sandbox', //Specifying as Test
        'client_id': 'AWlPx_EYJ6p1lcKWSjJHRU1Yz3uwMvF3UaFRomv5jZvtO3k7lGPOAitfGhFZzNkcDNoGwAj4wXeeiyar', // Our confidential Client ID 
        'client_secret': 'ED6EAGlOFVI8rZX5bS_m-g-8pmhRoUDwuKsz2F7oum3DwnIQHwaQkKF2TWO6Yq2aeumGk-_KSWpOGMfS' // Our confidential Client secret  
    });

    // Creating the Payment Object
    var payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/home/"+reservation.token+"/success",
            "cancel_url": "http://localhost:4002/"
        },
        "transactions": [{
            "amount": {
                "total": reservation.netAmount,
                "currency": "USD"
            },
            "description": " a book on mean stack "
        }]
    }

    // Calling the Custome Payment method 
    createPay( payment ) 
        .then( ( transaction ) => {
            var id = transaction.id; 
            var links = transaction.links;
            var counter = links.length; 
            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
                    res.send(links[counter].href)
                }
            }
        })
        .catch( ( err ) => { 
            console.log( err ); 
        });


})

// Custom functions 
var createPay = ( create_payment_json ) => {
    return new Promise( ( resolve , reject ) => {
        paypal.payment.create( create_payment_json , function( err , payment ) {
            if ( err ) {
                reject(err); 
            }
            else {
                resolve(payment); 
            }
        }); 
    });
}

app.use('/paypal',Router);


app.listen(PORT,(err)=>{
    console.log("Payment Server running on Port : ",PORT)
})