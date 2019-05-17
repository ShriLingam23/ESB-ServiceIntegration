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
    
    // configure paypal with the credentials you got when you created your paypal app
    paypal.configure({
        'mode': 'sandbox', //sandbox or live 
        'client_id': 'AWlPx_EYJ6p1lcKWSjJHRU1Yz3uwMvF3UaFRomv5jZvtO3k7lGPOAitfGhFZzNkcDNoGwAj4wXeeiyar', // please provide your client id here 
        'client_secret': 'ED6EAGlOFVI8rZX5bS_m-g-8pmhRoUDwuKsz2F7oum3DwnIQHwaQkKF2TWO6Yq2aeumGk-_KSWpOGMfS' // provide your client secret here 
    });

    // create payment object 
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

    // call the create Pay method 
    createPay( payment ) 
        .then( ( transaction ) => {
            var id = transaction.id; 
            var links = transaction.links;
            var counter = links.length; 
            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
					// redirect to paypal where user approves the transaction 
                    // return res.redirect( links[counter].href )
                    console.log(links[counter].href)
                    res.send(links[counter].href)
                }
            }
        })
        .catch( ( err ) => { 
            console.log( err ); 
            res.redirect('/err');
        });


})

// success page 
app.get('/success' , (req ,res ) => {
    console.log(req.query); 
    // res.redirect('/success.html'); 
})

// error page 
app.get('/err' , (req , res) => {
    console.log(req.query); 
    // res.redirect('/err.html'); 
})

// helper functions 
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