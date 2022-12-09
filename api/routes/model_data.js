const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

const Model_data = require("../models/model_data");

router.get("/", (req, res, next) => {
    Model_data.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.post("/", (req, res, next) => {
    const model_data = new Model_data({
        _id: new mongoose.Types.ObjectId(),
        degree: req.body.degree,
        detour: req.body.detour,
        lenght_traversed: req.body.lenght_traversed,
        numb_prev_detours: req.body.numb_prev_detours,
        sign_type: req.body.sign_type,
    })
    model_data
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Handling POST requests to /model_datas",
                createdModel_data: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                eroor: err
            })
        });

})

router.get("/:model_dataID", (req, res, next) => {
    const id = req.params.model_dataID;
    Model_data.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({ doc });
            } else {
                res.status(404).json({ message: "Not a valid ID" });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });

});

router.patch('/:model_dataID', (req, res, next) => {
    const id = req.params.model_dataID;
    Model_data.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.status(500).json({ error: err }))

})

router.delete("/:model_dataID", (req, res, next) => {
    const id = req.params.model_dataID;
    Model_data.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;