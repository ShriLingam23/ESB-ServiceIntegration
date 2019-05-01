const express = require('express')

// Import the axios library, to make HTTP requests
const axios = require('axios')


// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '42c283f5dd440faa8fc5'
const clientSecret = 'ced69978c63e88fc96387317742aa8738dbf49df'

const app = express()

// const cors = require('cors');
// app.use(cors())

// Declare the redirect route
app.get('/home', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  console.log(requestToken)
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token
    console.log(response.data)
    // redirect the user to the welcome page, along with the access token
    res.redirect(`http://localhost:3000/home/${accessToken}`)
    //res.redirect(`/welcome.html?access_token=${accessToken}`)
  })
})

app.use(express.static(__dirname + '/public'))
app.listen(4000,()=>{
    console.log("Server listening on port : 4000")
})