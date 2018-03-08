const request = require('request');
const keys = require('../keys/keys_dev');

var fetchForecast = (lat, lng, callback) => {
	
	var urlBase = 'https://api.darksky.net/forecast/'

	request({
			url: urlBase + keys.darkSkyAPI + lat + lng,
			// another way to do the same thing
			// url: (`${urlBase}${queryAddress}&key=${keys.geocodeAPI}`),
			json: true
		}, (error, response, body) => {
			// pretty prints the entire JSON response object
			// first argument is the object, second is a filter, third is number of spaces
			// console.log(JSON.stringify(body, undefined, 2));
			if (!error && response.statusCode === 200) {
				// run error statement
				console.log(`Temp: ${body.currently.temperature}`);
			} else {
				console.log('unable to fetch the weather.')
			}
		});
	}

module.exports.fetchForecast = fetchForecast;
