$(document).ready( function () {

  document.getElementById('put_something_here').textContent = 'From Javascript File';


  // set socket location : io.connect('http://localhost:8000'); || io.connect('http://www.domain_name.com');
  var socket = io.connect([location.protocol, '//', location.host].join(''));

  socket.emit('hey_server_send_out_a_socket');


  socket.on('hey_clients_change_your_divs', function() {
    document.getElementById('put_something_here').style.backgroundColor = 'yellow';

  });





}); // end of document.ready
