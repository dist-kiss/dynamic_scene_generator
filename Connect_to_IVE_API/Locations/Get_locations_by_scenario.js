const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');
const { IVE_URL } = require('../../app/config/config');

let ive_path = IVE_URL + "/api/scenarios";


var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  

  async function Get_locations_by_scenario(scenario_id){
    return await fetch(`${ive_path}/${scenario_id}/locations`, requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => console.log('error', error));
  }

  module.exports = { Get_locations_by_scenario };