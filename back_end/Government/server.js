const express = require('express');
const app= express();
const PORT = 4001;

const cors= require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const Router = express.Router();

Router.route('/verify').post(function(req,res){
    let idNum = req.body.id;

    idNum  = idNum.substring(0,idNum.length-1)
    console.log(idNum);

    if(idNum%2!=0)
        res.status(200).json({'valid':true})
    else
        res.status(200).json({'valid':false})

    // console.log(idNum);
    // res.status(200).json({'valid':true})
})

app.use('/government',Router);


app.listen(PORT,(err)=>{
    console.log("Government Server running on Port : ",PORT)
})