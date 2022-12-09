const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');


//TODO: Get athorisation key from login.js
var myHeaders = new fetch.Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Iiwic3ViIjoiTG9naW4gYnkgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY3MDU3MzQ5NiwiZXhwIjoxNjcwNjU5ODk2fQ.Bc3wSaGomh0WcUpdAVLnHPWfvS2bY9Z1LGMk0q8swJw");

var raw = JSON.stringify({
  "name": "Test-9",
  "description": "Test-9"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:5000/api/scenarios", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));