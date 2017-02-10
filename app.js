// ################################################################## //
// set up server
var config = require('./config/config.js'), // import config variables
    port = config.port,                     // set the port
    express = require('express'),           // use express as the framwork
    app = express(),                        // create the server using express
    nunjucks = require('nunjucks'),         // require the templating engine
    path = require('path');                 // utility module

app.set('views', path.join(__dirname, 'views')); // express method to set the 'views' directory using a string.
nunjucks.configure(path.join(__dirname, 'views'), { autoescape: true, express: app }); // set up templating engine
app.use(express.static(path.join(__dirname, 'public'))); // this middleware serves static files, such as .js, .img, .css files


// Initialize server
var server = app.listen(port, function () {
  console.log('Listening on port %d', server.address().port);
});
// ################################################################## //

// router
app.get('/', function (req, res) {
  res.render('index.html');
});

// ##### SOCKET.IO ##### //

// Initialize server-side socket.io
var io = require('socket.io').listen(server);

// an instance of this function and its variables are created for each client connected
io.on('connection', function (socket) {
  console.log('a client connected');


// incoming sockets
  socket.on('Hey server, send out a socket.', function () {
    // outgoing socket
    socket.emit('Hey client, set your background color to gray.');
  });

  socket.on('send message 1', function (data) {
    console.log(data)
    socket.emit('send message 1 back.', data + ' etc...');
    //socket.broadcast.emit('send message 1 back.', data);
  });

  socket.on('send message 2', function (data) {
    console.log(data)
    socket.broadcast.emit('send message 2 back.', data);
//    io.emit('send message 2 back.', data);
  });

  // this fires when the client disconnects
  socket.on('disconnect', function () {
    socket.broadcast.emit('send message 1 back.', "Someone left.");
    console.log('a client disconnected');

  });













});








module.exports = app;
