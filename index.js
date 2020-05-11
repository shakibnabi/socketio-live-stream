var express = require("express");
var app = new express();
var http = require("http").createServer(app);
var io = require("socket.io")(http, { wsEngine: 'ws' });

var Log = require("log");
var log = new Log("debug");


var port = 3000;

app.use(express.static(__dirname + "/statics"));

app.get('/',function(req,res){
	res.redirect('index.html');
});

io.on('connection',function(socket){
	socket.on('stream',function(image){
		socket.broadcast.emit('stream', image);
	});
});
http.listen(port, function() {
	console.log('Server running well port is %s',port);
})