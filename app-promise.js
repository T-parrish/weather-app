// same weather app, but using promises over callbacks
// also learned how to use Axios
// promise chaining is pretty rad.

const yargs = require('yargs')
const geocode = require('./geocode/geocode.js')
const keys = require('./keys/keys_dev')
const axios = require('axios')

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

var queryAddress = encodeURIComponent(argv.address);
var urlBase = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var geocodeUrl = `${urlBase}${queryAddress}&key=${keys.geocodeAPI}`;

axios.get(geocodeUrl).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find the address');
	}
	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/${keys.darkSkyAPI}/${lat},${lng}`
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl); 
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`it is currently ${temperature}, but it feels like ${apparentTemperature}`)
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('unable to connect to server')
	} else {
		console.log(e.message);
	}
});