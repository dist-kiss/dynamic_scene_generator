const db = require("../models");
const Scene = db.scenes;
const { generate } = require('../../generator');

// Create and Save a new scene
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.scenario_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a scene
  const scene = new Scene({
    scenario_name: req.body.scenario_name,
    location_name: req.body.location_name,
    degree: req.body.degree,
    sign_1: req.body.sign_1,
    crowd_1: req.body.crowd_1,
    })
  // Generate IVE request for Scene
 await generate(scene);


  // Save scene in the database
  scene
    .save(scene)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the scene."
      });
    });
};

// Retrieve all scenes from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Scene.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving scenes."
      });
    });
};

// Find a single scene with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Scene.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found scene with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving scene with id=" + id });
    });
};

// Update a scene by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Scene.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update scene with id=${id}. Maybe scene was not found!`
        });
      } else res.send({ message: "scene was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating scene with id=" + id
      });
    });
};

// Delete a scene with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Scene.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete scene with id=${id}. Maybe scene was not found!`
        });
      } else {
        res.send({
          message: "scene was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete scene with id=" + id
      });
    });
};

// Delete all scenes from the database.
exports.deleteAll = (req, res) => {
  Scene.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} scenes were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all scenes."
      });
    });
};

// Find all published scenes
exports.findAllPublished = (req, res) => {
  Scene.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving scenes."
      });
    });
};