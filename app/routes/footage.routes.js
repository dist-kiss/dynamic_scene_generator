module.exports = app => {
    const footage = require("../controllers/footage.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Footage
    router.post("/", footage.create);
  
    // Retrieve all Footages
    router.get("/", footage.findAll);
  
    // Retrieve a single Footage with id
    router.get("/:id", footage.findOne);

    // Retrieve all single Footages with degree
    router.get("/degree/:degree", footage.findByDegree);
  
    // Update a Tutorial with id
    router.put("/:id", footage.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", footage.delete);
  
    app.use("/api/footage", router);
};