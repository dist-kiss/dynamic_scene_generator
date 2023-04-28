const { Create_location } = require("../Connect_to_IVE_API/Locations/Create_location");
const { get_locations } = require("../Connect_to_IVE_API/Locations/Get_locations");
const { Get_locations_by_scenario } = require("../Connect_to_IVE_API/Locations/Get_locations_by_scenario");
const { Location_belongs_to_scenario } = require("../Connect_to_IVE_API/Relationships/Location_belongs_to_scenario");
const { Get_scenarios } = require("../Connect_to_IVE_API/Scenarios/Get_scenarios");
const { Create_scenario } = require("../Connect_to_IVE_API/Scenarios/Create_scenario");
const { Create_video } = require("../Connect_to_IVE_API/Videos/Create_video");
const { scenario_details } = require("../datastructures");
const { video_details } = require("../datastructures");
const { location_details } = require("../datastructures");
const { schema_video } = require('./sampledata');

const wrong_footage = {
    id: 71,
    name: "QB_08_dir_07_09",
    video: "/quakenbrueck/QB_8_dir_7_9",
    degree: 2,
    distance_overlays: [
        {
            direction: 1,
            screen_coordinates:
                { x: -12.2455, y: -2.5548, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
        },
        {
            direction: 2,
            screen_coordinates:
                { x: 10.4542, y: -1.7619, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
        }
    ],
    sign_overlays: [
        {
            direction: 1,
            screen_coordinates:
                { x: -12.6377, y: 1.7075, z: 1.1536, rx: -0.0016, ry: -0.092, rz: -0.017, w: 2.4399, h: 2 },
            // type: 'forbidden'
        },
        {
            direction: 2,
            screen_coordinates:
                { x: 9.0164, y: 2.3852, z: -3.7665, rx: 0, ry: 0.3941, rz: 0, w: 3, h: 2 },
            // type: 'ows_right' 
        }
    ],
    crowd_overlays: [
        {
            direction: 1,
            screen_coordinates:
                { x: -12.2455, y: -1.5548, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
        },
        {
            direction: 2,
            screen_coordinates:
                { x: 10.4542, y: -0.7619, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
        }
    ],
}

async function doPostRequest() {

    let url = 'http://localhost:3000/api/footage';

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(wrong_footage) //schema_video[0]),
    });

    if (res.ok) {

        let text = await res.text();
        return text;

    } else {
        let text = await res.json();
        console.log(text);
        return `HTTP error: ${res.status}; ${text.message}`;
    }
}

async function doGetRequest() {
    let url = 'http://localhost:3000/api/footage';
    let res = await fetch(url);

    if (res.ok) {

        let text = await res.text();

        return text;
    } else {
        return `HTTP error: ${res.status}`;
    }
}

// console.log(JSON.stringify(schema_video[0]));

doGetRequest().then(data => {
    console.log(data);
});

// Create_location(location_details).then(data => {
//     console.log(data);
// })

// Get_location().then(data => {
//     console.log(data);
// })

// console.log(schema_video[1]);