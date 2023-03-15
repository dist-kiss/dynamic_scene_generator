const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');
const { getToken } = require('../login');
const { IVE_URL } = require('../../app/config/config');

let ive_path = IVE_URL + "/api/relationship/embedded_in";



async function createHeader() {
  var myHeaders = new fetch.Headers();
  const token = await getToken();
  const Bearer = "Bearer " + token.token;
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", Bearer);
  return(myHeaders); 
}




async function Embedded_in(raw) {
  const header = await createHeader();

  var requestOptions = {
    method: 'POST',
    headers: header,
    body: raw,
    redirect: 'follow'
  };

  return await fetch(ive_path, requestOptions)
  .then(response => response.json())
  .then(result => {    
    let {overlay_id, video_id} = result;
    let newresult = {overlay_id, video_id};
    return newresult;
  })
  .catch(error => console.log('error', error));
}

module.exports = { Embedded_in };