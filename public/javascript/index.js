async function api_call(route, body) {
  await fetch("/api/" + route, {
    method: 'POST',
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  })
}
//Create a JSON from the scene creator and then use it to generate a scene
async function add_new_scene() {
  let signs = new Array();
  for (let i = 0; i < signcounter; i++) {
    let signdirection = document.getElementById(`signdirection${i}`).value;
    let sign = document.getElementById(`sign${i}`).value;
    signs.push({
      "direction": signdirection, "sign": sign
    })
  }
  let crowds = new Array();
  for (let i = 0; i < crowdcounter; i++) {
    let crowddirection = document.getElementById(`crowddirection${i}`).value;
    let crowd = document.getElementById(`crowd${i}`).value;
    crowds.push({
      "direction": crowddirection, "crowdedness": crowd
    })
  }
  let distances = new Array();
  for (let i = 0; i < distancecounter; i++) {
    let distancedirection = document.getElementById(`distancedirection${i}`).value;
    let distance = document.getElementById(`distance${i}`).value;
    distances.push({
      "direction": distancedirection, "distance": distance
    })
  }
  const scene = ({
    scenario_name: document.getElementById("scenario_name").value,
    location_name: document.getElementById("location_name").value,
    degree: document.getElementById("degree").value,
    signs: signs,
    crowds: crowds,
    distances: distances
  })
  console.log(scene)
  await api_call("scene", scene)
}

//code for creating input fields and buttons and selectors
//TODO: limit number of ADD XYZ too degree on website
//signs
const signsContainer = document.querySelector(".signs-container");
const addSignBtn = document.querySelector(".add-sign-btn");
const directions = [1, 2, 3];
const signs = ["stop", "go"];
let signcounter = 0;
addSignBtn.addEventListener("click", () => {
  const signDirectionSelect = document.createElement("select");
  signDirectionSelect.name = "signdirection";
  signDirectionSelect.id = `signdirection${signcounter}`;
  for (let i = 0; i < directions.length; i++) {
    const option = document.createElement("option");
    option.value = directions[i];
    option.text = directions[i];
    signDirectionSelect.appendChild(option);
  }
  const signSelect = document.createElement("select");
  signSelect.name = "sign";
  signSelect.id = `sign${signcounter}`;
  for (let i = 0; i < signs.length; i++) {
    const option = document.createElement("option");
    option.value = signs[i];
    option.text = signs[i];
    signSelect.appendChild(option);
  }
  const signDiv = document.createElement("div");
  signDiv.appendChild(signDirectionSelect);
  signDiv.appendChild(document.createTextNode(" "));
  signDiv.appendChild(signSelect);
  signDiv.innerHTML += "<br>";
  signsContainer.appendChild(signDiv);
  signcounter++;
});

//crowds
const crowdsContainer = document.querySelector(".crowds-container");
const addcrowdBtn = document.querySelector(".add-crowd-btn");
const crowds = ["empty", "slightly crowded", "very crowded"];
let crowdcounter = 0;
addcrowdBtn.addEventListener("click", () => {
  const crowdDirectionSelect = document.createElement("select");
  crowdDirectionSelect.name = "crowddirection";
  crowdDirectionSelect.id = `crowddirection${crowdcounter}`;
  for (let i = 0; i < directions.length; i++) {
    const option = document.createElement("option");
    option.value = directions[i];
    option.text = directions[i];
    crowdDirectionSelect.appendChild(option);
  }
  const crowdSelect = document.createElement("select");
  crowdSelect.name = "crowd";
  crowdSelect.id = `crowd${crowdcounter}`;
  for (let i = 0; i < crowds.length; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = crowds[i];
    crowdSelect.appendChild(option);
  }
  const crowdDiv = document.createElement("div");
  crowdDiv.appendChild(crowdDirectionSelect);
  crowdDiv.appendChild(document.createTextNode(" "));
  crowdDiv.appendChild(crowdSelect);
  crowdDiv.innerHTML += "<br>";
  crowdsContainer.appendChild(crowdDiv);
  crowdcounter++;
});

//Distance
const distancesContainer = document.querySelector(".distances-container");
const addDistanceBtn = document.querySelector(".add-distance-btn");
let distancecounter = 0;
addDistanceBtn.addEventListener("click", () => {
  const distanceDirectionSelect = document.createElement("select");
  distanceDirectionSelect.name = "distancedirection";
  distanceDirectionSelect.id = `distancedirection${distancecounter}`;
  for (let i = 0; i < directions.length; i++) {
    const option = document.createElement("option");
    option.value = directions[i];
    option.text = directions[i];
    distanceDirectionSelect.appendChild(option);
  }
  const distanceinput = document.createElement("input");
  distanceinput.setAttribute("type", "text");
  distanceinput.setAttribute("size", "1");
  distanceinput.name = "distance";
  distanceinput.id = `distance${distancecounter}`;
  const distanceDiv = document.createElement("div");
  distanceDiv.appendChild(distanceDirectionSelect);
  distanceDiv.appendChild(document.createTextNode(" "));
  distanceDiv.appendChild(distanceinput);
  distancesContainer.appendChild(distanceDiv);
  distancecounter++;
});


