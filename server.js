/**
 * Enkel server setup med Express
 */



const http = require('http'); //Package import
const app = require('./app');
const port = 3000;

const server = http.createServer(app);

server.listen(port);