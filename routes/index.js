
/*
 * GET home page.
 */

var sys_settings = require('../system_settings');

module.exports = function(app){

	app.get('/', function(req, res){
		res.render('index', { title: '首页' });
	});

	// app.get('/sendMsg', function(req, res){
	// 	res.render('sendMsg', {title: '发送消息', server: sys_settings.server});
	// });

	// app.get('/startScan', function(req, res){
	// 	res.render('startScan', {title: "扫描发送消息", pageToken: sys_settings.monitorToken, server: sys_settings.server});
	// });

	app.get('/monitor', function(req, res){
		res.render('monitor', {title : 'Crawler Monitor', server : sys_settings.server, port : sys_settings.port});
	});
};