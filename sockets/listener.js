/*

socket listeners

*/

module.exports = function(io){

	var globalCrawlerHandler = require('./globalCrawlerHandler');

	io.sockets.on('connection', function (socket) {

		//connected
		socket.emit('connected', {status: 'ok'});

		//start the global crawler
		socket.on('start global crawler', function(data){
			globalCrawlerHandler(data, socket);
		});

	});
};