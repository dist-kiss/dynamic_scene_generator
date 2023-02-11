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
const { Location_belongs_to_scenario } = require('./Connect_to_IVE_API/Relationships/Location_belongs_to_scenario');
const { Video_belongs_to_scenario } = require('./Connect_to_IVE_API/Relationships/Video_belongs_to_scenario');
const videos = require('./videodata');
const { Overlay_belongs_to_scenario } = require('./Connect_to_IVE_API/Relationships/Overlay_belongs_to_scenario');


// This is the data that will come from the model
async function main() {
let data = {
    "Scenario_name" : "SCENARIO1",
    "Location_name" : "LOCATION4",
    "degree" : 2,
    "Sign_1" : "Stop",
    "Sign_2" : "Go",
    //"Sign_3" : "Stop",
    "Crowd_1" : "2",
    "Crowd_2" : "1",
    //"Crowd_3" : "2"
}

let Keywords = [
    "Sign",
    "Crowd"
]


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
    console.log(`Location with name ${data.Location_name} not found in Scenario ${data.Scenario_name}.`);
    let locationdata = JSON.stringify({"name" : data.Location_name, "description" : "", "lat": "51.96712176326085", "lng" : "7.601288886457439" , "location_type" : ""});
    Currentlocation = await Create_location(locationdata);
    await Location_belongs_to_scenario(JSON.stringify({
        "scenario_id": Currentscenario.scenario_id, 
        "location_id": Currentlocation.location_id
        }));
    console.log(`Location with name ${data.Location_name} created and related to ${data.Scenario_name}`, Currentlocation);
}


//Choose video depending on degree of the intersection (anything else?) TODO: Add random selection
if(data.degree == 2){
    //choose random video with 2 exits
     videoId = 86;
}else if(data.degree == 3){
    //choose random video with 3 exits and get its (IVE) Id 
    videoId = 4;
}  
//assign the video_id of the chosen video to the Originvideo variable, create new instance with same URL called Currentvideo and relate it to scenario and location
var Originvideo = videos.find(video => video.id === videoId);
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
var Currentvideo = await Create_video(viddata);
let vidlocation =  await Recorded_at(JSON.stringify({
    "location_id": Currentlocation.location_id,
    "video_id": Currentvideo.video_id,
    "description": "",
    "preferred": "yes"
    }));
let vidscenario = await Video_belongs_to_scenario(JSON.stringify({
    "scenario_id" : Currentscenario.scenario_id,
    "video_id": Currentvideo.video_id
    }));
    
console.log(`Video created and put into ${data.Location_name} Location and Scenario ${data.Scenario_name}.`, Currentvideo )
     

//Now choose overlays for every possible path
let Anchorpoint, AnchorpointID, Anchorpoint_looper, AnchorpointData, embedding_details, exit;
for(let i =1; i <= data.degree; i++){
    

    //get info about Exit from videodata.js for now 
    exit = `Exit ${i}`;
    let exitData = Originvideo.exits.find(exitData => exitData.name === exit);
    if (!exitData) {
    console.error(`Exit ${exit} not found in video with id ${videoId}.`);
    return;
    }

    
    for(let j = 0; j < Keywords.length; j++){
        Anchorpoint = Keywords[j];
        Anchorpoint_looper = `${Anchorpoint}_${i}`;
        
        //Ids of overlays TODO: Maybe incorporate this into the videodata?
        if(data[Anchorpoint_looper] == "Stop"){
            AnchorpointID = 87;
        }else if( data[Anchorpoint_looper] == "Go"){
            AnchorpointID = 88;
        }else if( data[Anchorpoint_looper] == 1){
            AnchorpointID = 93;
        }else if( data[Anchorpoint_looper] == 2){
            AnchorpointID = 95;
        }else{
            continue;
        }
        
        //get info about Anchorpoint from videodata.js for now 
        AnchorpointData = exitData.Anchorpoints.find(AnchorpointData => AnchorpointData.name === Anchorpoint);
        if (!AnchorpointData) {
        console.error(`Anchorpoint ${Anchorpoint} not found in exit ${exit} of video with id ${videoId}.`);
        return;
        }
        
        embedding_details = JSON.stringify({
            "overlay_id": AnchorpointID,
            "video_id": Currentvideo.video_id,
            "x": AnchorpointData.x,
            "y": AnchorpointData.y,
            "z": AnchorpointData.z,
            "description": "test",
            "rz": AnchorpointData.rz,
            "rx": AnchorpointData.rx,
            "ry": AnchorpointData.ry,
            "h": AnchorpointData.h,
            "w": AnchorpointData.w,
            "display": "true",
            "d": "1"
        });
        await Embedded_in(embedding_details);
        await Overlay_belongs_to_scenario(JSON.stringify({
            "scenario_id" : Currentscenario.scenario_id,
            "overlay_id": AnchorpointID
            }));
        console.log(`Created ${data[Anchorpoint_looper]} ${Anchorpoint} at Exit ${i}`);
    }
}


}
  
main();
