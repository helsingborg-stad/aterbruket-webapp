'use strict';
var CLIENT_ID = process.env.CLIENT_ID;
var USER_POOL_ID = process.env.USER_POOL_ID;
var AWS = require('aws-sdk');
var http = require('https');

AWS.config.update({ region: process.env.REGION });

console.log('Loading event');

function createUser(username, password, user, callback) {
	//Create the user with AdminCreateUser()
	var params = {
		UserPoolId: process.env.USER_POOL_ID,
		Username: username,
		TemporaryPassword: password,
		MessageAction: 'SUPPRESS', //suppress the sending of an invitation to the user
		UserAttributes: [
			{ Name: 'name', Value: user.displayname },
			{ Name: 'email', Value: user.userprincipalname },
			{ Name: 'email_verified', Value: 'true' }
		]
	};

	if (user.streetaddress) {
		params.UserAttributes.push({ Name: 'custom:address', Value: user.streetaddress })
	}

	if (user.postalcode) {
		params.UserAttributes.push({ Name: 'custom:postalcode', Value: user.postalcode })
	}

	if (user.department) {
		params.UserAttributes.push({ Name: 'custom:department', Value: user.department })
	}

	/* if (user.mobile) {
		params.UserAttributes.push({ Name: 'phone_number', Value: user.mobile })
	} */

	const userParams = {
		GroupName: "user",
		UserPoolId: process.env.USER_POOL_ID,
		Username: username
	};
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	cognitoidentityserviceprovider.adminAddUserToGroup(userParams).promise()

	cognitoidentityserviceprovider.adminCreateUser(params, function (err, data) {
		if (err) {
			console.log('Failed to Create migrating user in User Pool: ' + username);
			console.log(err)

			return;
		}
		else {
			//Successfully created the migrating user in the User Pool
			console.log("Successful AdminCreateUser for migrating user: " + username);

			//Now sign in the migrated user to set the permanent password and confirm the user
			params = {
				AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
				ClientId: process.env.CLIENT_ID,
				UserPoolId: process.env.USER_POOL_ID,
				AuthParameters: { USERNAME: username, PASSWORD: password }
			};

			cognitoidentityserviceprovider.adminInitiateAuth(params, function (signin_err, data) {
				if (signin_err) {
					console.log('Failed to sign in migrated user: ' + username);
					console.log(signin_err, signin_err.stack);

				}
				else {
					//Handle the response to set the password

					//Confirm the challenge name is NEW_PASSWORD_REQUIRED
					if (data.ChallengeName !== "NEW_PASSWORD_REQUIRED") {
						// unexpected challenge name - log and exit
						console.log("Unexpected challenge name after adminInitiateAuth (" + data.ChallengeName + "), migrating user created, but password not set");

					}

					params = {
						ChallengeName: "NEW_PASSWORD_REQUIRED",
						ClientId: process.env.CLIENT_ID,
						UserPoolId: process.env.USER_POOL_ID,
						ChallengeResponses: {
							'NEW_PASSWORD': password,
							'USERNAME': data.ChallengeParameters.USER_ID_FOR_SRP
						},
						Session: data.Session
					};
					cognitoidentityserviceprovider.adminRespondToAuthChallenge(params, function (err, data) {
						if (err) console.log(err, err.stack); // an error occurred
						else { // successful response
							console.log('Successful response from RespondToAuthChallenge: ' + username);
							callback(null, "RETRY")
							return;
						}
					});
				}
			});
		}
	});
}


exports.handler = function (event, context, callback) {
	console.log(event)
	var username = event.userName;
	var password = event.request.password;
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	//Check to see if the user exists in the User Pool using AdminGetUser()
	var params = { UserPoolId: USER_POOL_ID, Username: username };

	cognitoidentityserviceprovider.adminGetUser(params, function (lookup_err, data) {
		console.log(lookup_err)
		if (lookup_err && lookup_err.code === "UserNotFoundException") {
			// User does not exist in the User Pool, try to migrate
			console.log("User does not exist in User Pool, attempting migration: " + username);

			var options = {
				host: 'intranat.helsingborg.se',
				path: '/ad-api/user/get/' + username,
				//since we are listening on a custom port, we need to specify it by hand
				//This is what changes the request to a POST request
				method: 'POST'
			};

			var req = http.request(options, function (response) {
				var str = ''
				response.on('data', function (chunk) {
					str += chunk;
				});

				response.on('end', function () {

					console.log("-------")
					console.log(str)
					console.log("-------")
					try {
						var userObject = JSON.parse(str)

						if ('displayname' in userObject[0]) {
							createUser(username, password, userObject[0], callback)
						}
					}
					catch (e) {
						console.log(e)

					}

				});
			});
			//This is the data we are posting, it needs to be a string or a buffer
			req.write(JSON.stringify({ username: username, password: password }));
			req.end();
		}
		else {
			//User exists in the User Pool, so tell the app not to retry sign-in
			console.log("User exists in User Pool so no migration: " + username);
			callback(null, "NO_RETRY");
			return;
		}
	});

};
