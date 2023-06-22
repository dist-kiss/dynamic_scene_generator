const express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser")
// const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

const db = require("./app/models");
const Scene = db.scenes;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});


//Not sure where this should go maybe just stay here?
app.post("/createscene",(req,res)=>{
signs = new Array();
  for (let i = 0; i < req.body.sign.length; i++) {
    signs.push({
      "direction" : req.body.signdirection[i], "sign": req.body.sign[i]
    })
  } 
crowds = new Array();
for (let i = 0; i < req.body.crowd.length; i++) {
  crowds.push({
    "direction" : req.body.crowddirection[i], "crowdedness": req.body.crowd[i]
  })
}
distances = new Array();
for (let i = 0; i < req.body.distance.length; i++) {
  distances.push({
    "direction" : req.body.distancedirection[i], "distance": req.body.distance[i]
  })
}
const scene = new Scene({
  scenario_name: req.body.scenario_name,
  location_name: req.body.location_name,
  degree: req.body.degree,
  signs: signs,
  crowds: crowds,
  distances: distances
})
const { generate } = require('./generator');
generate(scene);



  scene.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error saving scene to Database');
    } else {
      console.log('Scene saved to database');
      return res.redirect('creation_success.html')
    }
  })
})


app.get("/",(req,res)=>{
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.redirect('index.html');
});

require("./app/routes/footage.routes")(app);
require("./app/routes/scene.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});