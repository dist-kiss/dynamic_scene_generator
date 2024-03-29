const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');
const { IVE_URL, IVE_USER, IVE_PW } = require('../app/config/config');

let ive_path = IVE_URL + "/api/login";

//login
var myHeaders = new fetch.Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer secret");

var raw = JSON.stringify({
  "username": IVE_USER,
  "password": IVE_PW
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
    var response = await fetch(ive_path, requestOptions);
    token = await JSON.parse(await response.text()); 
    //console.log(token);
    return token
  } catch (e) {
    // handle error
    console.error(e)
  }
}

module.exports = { getToken };

