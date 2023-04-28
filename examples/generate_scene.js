const {schema_scene} = require('./sampledata')

wrong_scene = {
    id: 456,
    scenario_name: "test_scene_3",
    location_name: 'test_location_3',
    degree: 2,
    signs: [
      {
        direction: 1,
        sign: 'stop'
      },
      {
        direction: 2,
        sign: 'go'
      },
      {
        direction: 3,
        sign: 'go'
      }
    ],
    crowds: [
      {
        direction: 1,
        crowdedness: 0
      },
      {
        direction: 2,
        crowdedness: 1
      },
      {
        direction: 3,
        crowdedness: 1
      }
    ],
    distances: [
      {
        direction: 1,
        distance: 200
      },
      {
        direction: 2,
        distance: 300
      },
      {
        direction: 3,
        distance: 100
      }
    ]

  }

async function doPostRequest() {

    let url = 'http://localhost:5000/api/scene';

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(wrong_scene),
    });

    if (res.ok) {

        let text = await res.text();
        return text;

    } else {
        let text = await res.json();
        console.log(text.message);
        return `HTTP error: ${res.status}`;
    }
}

async function doGetRequest() {
    let url = 'http://localhost:5000/api/scene';
    let res = await fetch(url);

    if (res.ok) {

        let text = await res.text();

        return text;
    } else {
        return `HTTP error: ${res.status}`;
    }
}

doPostRequest().then(data => {
    console.log(data);
});

// doGetRequest().then(data => {
//     console.log(data);
// });