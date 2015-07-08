'use strict';
var apicache = require('apicache').options({debug:true, defaultDuration:  3600000, enabled: true}).middleware;
var httprequest = require('request');
module.exports = function(router){

	router.get('/image/:city/:state', apicache('1 day'),function(request,response,next){
		var city = request.params.city;
		var state = request.params.state;
		
		request.apicacheGroup = city + ',' + state;
		var bing_imagesearch_endpoint = request.app.kraken.get('api:bing:image_search_endpoint') + city +'%27' + state + '%27&$format=json';
		console.log(bing_imagesearch_endpoint);
		var options = {
			url: bing_imagesearch_endpoint,
			port: 443,
			rejectUnauthorized: false,
			method: 'GET',
			headers : {
				'Authorization' : 'Basic ' + request.app.kraken.get('api:bing:auth_key')
			}
		};
		httprequest(options, function(error,httpResponse, body){
				if(!error && httpResponse.statusCode === 200){
					response.render('search/image', {'imageSearchResults' : JSON.parse(body).d.results });
				}else{
					response.send('Error retrieving data!!');
				}

			});
	});

	router.get('/news/:city/:state', apicache('1 hour'),function(request,response,next){
		var city = request.params.city;
		var state = request.params.state;
		
		request.apicacheGroup = city + ',' + state;
		var bing_newssearch_endpoint = request.app.kraken.get('api:bing:news_search_endpoint') + city +'%27' + state + '%27&$format=json';
		var options = {
			url: bing_newssearch_endpoint,
			port: 443,
			rejectUnauthorized: false,
			method: 'GET',
			headers : {
				'Authorization' : 'Basic ' + request.app.kraken.get('api:bing:auth_key')
			}
		};
		httprequest(options, function(error,httpResponse, body){
				if(!error && httpResponse.statusCode === 200){
					response.render('search/news', {'news' : JSON.parse(body).d.results});
				}else{
					response.send('Error retrieving data!!');
				}

			});
	});
};