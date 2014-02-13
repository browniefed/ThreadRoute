Trimet = {urls: {}};

Trimet.urls.vehicles = 'http://developer.trimet.org/beta/v2/vehicles';
Trimet.urls.arrivals = 'http://developer.trimet.org/ws/V1/arrivals';
Trimet.urls.stops = 'http://developer.trimet.org/ws/V1/stops';
Trimet.urls.routes = 'http://developer.trimet.org/ws/V1/routeConfig';

Trimet.getAllRoutes= function(cb) {
	HTTP.get(Trimet.urlBuilder('routes'), function(err, data) {
		if (err) {
			console.log('Error handleit');
			return;
		}
		cb(data);
	})
}

Trimet.getVehiclePositions = function(cb) {
	HTTP.get(Trimet.urlBuilder('vehicles'), function(err, data) {
		if (err) {
			return;
		}
		cb(data);
	})
}

Trimet.urlBuilder = function(path) {
	return Trimet.urls[path] + '/appid/' + config.appid + '/json/true';
}