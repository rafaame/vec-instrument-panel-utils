var net = require('net');

var server = null;
var connectedHandler = function(socket) {
	console.log('Connected: ', socket.remoteAddress, socket.remotePort);

	var sendInterval;
	socket.on('close', function (data) {
		console.log('Closed: ', data);
		clearInterval(sendInterval);

		//setTimeout(function () {
		//	server = net.createServer(connectedHandler);
		//	server.listen(27015, '0.0.0.0');
		//}, 1000);
	});

	var stop = false;
	var count = 0;
	var sendFunc = function () {
		if (stop) {
			return;
		}

		//count = 0;

		var data = '{' +
			'"engineRpm": ' + count * 100 + ',' +
			'"speed": ' + count + ',' +
			'"coolantTemp": 0,' +
			'"fuelLevel": 0,' +

			'"isDriverPresent": true,' +
			'"isTurnLeftOn": false,' +
			'"isTurnRightOn": false,' +
			'"isHeadlampOn": false,' +
			'"hasOpenDoor": false,' +
			'"hasOilPressure": false,' +
			'"isParkingBrakeOn": false,' +
			'"isKeyOnFirstPos": false,' +
			'"isKeyAfterFirstPos": false' +
		'}';

		console.log("Sending: ", count);
		socket.write(data);
		count += parseInt(Math.random() * (10 - 1) + 1);

		//if (count > 50) {
		//	stop = true;
		//}
	};

	sendInterval = setInterval(sendFunc, 100);
};

server = net.createServer(connectedHandler)
server.listen(27015, '0.0.0.0');
