module.exports = mongoose => {

    const scene_schema = mongoose.Schema({
        scenario_name: {
            type: String,
            required: true
        },
        location_name: {
            type: String,
            required: true
        },
        degree: {
            type: Number,
            required: true
        },
        signs: [{
            direction: { type: Number, min: 1, max: 3, required: true },
            sign: {
                type: String,
                enum: {
                    values: ['stop', 'go'],
                    message: '{VALUE} is not supported. Needs to be stop or go'
                },
                required: true
            }
        }],
        crowds: [{
            direction: { type: Number, min: 1, max: 3, required: true },
            crowdedness: {
                type: Number,
                min: 0,
                max: 1, // for now just allow 0 (no crowd) and 1 (crowd); change later if applicable
                required: true
            }
        }],
        distances: [{
            direction: { type: Number, required: true },
            distance: {
                type: Number,
                required: true
            }
        }]
    })

    const Scene = mongoose.model("scene", scene_schema);
    return Scene;
};