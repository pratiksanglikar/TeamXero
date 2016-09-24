/**
 * Created by pratiksanglikar on 9/24/16.
 */


exports.find = function (latitude, longitude) {
	return {
		providers: [
			{
				"name":"Provider 1",
				"address" : "Address 1"
			}
		]
	};
}

exports.enableNotifications = function (email, latitude, longitude) {
	return true;
};

exports.disableNotifications = function (email) {
	return true;
}