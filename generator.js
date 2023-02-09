const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');
const { Create_location } = require('./Connect_to_IVE_API/Locations/Create_location');
const { get_locations } = require('./Connect_to_IVE_API/Locations/Get_locations');
const { Get_locations_by_scenario } = require('./Connect_to_IVE_API/Locations/Get_locations_by_scenario');
const { Create_scenario } = require('./Connect_to_IVE_API/Scenarios/Create_scenario');
const {Get_scenarios} = require('./Connect_to_IVE_API/Scenarios/Get_scenarios');
const { Create_video } = require('./Connect_to_IVE_API/Videos/Create_video');
const { Embedded_in } = require('./Connect_to_IVE_API/Relationships/Embedded_in');
const { Recorded_at } = require('./Connect_to_IVE_API/Relationships/Recorded_at');
const { Belongs_to } = require('./Connect_to_IVE_API/Relationships/Belongs_to');
const videos = require('./videodata');


// This is the data that will come from the model
async function main() {
let data = {
    "Scenario_name" : "scen",
    "Location_name" : "loc",
    "degree" : 3
    
}





//Does the scenario already exist? If not create scenario with the given Name 
let ScenarioArray = await Get_scenarios();
let Currentscenario = await ScenarioArray.find(scenario => scenario.name === data.Scenario_name);

    if (Currentscenario) {
        console.log(`Scenario with name ${data.Scenario_name} found:`, Currentscenario);
    } else {
        console.log(`Scenario with name ${data.Scenario_name} not found.`);
        let scenariodata =JSON.stringify({"name" : data.Scenario_name,"description" : ""});
        Currentscenario = await Create_scenario(scenariodata);
        console.log(`Scenario with name ${data.Scenario_name} created.`, Currentscenario);
  }
    

//Does the location already exist at the given scenario? If not create location with the given Name and relate it to the scenario

let LocationArray = await Get_locations_by_scenario(Currentscenario.scenario_id);
let Currentlocation = LocationArray.find(location => location.name === data.Location_name);

    if(Currentlocation){
        console.log(`Location with name ${data.Location_name} found`, Currentlocation);
    } else {
        console.log(`Location with name ${data.Location_name} not found.`);
        let locationdata = JSON.stringify({"name" : data.Location_name, "description" : "", "lat": "", "lng" : "" , "location_type" : ""});
        let Currentlocation = await Create_location(locationdata);
        await Belongs_to(JSON.stringify({
            "scenario_id": Currentscenario.scenario_id, 
            "location_id": Currentlocation.location_id
          }));
        console.log(`Location with name ${data.Location_name} but empty attributes created and related to ${data.Scenario_name}`);
    }







//Choose video depending on degree of the intersection (anything else?)
if(data.degree == 2){
    //choose random video with 2 exits
}else if(data.degree == 3){
    //choose random video with 3 exits
    //TODO: implement random video selection
    const videoId = 4;

//assign the video_id of the chosen video to the video variable
const Originvideo = videos.find(video => video.id === videoId);
if (!Originvideo) {
console.error(`Video with id ${videoId} not found.`);
return;
}
var viddata = JSON.stringify({
    "name": `${Originvideo.name}_clone`,
    "description": `a ${data.degree} way junction using the ${Originvideo.name} video`,
    "url": Originvideo.URL,
    "recorded": null
    }); 
const Currentvideo = await Create_video(viddata);
var recorded_at_details = JSON.stringify({
    "location_id": Currentlocation.location_id,
    "video_id": Currentvideo.video_id,
    "description": "",
    "preferred": "yes"
    });
let vidlocation = Recorded_at(recorded_at_details);
console.log(`Video created and put into ${data.Location_name} Location.`, Currentvideo )
    
        


        
        /*
        const exitData = video.exits.find(exitData => exitData.name === exit);
        if (!exitData) {
        console.error(`Exit ${exit} not found in video with id ${videoId}.`);
        return;
        }

        const locationData = exitData.locations.find(locationData => locationData.name === location);
        if (!locationData) {
        console.error(`Location ${location} not found in exit ${exit} of video with id ${videoId}.`);
        return;
        }

        const z = locationData.z;
        console.log(z); // -1.9498
        */
 
        
        
    }



}
  
main();
