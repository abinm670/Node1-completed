
// process URL paths as well read/write files


var http = require("http");
var url = require ("url");
var path = require("path");
var fs = require("fs");


//outputs an HTTP 404 erro
// This error indicates that the user's request contains incorrect syntax.
const output404Error = function(response)
{
response.writeHead(404, {"Content-Type": "text/html"});
response.write("<h1>404 Error </h1>\n");
response.write("The requestd file isnt on this machine \n");
response.end();
}

// outputs an HTTP 500 error (using arrow syntax)
// 500 Internal Server Error
// the application being configured incorrectly on the server.

const output500Error = (response, err) =>
{
  response.writeHead(500, {"Content-Type": "text/html"});
  response.write("<h1> 500 erro</h1> \n");
  response.write(err + "\n");
  response.end();
}
// define the following array (maps file exention to MIME type )
//A MIME type is a label used to identify a type of data

const mimeType =
{'.html': 'text/html',
'.json:':'application/json',
'.jph': 'image/jpeg',
'.svg': 'image/svg+xml'};

// our HTTP server now returns requested files
var server = http.createServer(function (request, response)
{
  // get the file name from the url
   var requestedFile = url.parse(request.url).pathname;

  // now turn that into a file system file namme by adding the current
  //local folder path name in front of the filename

  var ourPath = process.cwd() + "/public";
  var filename= path.join(ourPath , requestedFile);
  console.log(filename);

  //check if it exists on the computer
  // this function take one input and and other function
  fs.exists(filename, function(exists)
{// if it did not exists then return error 404
  if(!exists)
  {
    output404Error(response);
    return;
}
//if no file was specify then return defualt page
if(fs.statSync(filename).isDirectory()) filename += '/tester.html';

// file was specified then read it and send contects to requestor
fs.readFile(filename, "binary", function (err, file)
{
  if(err)
  {
     output500Error(response, err);
     return;
  }

//based on the URL path, extract the file extension
const ext = path.parse(filename).ext ;

//specify the mime type of file via header
var header = {'Contetnt-type' : mimeType[ext] || 'text/plain'};
response.writeHead(200, header);

//output the content of file
response.write(file, "binary");
response.end();

});
});
});





// listen on port on localhost
let port = 8080;
server.listen(port);

//display a message on the terminal

console.log("Server runing on the terminal at port= " + port);
