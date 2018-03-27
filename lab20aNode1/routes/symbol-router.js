// the lodash module has many powerfull
//and helpfull array function

var _ = require ('lodash');

module.exports =

{defineRouting: function(stocks, app)
{

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
  }) // end of the return function
// end of the function of requesting and responding
//console.log(matches);

/*
.put(function(req,resp)
//if it is a PUT request then update specified stock
{
console.log('put request');
var symbolToUpd = req.body.symbol.toUpperCase();

// use lodash to find index for stock with this symbol
  let indx =_.findIndex(stocks, ['symbol', symbolToUpd]);
  // if did not find it, then return message
  if(index<0)
  {
    console.log('Symbol not find' + symbolToUpd);
    resp.json('message not found HHHHHHHHHHHHH');

  }else {
    //symbol Found in our stock array, so replace its value
    // with those from from
    stocks[indx] = req.body;
    // let request know it works
    resp.json({message:'Stock ' + symbolToUpd +'updated'});
    console.log('Symbol updated =' +symbolToUpd);
  }
}

*/
.put(function (req,resp) {
console.log('put request');
var symbolToUpd = req.body.symbol.toUpperCase();
// use lodash module to find index for stock with this symbol
let indx = _.findIndex(stocks, ['symbol', symbolToUpd]);
// if didn't find it, then return message
if (indx < 0) {
console.log('Symbol not found='+symbolToUpd);
resp.json({ message: 'Symbol not found' });
} else {
// symbol found in our stock array, so replace its value
// with those from form
stocks[indx] = req.body;
// let requestor know it worked
resp.json({message:'Stock ' + symbolToUpd + ' updated!' });
console.log('Symbol updated ='+symbolToUpd);
}
}
)//END THE PUT

//Start post new Item
//if psot request then insert new stock

.post(function(req,resp)

{
  console.log('request psot');

stocks.push({
symbol:req.body.symbol,
name: req.body.name,
SEC:req.body.sec,
sector:req.body.sector,
subIndustry: req.body.subIndustry,
address: req.body.address,
dataAdded: req.body.dataAdded,
CIK:req.body.cik,
Frequency: req.body.freq

});
resp.json({message: 'New Stock' + req.body.name + 'added!'});



}

)
// if it is a delete request then delete specific stock
.delete(function(req,resp)
{
var symbolToDel = req.params.symbol.toUpperCase();

console.log('delete request symbol = ' + symbolToDel);

// use ladash to find matching elment in the array

_.remove( stocks, {symbol:symbolToDel});
resp.json({message: 'Stock' + symbolToDel + 'deleted'});
}

);







}// end of the defineRoutingFunction

} // end of the module
