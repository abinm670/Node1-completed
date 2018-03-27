// refrence our own modules


//refrence required modules
var fs = require ('fs');
var path = require ('path');
var parser = require('body-parser');
var express = require ('express');

//add route to the file


// reading the provided json file
var jsonPath = path.join(__dirname, 'public', 'stocks-complete.json');
var jsonData = fs.readFileSync(jsonPath, 'utf8');
//dirname is a standard UNIX computer program. When dirname is given a pathname, it will
//delete any suffix beginning with the last slash character and return the result)
//conver string data into json object
var stocks = JSON.parse(jsonData);


//create an express app
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

// return all the stocks when a root request arrives
app.route('/')
  .get(function(req,resp)
{resp.json(stocks);}
);





// add route for accessing file from thw browser to local data and display it
var staticFileRouter = require('./routes/file-router.js');
staticFileRouter.defineRouting(app);

// refrence our own module - find any name match in the parameters match in the files
// and this is the route
var nameRouter = require ('./routes/name-router.js');
nameRouter.defineRouting(stocks,app);
var symbolRouter = require ('./routes/symbol-router.js');
symbolRouter.defineRouting(stocks,app);



//tell node to use json and HTTP header feature in the body-parser





/******* we dine it in seprate page
// change here only return the requested stock(adding route)
app.route('/stock/:symbol')
  .get(function(req,resp)
{
// change user supplied symbol to upper case (array for object that match)
var symboLToFind = req.params.symbol.toUpperCase();
// search the array of objects for a match
var matches = stocks.filter(function(obj)
{return symboLToFind === obj.symbol ; }
);
// return the match stock
resp.json(matches);
});






/*
app.route('/stock/name/:substring')
.get(function(req,resp)
{
var substring = req.params.substring.toLowerCase();
var matches = stocks.filter(function(obj)
{
return  obj.name.toLowerCase().includes(substring)}

);

  resp.json(matches);
});
*/

// using a arrow function

/* we have our own module now
app.route('/stock/name/:substring')
 .get(function(req,resp)

{
  var substring = req.params.substring.toLowerCase();
var matches = stocks.filter((obj)=>
  obj.name.toLowerCase().includes(substring));

  resp.json(matches);
});

*/

//Adding File Serving
//additional route as follows:
// handle request for static resources
/*app.get('/site/:filename', function(req, res)
{
  var options ={ root: path.join(__dirname, '../public/')};
  res.sendFile(req.params.filename, options, function(err)
{
if(err)
{
  console.log(err);
  res.status(404).send('File Not Found')
}
else {
  console.log('Sent:', req.params.filename)
}

});

});
*/

// use the express to listen to port
let port=1111;
app.listen(port, function()
{console.log("Sever runing at port=" + port); }
);
