
console.log("This is Client-side Event Script..")

function GetMap() {
	var map = new Microsoft.Maps.Map('#event-map', {
		showDashboard: false,
		showTermsLink: false,
		showBreadcrumb: false,
		enableClickableLogo: false
	});


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
		map.entities.push(pin);

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


function getLocationFromMap(map, fn) {
	Microsoft.Maps.Events.addHandler(map, 'click', function (e) {
		let lat = e.location.latitude
		let long = e.location.longitude
		fn(lat, long)
	});
}

