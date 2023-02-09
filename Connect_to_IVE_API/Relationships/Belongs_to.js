const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');
const { getToken } = require('../login');



async function createHeader() {
  var myHeaders = new fetch.Headers();
  const token = await getToken();
  const Bearer = "Bearer " + token.token;
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", Bearer);
  return(myHeaders); 
}




async function Belongs_to(raw) {
  const header = await createHeader();

  var requestOptions = {
    method: 'POST',
    headers: header,
    body: raw,
    redirect: 'follow'
  };

  return await fetch("http://127.0.0.1:5000/api/relationship/belongs_to/location", requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)})
  .catch(error => console.log('error', error));
}


module.exports = { Belongs_to };