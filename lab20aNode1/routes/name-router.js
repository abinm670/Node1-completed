

module.exports =
 { defineRouting: function(stocks, app)
//retun all the stokcs whoes name contains the supplied text

{
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
}
};
