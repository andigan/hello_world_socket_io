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

console.log('ok');

// an instance of this function and its variables are created for each client connected
io.on('connection', function (socket) {
  console.log('a client connected');


// incoming remote control sockets
  socket.on('hey_server_send_out_a_socket', function () {
    // outgoing socket
    socket.emit('hey_clients_change_your_divs');
  });



  socket.on('seed_canvas', function (data) {
    socket.broadcast.emit('seed_canvas', data);
  });



  // this fires when the client disconnects
  socket.on('disconnect', function () {

    console.log('a client disconnected');

//    socket.broadcast.emit('client_disconnected', socketdata);
  });













});








module.exports = app;
