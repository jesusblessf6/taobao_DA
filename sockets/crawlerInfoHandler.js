var crawlerTypes = require('../crawler_types');
var Crawling = require('../models/crawling');

module.exports = function(data, socket){
	Crawling.geRunningByType(data.type, function(err, results){
		
	});
};