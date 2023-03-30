module.exports = mongoose => {
   
    const scene_schema = mongoose.Schema({        
        scenario_name: {type: String, required:true},
        location_name: {type: String, required:true},
        degree: {type: Number, required: true},
        //TODO: make sure sign and crowd can only be valid sign and crowd inputs and there are a maximum of $numberofexits signs and crowds
        sign_1: {type: String, required: true},
        crowd_1: {type: Number, required: true}
        
        
       
    })
  
    const Scene = mongoose.model("scene", scene_schema);
    return Scene;
};