const http = require("http");
const app = require("./app");


const port = 5000;

const srver = http.createServer(app);

app.listen(port);