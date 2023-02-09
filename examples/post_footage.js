async function doPostRequest() {

    let url = 'http://localhost:5000/api/footage';
    let data = {
        video: "http://...",
        name: "valid_test2",
        degree: 4
     };

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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


doGetRequest().then(data => {
    console.log(data);
});