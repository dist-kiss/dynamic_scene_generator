const mongoose = require("mongoose");


const model_dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    degree: Number,
    detour: Number,
    lenght_traversed: Number,
    numb_prev_detours: Number,
    sign_type: String
});


module.exports = mongoose.model("Model_data", model_dataSchema);