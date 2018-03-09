const request = require('request');
const keys = require('../keys/keys_dev');

var geocodeAddress = (address, callback) => {
	var urlBase = 'https://maps.googleapis.com/maps/api/geocode/json?address=' 
	var queryAddress = encodeURIComponent(address)

	request({
		// url: urlBase + queryAddress + '&key=' + keys.geocodeAPI,
		// another way to do the same thing
		url: (`${urlBase}${queryAddress}&key=${keys.geocodeAPI}`),
		json: true
	}, (error, response, body) => {
		// pretty prints the entire JSON response object
		// first argument is the object, second is a filter, third is number of spaces
		// console.log(JSON.stringify(body, undefined, 2));
		if (error) {
			// run error statement
			callback('unable to connect to google servers')
		} else if (body.status === 'ZERO_RESULTS') {
			callback('Unable to find that address.')
		} else {
			// need to specify undefined for when no errors are raised
			callback(undefined, { 
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			})
		}	
	});
}

module.exports.geocodeAddress = geocodeAddress