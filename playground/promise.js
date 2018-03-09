// request library does not support promises natively

var asyncAdd = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number') {
				resolve(a + b);
			} else {
				reject('Arguments must be numbers')
			}
		}, 1500);
	});
}


// chains promises together the long way, with quirks 
// if the first promise fails.
asyncAdd(9,3).then((message) => {
	console.log('success: ', message)
	return asyncAdd(message, 33);
}, (errorMessage) => {
	console.log('Error: ', errorMessage)
}).then((message) => {
	console.log('should be something ', message);
}, (errorMessage) => {
	console.log(errorMessage)
});

// chains promises together with catch statements
// best way to do this
asyncAdd(4,22).then((message) => {
	console.log('success: ', message)
	return asyncAdd(message, 33);
}).then((message) => {
	console.log('this is working ', message);
}).catch((errorMessage) => {
	console.log(errorMessage);
});



// promises take one argument
// can pass an anonymous callback function
var somePromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		// you can only pass a single value / argument to resolve and reject
		// if you want to pass multiple pieces of information, you can pass an object
		resolve('Help im trapped in a computer');
		reject('Unable to fulfill promise');
	}, 2500);
});

// one function for promise fulfillment / success
// one function for promise failure. Elegant.
// if the success triggers, the failure will never trigger and vice versa
somePromise.then((message) => {
	console.log('success: ', message)
}, (errorMessage) => {
	console.log('Error: ', errorMessage)
});