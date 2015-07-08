'use strict';

var weather = require('../../lib/async_weather');
// Using the api cache to minimize the requests to wunderground
var apicache = require('apicache').options({debug:true, defaultDuration:  3600000, enabled: true}).middleware;

module.exports = function(router) {
	// Logging all the requests
	router.all('/', function(request,response,next){
		console.log('Body : ' + request.body);
		console.log('Query Parameters : ' + request.query);
		console.log('Query Parameters via q: ' + request.query.q);
		console.log('IP : ' + request.ip);
		console.log('Path : ' + request.path);
		console.log('Original Url : ' + request.originalUrl);
		next();
	});

	router.get('/', apicache('5 minutes'), function(request,response){
		// creating a cache group. Easier to delete
		request.apicacheGroup = 'weather';
		var locations = [{'stateCode' : 'CA', 'city' : 'Campbell'},{'stateCode' : 'NE', 'city' : 'Omaha'}, {'stateCode' : 'TX', 'city' : 'Austin'},{'stateCode' : 'MD', 'city' : 'Timonium'}];
		var apiEndpoints = [];
		locations.forEach(function(location){
			apiEndpoints.push(getAPIEndpoint(location,request));
		});
		weather.getAsyncWeather(apiEndpoints,function(results){
			response.render('weather/index', {'title' : 'WeatherMan','appName' : 'Weatherific','weatherReports' : results});
		});
	});
};

/**
Construct the API Endpoint URL 
**/
function getAPIEndpoint(location,request){
	var baseUrl = request.app.kraken.get('api:wunderground:base_url') + request.app.kraken.get('api:wunderground:api_key') + '/' + request.app.kraken.get('api:wunderground:conditions_context') + 'q/';
	return baseUrl + location.stateCode + '/' + location.city + '.json';
}
