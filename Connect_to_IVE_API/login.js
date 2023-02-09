const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');

//login
var myHeaders = new fetch.Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer secret");

var raw = JSON.stringify({
  "username": "admin",
  "password": "pass"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};


async function getToken() {
  var token;
  try {
    var response = await fetch("http://127.0.0.1:5000/api/login", requestOptions);
    token = await JSON.parse(await response.text()); 
<<<<<<< HEAD
=======
    console.log(token);
>>>>>>> 5f0977ee5922b7bcaaaa0775f8607dca615fb3aa
    return token
  } catch (e) {
    // handle error
    console.error(e)
  }
}

module.exports = { getToken };

