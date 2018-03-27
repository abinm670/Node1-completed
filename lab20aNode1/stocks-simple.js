//refrence required modules

var fs = require ('fs');
var path = require ('path');
var parser = require('body-parser');
var express = require ('express');

// reading the provided json file
var jsonPath = path.join(__dirname, 'public', 'stocks-simple.json');
var jsonData = fs.readFileSync(jsonPath, 'utf8');
//dirname is a standard UNIX computer program. When dirname is given a pathname, it will
//delete any suffix beginning with the last slash character and return the result)
//conver string data into json object
var stocks = JSON.parse(jsonData);


//create an express app
var app = express();

//tell node to use json and HTTP header feature in the body-parser

app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

// return all the stocks when a root request arrives

app.route('/')
  .get(function(req,resp)
{resp.json(stocks);}
);

// use the express to listen to port

let port =1222;
app.listen(port, function()
{console.log("Sever runing at port=" + port); }
);
