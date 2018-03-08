const request = require('request')
const keys = require('./keys/keys_dev');
const yargs = require('yargs')

const geocode = require('./geocode/geocode.js')

// coinmarketcap url: https://api.coinmarketcap.com/v1/ticker/

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather',
			string: true
		}
	})
	.help()
	// sets an alias for the help function
	.alias('help', 'h')
	.argv;

// console.log(argv.a);

var urlBase = 'https://maps.googleapis.com/maps/api/geocode/json?address=' 
var queryAddress = encodeURIComponent(argv.a)

request({
	url: urlBase + queryAddress + '&key=' + keys.geocodeAPI,
	// another way to do the same thing
	// url: (`${urlBase}${queryAddress}&key=${keys.geocodeAPI}`),
	json: true
}, (error, response, body) => {
	// pretty prints the entire JSON response object
	// first argument is the object, second is a filter, third is number of spaces
	// console.log(JSON.stringify(body, undefined, 2));
	if (error) {
		// run error statement
		console.log('unable to connect to google servers')
	} else if (body.status === 'ZERO_RESULTS') {
		console.log('Unable to find that address.')
	} else {
		console.log(`Address: ${body.results[0].formatted_address}`);
		console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
		console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
	}	
});