'use strict';

var assert = require('assert'),
	async_weather = require('../../lib/async_weather');

describe('Async Weather', function(){
	var endpoints = ['http://api.wunderground.com/api/18e84dd5987122c1/conditions/q/CA/San_Francisco.json','http://api.wunderground.com/api/18e84dd5987122c1/conditions/q/TX/Austin.json'];
	it('should return two weather results when endpoints array has two API queries', function(done){
		async_weather.getAsyncWeather(endpoints,function(results){
			assert.strictEqual(2,results.length,"Should have two results object");
			done();
		});
		
	});

	it('should return no results when endpoints array is empty', function(done){
		async_weather.getAsyncWeather([],function(results){
			assert.strictEqual(0, results.length,"Should have zero results");
			done();
		});
	})

});