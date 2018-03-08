var getUser = (id, callback) => {
	var user = {
		id : id,
		name: 'Taylor'
	};

	setTimeout(() => {
		callback(user);
	}, 3000);
	
};

// expects that the user object comes back as an argument
getUser(42, (userObject) => {
	console.log(userObject);
});