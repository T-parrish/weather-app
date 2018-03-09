// first attempt at building geocodeAddress function with promises

const request = require('request');
const keys = require('../keys/keys_dev');


var urlBase = 'https://maps.googleapis.com/maps/api/geocode/json?address=' 


var geocodeAddress = (address) => {
	return new Promise ((resolve, reject) => {
		if (typeof address === 'string') {
			var queryAddress = encodeURIComponent(address)
			resolve(request({
						url: (`${urlBase}${queryAddress}&key=${keys.geocodeAPI}`),
						json: true
					}));
			} else { 
				reject('Address not valid');
			}
		});
	}
		
	

geocodeAddress('94022').then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
})