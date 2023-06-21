const dbConfig = require('../../app/config/config');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.footages = require("./footage.model.js")(mongoose);
db.scenes = require("./scene.model.js")(mongoose);

module.exports = db;