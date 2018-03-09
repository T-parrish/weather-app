const yargs = require('yargs')
const geocode = require('./geocode/geocode.js')
const keys = require('./keys/keys_dev')
const fetchForecast = require('./darksky/darksky.js')

// coinmarketcap url: https://api.coinmarketcap.com/v1/ticker/
// https://api.darksky.net/forecast/APIKEY/LAT,LNG

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

var lat = 16.5618907
var lng = 42.9635889

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage)
	} else {
		console.log(JSON.stringify(results, undefined, 2));
	}
});

fetchForecast.fetchForecast(lat, lng, (errorMessage, forecastResults) => {
	if (errorMessage) {
		console.log(errorMessage)
	} else {
		console.log(JSON.stringify(results, undefined, 2));
	}
});