var express = require('express');
var router = express.Router();
var LocationHandler = require("../js/DAO/LocationHandler");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TeamXero REST APIs' });
});

router.post('/find', function(req, res, next) {
	var latitude = req.params.lat,
		longitude = req.params.long;
	res.send(LocationHandler.find(latitude, longitude));
});

router.post('/notifications', function(req, res, next) {
	var email = req.params.email,
		latitude = req.params.lat,
		longitude = req.params.long;
	res.send(LocationHandler.enableNotifications(email, latitude, longitude));
});

router.delete('/notifications', function(req, res, next) {
	var email = req.params.email;
	res.send(LocationHandler.disableNotifications(email));
});
module.exports = router;
