module.exports = app => {
    const scene = require("../controllers/scene.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Scene
    router.post("/", scene.create);
  
    // Retrieve all Scenes
    router.get("/", scene.findAll);
  
    // Retrieve a single scene with id
    router.get("/:id", scene.findOne);
  
    // Update a Scene with id
    router.put("/:id", scene.update);
  
    // Delete a Scene with id
    router.delete("/:id", scene.delete);
  
    app.use("/api/scene", router);
};