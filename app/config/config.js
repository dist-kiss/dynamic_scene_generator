const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

module.exports = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  IVE_URL: process.env.IVE_URL,
  IVE_USER: process.env.IVE_USER,
  IVE_PW: process.env.IVE_PW
};