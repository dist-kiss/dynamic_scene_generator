// config.js 
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const result = dotenv.config();
const expResult = dotenvExpand.expand(result)
if (expResult.error) {
  throw expResult.error;
}
const { parsed: envs } = expResult;
module.exports = envs;