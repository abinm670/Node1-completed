
var http=require('http');

var server=http.createServer(function(req,res)
{res.end('test');}
);

server.on('listening',function()
{ console.log('ok, server is runing');
}
);

server.listen(1222);
