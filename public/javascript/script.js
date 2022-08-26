function GetMap() {
	var map = new Microsoft.Maps.Map('#my-map', {
		showDashboard: false,
		showTermsLink: false,
		showBreadcrumb: true,
		enableClickableLogo: false
	});


	getLocationFromMap(map, function (lat, long) {
		console.log(lat, long)
		$('#eventLocLong').val(lat)
		$('#eventLocLat').val(long)
	})


	function setLocationInMap(latitude, longitude) {
		var mylocation = new Microsoft.Maps.Location(latitude, longitude);
		// map.setView({ mapTypeId: Microsoft.Maps.MapTypeId.aerial, center: mylocation });
		var locs = [...Microsoft.Maps.Location];
		var rect = Microsoft.Maps.LocationRect.fromLocations(locs);
		map.setView({ center: mylocation, zoom: 16, bounds: rect, padding: 80 });
	}


	if (!navigator.geolocation) {
	} else {
		navigator.geolocation.getCurrentPosition(function (position) {
			let { latitude, longitude } = position.coords;
			setLocationInMap(latitude, longitude)

		});
	}
}


function getLocationFromMap(map, fn) {
	Microsoft.Maps.Events.addHandler(map, 'click', function (events) {
		let lat = events.location.latitude
		let long = events.location.longitude
		fn(lat, long)
	});
}

