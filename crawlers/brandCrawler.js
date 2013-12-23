

exports.start = function(outercallback){
	var settings = require('./crawler_settings');
	var webdriver = require('selenium-webdriver');
	var async = require('async');
	var driver = new webdriver.Builder().
			   	withCapabilities(webdriver.Capabilities.chrome()).
			   	build();

	async.series([

		function(callback){
			driver.get(settings.brandListPageUrl);
			driver.quit();
			callback();
		}

		// function(callback){

		// }

	], function(err){
		if(err){
			console.log(err);
		}

		outercallback();
	});

	

	
};