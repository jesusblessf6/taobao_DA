/*

socket listeners

*/

module.exports = function(io){

	var brandCrawler = require('../crawlers/brandCrawler');
	var async = require('async');

	io.sockets.on('connection', function (socket) {

		//connected
		socket.emit('connected', {status: 'ok'});

		//start the global crawler
		socket.on('start global crawler', function(data){

			async.series([
				
				//send the message to inform monitor: the crawler starts running
				function(callback){
					socket.emit('crawler running status', {status : 'starting'});
					callback();
				},

				//start the crawler
				function(callback){
					brandCrawler.start(function(){
						
						callback();
					});
				}

			], function(err){ // end. send message to inform the monitor
				if(err){
					console.log(err);
				}
				socket.emit('crawler running status', {status : 'finished'});
			});
			
			
			
			

		});

	});
};