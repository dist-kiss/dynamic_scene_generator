const db = require("../models");
const Footage = db.footages;

// Create and Save a new footage
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "name can not be empty!" });
    return;
  }

  // Create a footage
  const footage = new Footage({
    name: req.body.name,
    video: req.body.video,
    degree: req.body.degree,
    distance_overlays: req.body.distance_overlays, // TODO: does it work like this or need to split up and check for coordinates etc.?
    sign_overlays: req.body.sign_overlays,
    crowd_overlays: req.body.crowd_overlays
  })

  // Save footage in the database
  footage
    .save(footage)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the footage."
      });
    });
};

// Retrieve all footages from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const degree = req.query.degree;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  degree ? condition.degree = degree : {};

  Footage.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving footages."
      });
    });
};

// Find a single footage with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Footage.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found footage with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving footage with id=" + id });
    });
};

// Find all footages with a common degree value
exports.findByDegree = (req, res) => {
  const degree = req.params.degree;

  Footage.find({ degree: degree })
    .select('_id')
    .then(data => {
      if (data.length === 0) {
        res.status(404).send({ message: "No footages found with degree " + degree });
      } else {
        const ids = data.map(footage => footage._id);
        res.send(ids);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving footages with degree " + degree });
    });
};


// Update a footage by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Footage.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update footage with id=${id}. Maybe footage was not found!`
        });
      } else res.send({ message: "footage was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating footage with id=" + id
      });
    });
};

// Delete a footage with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Footage.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete footage with id=${id}. Maybe footage was not found!`
        });
      } else {
        res.send({
          message: "footage was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete footage with id=" + id
      });
    });
};

// Delete all footages from the database.
exports.deleteAll = (req, res) => {
  Footage.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} footages were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all footages."
      });
    });
};

// Find all published footages
exports.findAllPublished = (req, res) => {
  Footage.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving footages."
      });
    });
};