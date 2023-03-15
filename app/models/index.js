const { MONGO_URI } = require('../../app/config/config');

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = MONGO_URI;
db.footages = require("./footage.model.js")(mongoose);

module.exports = db;