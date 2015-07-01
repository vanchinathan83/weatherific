'use strict';

var weather = require('../../lib/async_weather');

module.exports = function(router) {
	router.get('/', function(request,response){
		response.send("Hello weather app");
	});
};