//console.log('hello world')
///

/* Node applications make frequent use of modules.
A module is simply a JS function  library with some additional code that wraps
the functions within an object.

You can then make use of a module via the require function.(how to use the function)
Most node applications make use of very rich infrasturcture of pre-existing modules available from npmjs.makeStockFromForm
  */
var http = require('http');

//connfigre HTTP server to respond with simple message to all requests

var server = http.createServer(function (request, response)
{
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello this is our first node.js application\n");
  response.end();
});

//Listen on part 8080 on local host
let port =8080;
server.listen(port);

//display a message on the terminal

console.log("Server runing at port=" + port);
