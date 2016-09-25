var express = require('express');
var router = express.Router();
var LocationHandler = require("../js/DAO/LocationHandler");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TeamXero REST APIs' });
});

router.post('/find', function(req, res, next) {
	var latitude = req.body.latitude,
		longitude = req.body.longitude,
		radius = req.body.radius;
	var promise = LocationHandler.find(latitude, longitude, radius);

	promise.done(function (response) {
		res.send(response);
	}, function (error) {
		res.send(error);
	});
});

router.post('/notifications', function(req, res, next) {
	var latitude = req.body.latitude,
		longitude = req.body.longitude,
		email = req.body.email;
	var promise = LocationHandler.enableNotifications(email, longitude, latitude);

	promise.done(function (response) {
		res.send({
			"statuscode" : 200
	});
	}, function (error) {
		res.send({
			"statuscode" : 500
		});
	});
});

router.delete('/notifications', function(req, res, next) {
	var email = req.body.email;
	var promise = LocationHandler.disableNotifications(email);
	promise.done(function (response) {
		res.send(
			{
				"statuscode" : 200
			});
	}, function (error) {
		res.send({
			"statuscode" : 500
		});
	});
});

router.post('/notificationupdate',function(req,res, next) {
	var latitude = req.body.latitude,
		longitude = req.body.longitude,
		email = req.body.email;
	var promise = LocationHandler.notificationupdate(email, longitude, latitude);
	promise.done(function (response) {
		res.send({
			"statuscode" : 200
		});
	}, function (error) {
		res.send({
			"statuscode" : 500
		});
	});
});

module.exports = router;
