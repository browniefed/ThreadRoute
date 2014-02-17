Template.map.width = window.innerWidth;
Template.map.height = window.innerHeight;
Template.map.rendered = function() {
	var map = L.map('map');

	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © OpenStreetMap contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 4, maxZoom: 15, attribution: osmAttrib});		
	map.setView(new L.LatLng(45.525292, -122.668197),13);
	map.addLayer(osm);

	var groupedPolylines = {}, tempPolyline;

	_(polylines).each(function(route, key) {
		groupedPolylines[key] = groupedPolylines[key] || {};

		_(route).each(function(directionRoute, direction) {

			var multiPolyLineStore = [];
			groupedPolylines[key][direction] = groupedPolylines[key][direction] || [];

			if (directionRoute && directionRoute.length) {
	            _(directionRoute).each(function(line) {
	            	multiPolyLineStore.push(decodeLine(line));
	            });
	            tempPolyline = L.multiPolyline(multiPolyLineStore, {color: '#2666e9', opacity: .3, className: 'route-' + key + '-' + direction});
	            tempPolyline.addTo(map);
				groupedPolylines[key][direction].push(tempPolyline);

        	}

		})
       
    });

}