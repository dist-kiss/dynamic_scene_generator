# dynamic_scene_generator
Dynamic generation of scenes in the IVE based on situations of relevance for the ABM

Current status of API based on following Code example: https://github.com/bezkoder/node-express-mongodb (The GitHub Account also has further examples implementing a GUI with Angular, based on this API structure).

# Get Started

1. Install dependencies: `npm install package.json`
2. Install mongodb and start your instance if you run it locally
3. Change mongo db path and other variables in `.env`-file to your settings
3. Start server with `npm start`
4. Go to the localhost you specified as SERVER_PORT in the `.env`-file and create a new IVE scene
5. Do example requests on the database by adapting and running `node .\examples\post_footage.js`
