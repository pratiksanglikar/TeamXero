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
	var finalArray = "";
		if(zipCode == 95118 || zipCode == '95118') {
			finalArray = "1. Meal Boxes at 1146, Blossom Hill Rd, San Jose, CA" +
					"2. Chickoo at 11-98 North 4th Street, San Jose, CA.  Enjoy your food!";
		} else {
			finalArray = "Oops! No free food today! Sorry! :(";
		}
		var twilio = require('twilio');
		var twiml = new twilio.TwimlResponse();
		twiml.message(finalArray);
		res.writeHead(200, {'Content-Type': 'text/xml'});
		res.end(twiml.toString());

	});

module.exports = router;
