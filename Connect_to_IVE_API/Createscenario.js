const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');
const { getToken } = require('./login');



async function createHeader() {
  //TODO: Get athorisation key from login.js
  var myHeaders = new fetch.Headers();
  const token = await getToken();
  const Bearer = "Bearer " + token.token;
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", Bearer);
  return(myHeaders); 
}

var raw = JSON.stringify({
  "name": "Test-9",
  "description": "Test-9"
});


async function main() {
  const header = await createHeader();

  var requestOptions = {
    method: 'POST',
    headers: header,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://127.0.0.1:5000/api/scenarios", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

main()