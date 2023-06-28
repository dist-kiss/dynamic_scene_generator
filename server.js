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
  extended: true
}))

const db = require("./app/models");

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

app.get("/", (req, res) => {
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