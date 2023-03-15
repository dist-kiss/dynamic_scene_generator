module.exports = mongoose => {
    const ankerpoint = mongoose.Schema({
        direction: {type: Number, min: 1, max: 5, required: true},
        screen_coordinate: {
            x: {type: Number, required: true, min: 0, max: 1080},
            y: {type: Number, required: true, min: 0, max: 5760}
        }
    })
    
    const footage_schema = mongoose.Schema({
        // _id: mongoose.Schema.Types.ObjectId,
        name: {type: String, required:true},
        video: {type: String, required:true},
        degree: {type: Number, required: true},
        // TODO: limit number of ankerpoints per overlay type to degree; where is this possible, here or in ankerpoint Schema?
        distance_overlays: [ankerpoint],
        sign_overlays: [ankerpoint],
        crowd_overlays: [ankerpoint]
    })
  
    const Footage = mongoose.model("footage", footage_schema);
    return Footage;
};


/* 

const mongoose = require("mongoose");

const dist_ov_ankerpoints = mongoose.Schema({
    direction: {type: Number, min: 1, max: 5, required: true},
    screen_coordinate: {
        x: {type: Number, required: true, min: 0, max: 1080},
        y: {type: Number, required: true, min: 0, max: 5760}
    }
})

const footage_schema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true},
    video: {type: String, required:true},
    degree: {type: Number, required: true},
    distance_overlays: [dist_ov_ankerpoints]
})

const model_dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    degree: Number,
    // The following are the inputs from the model / user and not what we save in database
    // -> These are directly processed to create actual IVE video
    detour: Number,
    lenght_traversed: Number,
    numb_prev_detours: Number,
    sign_type: String
});

 
module.exports = mongoose.model("Footage", footage_schema);
// module.exports = mongoose.model("Model_data", model_dataSchema); 

*/