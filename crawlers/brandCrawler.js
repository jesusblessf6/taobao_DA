

exports.start = function(callback){
	var settings = require('./crawler_settings');
	var webdriver = require('selenium-webdriver');
	var async = require('async');

	var driver = new webdriver.Builder().
	   	withCapabilities(webdriver.Capabilities.chrome()).
	   	build();

	driver.get(settings.brandListPageUrl);
	driver.quit();

	callback();
};