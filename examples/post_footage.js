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
const {schema_video} = require('./sampledata');

async function doPostRequest() {

    let url = 'http://localhost:5000/api/footage';
    // let data = {
    //     video: "http://...",
    //     name: "valid_test2",
    //     degree: 4
    //  };

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(schema_video[0]),
    });

    if (res.ok) {

        let text = await res.text();
        return text;

        // let ret = await res.json();
        // console.log(ret);
        // return JSON.parse(ret.data);

    } else {
        console.log(res);
        return `HTTP error: ${res.status}`;
    }
}

async function doGetRequest() {
    let url = 'http://localhost:5000/api/footage';
    let res = await fetch(url);

    if (res.ok) {

        let text = await res.text();

        return text;
    } else {
        return `HTTP error: ${res.status}`;
    }
}

// console.log(JSON.stringify(schema_video[0]));

doPostRequest().then(data => {
    console.log(data);
});

// Create_location(location_details).then(data => {
//     console.log(data);
// })

// Get_location().then(data => {
//     console.log(data);
// })

// console.log(schema_video[1]);