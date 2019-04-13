var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http)

app.io = io;

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/open', function(req, res){
    req.app.io.emit('command', "open");
    res.send('ok');
});

app.get('/close', function(req, res){
    req.app.io.emit('command', "close");
    res.send('ok');
});


io.on('connection', function(socket){
    console.log('an user connected');

    socket.on('command', function(msg){
        console.log(socket.id + " says: " + msg);
        io.emit('command', msg);
    });

    socket.on('status', function(msg){
        console.log(socket.id + " status: " + msg);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected '+ socket.id);
    });
});



http.listen(3000, function(){
    console.log('listening on *:3000');
});

