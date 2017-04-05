var util = require('util')
var exec = require('child_process').exec;
var net = require('net');

function puts(error, stdout, stderr) {
	console.log(stdout);
}

var server = null;
var connectedHandler = function(socket) {
	console.log('Connected: ', socket.remoteAddress, socket.remotePort);

	socket.on('close', function (data) {
		console.log('Closed: ', data);
	});

	socket.on('data', function (data) {
		data.map(function (e) {
			console.log(e, String.fromCharCode(e));
		});
		data = String.fromCharCode.apply(null, data);
		console.log(data);

		data = data.split('\n');
		data = data.pop();

		exec(data, puts);

		socket.write('HTTP/1.1 200 OK\nAccess-Control-Allow-Origin: *', function () {
			socket.destroy();
		});
	});
};

server = net.createServer(connectedHandler)
server.listen(27016, '0.0.0.0');
