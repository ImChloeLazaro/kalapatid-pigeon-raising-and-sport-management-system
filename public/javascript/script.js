
console.log("This is Client-side Event Script..")

function GetMap() {
	var map = new Microsoft.Maps.Map('#event-map', {
		showDashboard: false,
		showTermsLink: false,
		showBreadcrumb: false,
		enableClickableLogo: false
	});


	function getLocationFromMap(map, fn) {
		Microsoft.Maps.Events.addHandler(map, 'click', function (e) {
			let lat = e.location.latitude
			let long = e.location.longitude
			fn(lat, long)
		});
	}
	getLocationFromMap(map, function (lat, long) {
		console.log(lat, long)
		$('#eventLocLat').val(lat)
		$('#eventLocLong').val(long)
	})



	function setLocationInMap(latitude, longitude) {
		var mylocation = new Microsoft.Maps.Location(latitude, longitude);
		$('#eventLocLat').val(latitude)
		$('#eventLocLong').val(longitude)


		var pin = new Microsoft.Maps.Pushpin(mylocation, {
			icon: "https://docs.microsoft.com/en-us/bingmaps/v8-web-control/media/bmv8-poi-custom.png"
		});
		map.entities.push(pin)

		map.setView({
			mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
			center: mylocation,
			zoom: 16,
			padding: 80,
			animate: true,
			heading: 0,
			tilt: 0

		});

		Microsoft.Maps.Events.addHandler(map, 'click', function (e) {
			let lat = e.location.latitude
			let long = e.location.longitude
			var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, long), {
				icon: "https://docs.microsoft.com/en-us/bingmaps/v8-web-control/media/bmv8-poi-custom.png"
			});
			map.entities.pop();
			console.dir(map.entities)
			map.entities.push(pin);
		});
	}


	if (!navigator.geolocation) {
	} else {
		navigator.geolocation.getCurrentPosition(function (position) {
			let { latitude, longitude } = position.coords;
			setLocationInMap(latitude, longitude)
		});
	}
}







function setEventShowMap() {
	var map = new Microsoft.Maps.Map('#event-show-map', {
		showDashboard: false,
		showTermsLink: false,
		showBreadcrumb: false,
		enableClickableLogo: false
	});

	function setLocationInMap(latitude, longitude) {
		var mylocation = new Microsoft.Maps.Location(latitude, longitude);
		var pin = new Microsoft.Maps.Pushpin(mylocation, {
			icon: "https://docs.microsoft.com/en-us/bingmaps/v8-web-control/media/bmv8-poi-custom.png"
		});
		map.entities.push(pin)

		lat = $('#showeventLocLat').val()
		long = $('#showeventLocLong').val()
		console.log(lat, long)
		if (lat !== "" || long !== "") {
			let loc = new Microsoft.Maps.Location(lat, long);
			let pin = new Microsoft.Maps.Pushpin(loc)
			map.entities.push(pin)
		}
		map.setView({
			mapTypeId: Microsoft.Maps.MapTypeId.aerial,
			center: mylocation,
			zoom: 16,
			padding: 80,
			animate: true,
			heading: 0,
			tilt: 0
		});
	}


	if (!navigator.geolocation) {
	} else {
		navigator.geolocation.getCurrentPosition(function (position) {
			let { latitude, longitude } = position.coords;
			setLocationInMap(latitude, longitude)
		});
	}

}