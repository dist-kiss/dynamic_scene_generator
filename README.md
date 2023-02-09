# dynamic_scene_generator
Dynamic generation of scenes in the IVE based on situations of relevance for the ABM

Current status of API based on following Code example: https://github.com/bezkoder/node-express-mongodb (The GitHub Account also has further examples implementing a GUI with Angular, based on this API structure).

# Get Started

1. install dependencies: `npm install package.json`
2. Change mongoDB instance in `/app/config/db.config.json`, to the one you are using (and start your instance if you run it locally)
3. Start server with `npm start`
4. Do example requests on the database by adapting and running `node .\examples\post_footage.js`
