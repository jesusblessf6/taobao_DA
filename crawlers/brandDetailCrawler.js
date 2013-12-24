exports.start = function(brand, outercallback){
	
	var settings = require('./crawler_settings');
	var webdriver = require('selenium-webdriver');
	var async = require('async');
	var Brand = require('../models/brand');
	var ItemMeta = require('../models/itemMeta');
	var driver = new webdriver.Builder().
			   	withCapabilities(webdriver.Capabilities.chrome()).
			   	build();

	async.series([

		function(callback){
			driver.get(settings.brandDetailPageUrl + brand.tid).then(function(){
				driver.findElement({className : 'choices-item'}).then(function(itemPanel){
					itemPanel.findElements({tagName : 'li'}).then(function(thumbs){

						aysnc.eachLimit(thumbs, 2, 
							function(thumb, callback){
								
								var brandDetail = {
									brandTid : brand.tid
								};

								thumb.findElement({className : 'title'}).findElement({tagName : 'a'})
									.then(function(atag){
										brandDetail.url = atag.getAttribute('href');
										//var spuid;
										var linkParts = link.split('&');
										for(var i = 0; i < linkParts.length; i ++){
											var kvpair = linkParts[i].split('=');
											if(kvpair[0] == "spuid"){
												brandDetail.tid = kvpair[1];
												break;
											}else{
												continue;
											}
										}
										brandDetail.name = atag.getText();

									})
									.then(callback);
							}, 
							function(err){
								if(err){
									console.log(err);									
								}
								callback();
							}
						);
					})
				});
			});
		},

		function(callback){
			
		}

	], function(err){
		outercallback();
	});
};