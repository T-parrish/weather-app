const request = require('request');
const keys = require('../keys/keys_dev');

var fetchForecast = (lat, lng, callback) => {
	
	var urlBase = 'https://api.darksky.net/forecast/'

	request({
			url: (`${urlBase}${keys.darkSkyAPI}/${lat},${lng}`),
			json: true
			}, (error, response, body) => {
				if (!error && response.statusCode === 200) {
					callback(undefined, {
						temperature: body.currently.temperature,
						apparentTemperature: body.currently.apparentTemperature
					});
				} else {
					console.log('unable to fetch the weather.')
				}
		});
	}

module.exports.fetchForecast = fetchForecast;
