/**
 * Created by pratiksanglikar on 9/24/16.
 */
var MongoDB = require("../DAO/MongoDBHandler");
var Q = require("q");

/*
exports.find = function (latitude, longitude, radius) {
	var deferred = Q.defer();
	var locationList = [];
	var cursor = MongoDB.collection("users").find({"location": { $geoWithin: { $centerSphere: [ [ longitude, latitude ], radius/3963.2 ] } }});

	if(cursor != null)
	{
		cursor.each(function (err, doc) {
			if (err) {
				deferred.reject({
					statusCode: 500,
					error: "Not found"
				});
				//deferred.reject(err);
			}
			if (doc != null) {
				locationList.push(doc);
			}
			else
			{
				deferred.resolve(locationList);

				//  deferred.resolve(farmerList);
			}
		});
	}
	else
	{
		deferred.reject({
			statusCode: 500,
			"Error": "Error"
		});
	}
	return deferred;
}
*/

exports.enableNotifications = function (email, latitude, longitude) {
	return true;
};

exports.disableNotifications = function (email) {
	return true;
}




exports.find = function (latitude, longitude, radius) {
	var deferred = Q.defer();
	var locationList = [];
	var cursor = MongoDB.collection("users").find({"location": { $geoWithin: { $centerSphere: [ [ longitude, latitude ], radius/3963.2 ] } }});
	//var trucks = [];
	cursor.each(function (error, doc) {
		if (error) {
			deferred.reject(error);
		}
		if (doc != null) {
			locationList.push(doc);
		} else {
			deferred.resolve(locationList);
		}
	});
	return deferred.promise;
};