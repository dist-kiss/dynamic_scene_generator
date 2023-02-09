const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');


var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  

  async function Get_locations_by_scenario(scenario_id){
    return await fetch(`http://127.0.0.1:5000/api/scenarios/${scenario_id}/locations`, requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => console.log('error', error));
  }

  module.exports = { Get_locations_by_scenario };