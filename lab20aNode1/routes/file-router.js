var path = require('path');


module.exports =

{
defineRouting: function(app)

{
  //Adding File Serving
  //additional route as follows:
  // handle request for static resources
  app.get('/site/:filename', function(req, res)
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

}
};
