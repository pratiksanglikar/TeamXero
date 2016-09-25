/**
 * Created by pratiksanglikar on 9/25/16.
 */
var express = require('express');
var router = express.Router();
var accountSid = 'AC495305136b825d112cd0e7523159cce9';
var authToken = '7de49b648c53c1df8323bacde02ee7f4';
var client = require('twilio')(accountSid, authToken);
var MongoDB = require('../js/DAO/MongoDBHandler');
var LocationProvider = require("../js/DAO/LocationHandler");

router.get('/', function (req, res, next) {
	res.render('index', {title: 'TeamXero REST APIs'});
});

router.get('/messages', function (req, res, next) {
	client.messages.list({}, function (err, data) {
		if (err) {
			res.send("Error: " + err);
		} else {
			data.messages.forEach(function (message) {
				console.log(message.friendlyName);
				res.send("OK");
			});
		}
	});
});

router.post('/messages', function (req, res, next) {
	var zipCode = req.body.Body;
	if (isNaN(zipCode)) {
		res.statusCode(500).send({'error': 'Invalid zipcode'});
	}
	else {
		var promise = LocationProvider.getProvidersInZipcode(String(zipCode));
		promise.done(function (array) {
			var twilio = require('twilio');
			var twiml = new twilio.TwimlResponse();
			var finalArray = "";
			if (array.length <= 0) {
				finalArray = "Oops! No free food today! Sorry! :(";
			} else {
				for (var i = 0; i < array.length && i < 3; i++) {
					finalArray +=
						array[i].firstname + " " + array[i].lastName +
						array[i].address.address + " " + array[i].address.city + " " + array[i].description;
				}
			}
			twiml.message(finalArray);
			res.writeHead(200, {'Content-Type': 'text/xml'});
			res.end(twiml.toString());
		}, function (error) {
			res.statusCode(500).send({
				"error": error
			});
		});
	}
});

module.exports = router;
