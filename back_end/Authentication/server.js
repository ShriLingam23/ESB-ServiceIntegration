const express = require('express')
const app = express()

// Import the axios library, to make HTTP requests
const axios = require('axios')


// This is the client ID and client secret that you obtained
// while registering the application
const clientID = '42c283f5dd440faa8fc5'
const clientSecret = 'ced69978c63e88fc96387317742aa8738dbf49df'

// Declare the redirect route
app.get('/home', (req, res) => {

  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code

  axios({
    // Making a POST request
    method: 'post',

    // To Github authentication API along with the client ID,secret and request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,

    // Setting the content type header to receive JSON as response
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {

    // Extracting access token from response body
    const accessToken = response.data.access_token

    // Redirecting to Home page along with the access token
    res.redirect(`http://localhost:3000/home/${accessToken}`)
    
  })
})

app.listen(4000,()=>{
    console.log("Authentication Server listening on port : 4000")
})