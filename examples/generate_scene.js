const {schema_scene} = require('./sampledata')

async function doPostRequest() {

    let url = 'http://localhost:5000/api/scene';
    // let data = {
    //     video: "http://...",
    //     name: "valid_test2",
    //     degree: 4
    //  };

    console.log(schema_scene);

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(schema_scene[0]),
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
    let url = 'http://localhost:5000/api/scene';
    let res = await fetch(url);

    if (res.ok) {

        let text = await res.text();

        return text;
    } else {
        return `HTTP error: ${res.status}`;
    }
}

// doPostRequest().then(data => {
//     console.log(data);
// });

doGetRequest().then(data => {
    console.log(data);
});