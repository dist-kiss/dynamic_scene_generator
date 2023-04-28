const db = require("./app/models/index");
const Footage = db.footages;
const { response } = require('express');
const fetch = require('node-fetch');
const { type } = require('os');
const { Create_location } = require('./Connect_to_IVE_API/Locations/Create_location');
const { get_locations } = require('./Connect_to_IVE_API/Locations/Get_locations');
const { Get_locations_by_scenario } = require('./Connect_to_IVE_API/Locations/Get_locations_by_scenario');
const { Create_scenario } = require('./Connect_to_IVE_API/Scenarios/Create_scenario');
const {Get_scenarios} = require('./Connect_to_IVE_API/Scenarios/Get_scenarios');
const { Create_video } = require('./Connect_to_IVE_API/Videos/Create_video');
const { Create_overlay } = require('./Connect_to_IVE_API/Overlays/Create_overlay');
const { Embedded_in } = require('./Connect_to_IVE_API/Relationships/Embedded_in');
const { Recorded_at } = require('./Connect_to_IVE_API/Relationships/Recorded_at');
const { Location_belongs_to_scenario } = require('./Connect_to_IVE_API/Relationships/Location_belongs_to_scenario');
const { Video_belongs_to_scenario } = require('./Connect_to_IVE_API/Relationships/Video_belongs_to_scenario');
const { Overlay_belongs_to_scenario } = require('./Connect_to_IVE_API/Relationships/Overlay_belongs_to_scenario');



// obj is the data object that will come from the model
async function generate(data) {  

 

let Keywords = [
    "signs",
    "crowds",
    "distances"
]


//TODO: ADD OVERLAYS TO THE DATABASE

const overlays = {
    "signs" : [
        {
            "name": "stop",
            "id" : 87
        },
        {
            "name": "go",
            "id" : 88,
        }
    ],
    "crowds": [
        {
            "name": 1,
            "id" : 93,
        },
        {
            "name": 2,
            "id": 95
        }
    ]
}


//Does the scenario already exist? If not create scenario with the given Name 
const ScenarioArray = await Get_scenarios();
let Currentscenario = await ScenarioArray.find(scenario => scenario.name === data.scenario_name);

if (Currentscenario) {
    console.log(`Scenario with name ${data.scenario_name} found:`, Currentscenario);
} else {
    console.log(`Scenario with name ${data.scenario_name} not found.`);
    let scenariodata =JSON.stringify({"name" : data.scenario_name,"description" : ""});
    Currentscenario = await Create_scenario(scenariodata);
    console.log(`Scenario with name ${data.scenario_name} created.`, Currentscenario);
}
    

//Does the location already exist at the given scenario? If not create location with the given Name and relate it to the scenario

const LocationArray = await Get_locations_by_scenario(Currentscenario.scenario_id);
let Currentlocation = LocationArray.find(location => location.name === data.location_name);

if(Currentlocation){
    console.log(`Location with name ${data.location_name} found`, Currentlocation);
} else {
    console.log(`Location with name ${data.location_name} not found in Scenario ${data.scenario_name}.`);
    const locationdata = JSON.stringify({"name" : data.location_name, "description" : "", "lat": "51.96712176326085", "lng" : "7.601288886457439" , "location_type" : ""});
    Currentlocation = await Create_location(locationdata);
    await Location_belongs_to_scenario(JSON.stringify({
        "scenario_id": Currentscenario.scenario_id, 
        "location_id": Currentlocation.location_id
        }));
    console.log(`Location with name ${data.location_name} created and related to ${data.scenario_name}`, Currentlocation);
}


//Choose a random video of correct degree create an IVE instance of it and connect it to location and scenario

const IDs =  (await Footage.find({degree: data.degree}).select('_id')).map(footage => footage._id.toString())
if(IDs.length === 0){
    throw new Error(`No footage found with degree ${data.degree}`)
}
const ID = IDs[Math.floor(Math.random()*IDs.length)]
const video = await Footage.findById(ID)



const videoinstance = await Create_video(
    JSON.stringify({
        "name": `${video.name}_clone`,
        "description": `a ${video.degree} way junction using the ${video.name} video`,
        "url": video.video,
        "recorded": null
        })
)

await Recorded_at(JSON.stringify({
    "location_id": Currentlocation.location_id,
    "video_id": videoinstance.video_id,
    "description": "",
    "preferred": "yes"
    }));

await Video_belongs_to_scenario(JSON.stringify({
    "scenario_id" : Currentscenario.scenario_id,
    "video_id": videoinstance.video_id
    }));

console.log(`Video created and put into Location ${data.location_name} and Scenario ${data.scenario_name}.`, videoinstance )


//ADD OVERLAYS
//TODO: handle faulty requests that cause errors somewhere. Some probably already in the Scene model
let direction, anchorpoint;


//Add Sign Overlays
let signname, sign;
for(let i = 0; i < data.degree; i++){
    if(data.signs[i]){
        direction = data.signs[i].direction;
        signname = data.signs[i].sign;
        anchorpoint = video.sign_overlays[direction - 1].screen_coordinate;
        sign = overlays.signs.find(sign => sign.name === signname)
        await Embedded_in(JSON.stringify(
            {
            "overlay_id": sign.id,
            "video_id": videoinstance.video_id,
            "description": "test",
            "display": "true",
            ...anchorpoint
            }
        ));
        await Overlay_belongs_to_scenario(JSON.stringify({
            "scenario_id" : Currentscenario.scenario_id,
            "overlay_id": sign.id
            }));
        console.log(`Created ${signname} sign at direction ${direction}`);
    }
}

//Add crowd overlays
let crowdname, crowd;
for(let i = 0; i < data.degree; i++){
    if(data.crowds[i] && data.crowds[i].crowdedness != 0){
        crowdname = data.crowds[i].crowdedness;
        direction = data.crowds[i].direction;
        anchorpoint = video.crowd_overlays[direction - 1].screen_coordinate;
        crowd = overlays.crowds.find(crowd => crowd.name === crowdname) 
        await Embedded_in(JSON.stringify(
            {
            "overlay_id": crowd.id,
            "video_id": videoinstance.video_id,
            "description": "test",
            "display": "true",
            ...anchorpoint
            }
        ));
        await Overlay_belongs_to_scenario(JSON.stringify({
            "scenario_id" : Currentscenario.scenario_id,
            "overlay_id": crowd.id
            }));
        console.log(`Created ${crowdname} crowd at direction ${direction}`);
    }
}

//Add Distance Overlays
let distance_id;
for(let i = 0; i < data.degree; i++){
    if(data.distances[i]){
        direction = data.distances[i].direction;        
        anchorpoint = video.distance_overlays[direction - 1].screen_coordinate;
        distance = data.distances[i].distance;
        distance_id = await Create_overlay(JSON.stringify(
            {
                "name": "generated distance",
                "description": "Test",
                "category": "distance",
                "url": "",
                "title":"",
                "distance_meters": distance,
                "distance_seconds": 1.42*distance
              }
        ));
        await Embedded_in(JSON.stringify(
            {
            "overlay_id": distance_id,
            "video_id": videoinstance.video_id,
            "description": "test",
            "display": "true",
            ...anchorpoint
            }
        ));
        await Overlay_belongs_to_scenario(JSON.stringify({
            "scenario_id" : Currentscenario.scenario_id,
            "overlay_id": distance_id
            }));
        console.log(`Created ${distance} distance at direction ${direction}`);
    }
}


}

module.exports = { generate };
