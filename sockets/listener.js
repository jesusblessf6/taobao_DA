/*

socket listeners

*/

module.exports = function(io){

	var brandCrawler = require('../crawlers/brandCrawler');
	var async = require('async');
	var Brand = require('../models/brand');
	var brandDetailCrawler = require('../crawlers/brandDetailCrawler');
	var itemMetaCrawler = require('../crawlers/itemMetaCrawler');
	var ItemMeta = require('../models/itemMeta');

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

				//start the brand crawler
				function(callback){
					brandCrawler.start(callback);
				},

				//trverse the brands
				function(callback){
					Brand.getAll(function(err, results){
						if(err){
							console.log(err);
						}

						async.eachLimit(results, 1, function(result, callback){
							brandDetailCrawler.start(result, callback);
							
						}, function(err){
							if(err){
								console.log(err);
							}
							callback();
						});
					});
				},

				//trverse the item metas
				function(callback){
					ItemMeta.getAll(function(err, results){
					//ItemMeta.getByBrandTid(20016, function(err, results){
						if(err){
							console.log(err);
						}

						async.eachLimit(results, 1, function(result, callback){
							itemMetaCrawler.start(result.tid, result.brandTid, callback);
						}, function(err){
							if(err){
								console.log(err);
							}
							callback();
						});
					});
				},

				function(callback){
					socket.emit('crawler running status', {status : 'finished'});
					callback();
				}

			], function(err){ // end. send message to inform the monitor
				if(err){
					console.log(err);
				}
			});

		});

	});
};