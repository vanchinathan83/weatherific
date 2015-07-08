'use strict';
var exports = module.exports = {};
var async = require('async');
var http = require('http');

exports.getAsyncWeather = function (apiEndpoints,resultsCallback){
	var apiCalls = [];
	apiEndpoints.forEach(function(endpoint){
		
		apiCalls.push(function(callback){
			doHttp(endpoint,callback);
		});

	});
	async.parallel(apiCalls, function(error, results){
		resultsCallback(results);
	});
};

/**
A Method do http calls. Can be reused for other http calls as well 
**/
function doHttp(apiEndpoint,callback){
	http.get(apiEndpoint, function(response){
				var json = '';
				response.on('data', function(jsonPart){
					json += jsonPart;
				});

				response.on('end', function(){
					callback(null,JSON.parse(json));
				});

			}).on('error', function(error){
				callback(error);
			});
}


	