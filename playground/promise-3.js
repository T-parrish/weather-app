// turns out you can substitute callbacks for reject / resolve.
// extra benefit here is that you can resolve an object without passing undefined first.

const request = require('request');
const keys = require('../keys/keys_dev');


var urlBase = 'https://maps.googleapis.com/maps/api/geocode/json?address=' 

var geocodeAddress = (address) => {
	return new Promise ((resolve, reject) => { 
			var queryAddress = encodeURIComponent(address)

			request({
				url: (`${urlBase}${queryAddress}&key=${keys.geocodeAPI}`),
				json: true
			}, (error, response, body) => {
				if (error) {
					reject('unable to connect to google servers')
				} else if (body.status === 'ZERO_RESULTS') {
					reject('Unable to find that address.')
				} else {
					// need to specify undefined for when no errors are raised
					resolve({ 
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng
					})
				}	
			});
		});
	}


geocodeAddress('94022').then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
})