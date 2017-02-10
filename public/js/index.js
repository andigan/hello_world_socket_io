$(document).ready( function () {

  // set socket location : io.connect('http://localhost:8000'); || io.connect('http://www.domain_name.com');
  var socket = io.connect([location.protocol, '//', location.host].join(''));

  socket.emit('Hey server, send out a socket.');

  socket.on('Hey client, set your background color to gray.', function() {
    document.getElementById('wrapper').style.backgroundColor = 'gray';
  });

  document.getElementById('form1').addEventListener('submit', function(event) {
    event.preventDefault();
    socket.emit("send message 1", document.getElementById('message1').value)
  });

  document.getElementById('form2').addEventListener('submit', function(event) {
    event.preventDefault();
    socket.emit("send message 2", document.getElementById('message2').value)
  });

  socket.on("send message 1 back.", function (data) {
    document.getElementById('message2').value = data;
  });

  socket.on("send message 2 back.", function (data) {
    document.getElementById('message2').value = data;
  });




}); // end of document.ready
