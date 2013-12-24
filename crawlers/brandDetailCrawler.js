exports.start = function(brand, outercallback){
	
	var settings = require('./crawler_settings');
	var webdriver = require('selenium-webdriver');
	var async = require('async');
	var Brand = require('../models/brand');
	var driver = new webdriver.Builder().
			   	withCapabilities(webdriver.Capabilities.chrome()).
			   	build();

	async.series([

		function(callback){
			driver.get(settings.brandDetailPageUrl + brand.tid).then(outercallback);
		},

		function(callback){
			
		}

	], function(err){

	});
};