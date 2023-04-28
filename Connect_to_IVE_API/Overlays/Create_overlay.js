const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');
const { getToken } = require('../login');
const { IVE_URL } = require('../../app/config/config');

let ive_path = IVE_URL + "/api/overlays";



async function createHeader() {
  var myHeaders = new fetch.Headers();
  const token = await getToken();
  const Bearer = "Bearer " + token.token;
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", Bearer);
  return(myHeaders); 
}




async function Create_overlay(raw) {
  const header = await createHeader();

  var requestOptions = {
    method: 'POST',
    headers: header,
    body: raw,
    redirect: 'follow'
  };

  return await fetch(ive_path, requestOptions)
  .then(response => response.json())
  .then(result => {return result.overlay_id})
  .catch(error => console.log('error', error));
}

module.exports = { Create_overlay };