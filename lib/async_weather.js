var exports = module.exports = {};
var async = require('async');


exports.getAsyncWeather = function (cities){
	if(cities){
		return cities;
	}else{
		return null;
	}
};

	