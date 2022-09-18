
console.log("This is Client-side Event Script..")
const hoverPinHandler = function (e) {
	if (e.target.metadata) {
		infobox.setOptions({
			location: e.target.getLocation(),
			description: e.target.metadata.description,
			visible: true
		});
	}
}

const outPinHandler = function () {
	infobox.setOptions({
		visible: false
	})
}

function GetCreateEventMap() {
	var map = new Microsoft.Maps.Map('#event-map', {
		showDashboard: false,
		showTermsLink: false,
		showBreadcrumb: false,
		enableClickableLogo: false,
		liteMode: true
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

		infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
			visible: false
		});
		infobox.setMap(map);

		var pin = new Microsoft.Maps.Pushpin(mylocation, {
			icon: "/images/pin.png"
		});
		pin.metadata = {
			description: 'Your Current Location'
		}
		map.entities.push(pin)

		map.setView({
			// mapTypeId: Microsoft.Maps.MapTypeId.aerial,
			center: mylocation,
			zoom: 16,
			padding: 80,
			animate: true,
			heading: 0,
			tilt: 0,

		});

		Microsoft.Maps.Events.addHandler(pin, 'mouseover', hoverPinHandler)
		Microsoft.Maps.Events.addHandler(pin, 'mouseout', outPinHandler)



		Microsoft.Maps.Events.addHandler(map, 'click', function (e) {
			let lat = e.location.latitude
			let long = e.location.longitude
			var pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(lat, long), {
				icon: "/images/pin.png"
			});

			map.entities.pop();
			console.dir(map.entities)
			pin.metadata = {
				description: 'Selected Location'
			}
			map.entities.push(pin);
			Microsoft.Maps.Events.addHandler(pin, 'mouseover', hoverPinHandler)
			Microsoft.Maps.Events.addHandler(pin, 'mouseout', outPinHandler)
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







function GetShowEventMap() {
	var map = new Microsoft.Maps.Map('#event-show-map', {
		showDashboard: false,
		showTermsLink: false,
		showBreadcrumb: false,
		enableClickableLogo: false,
		liteMode: true
	});

	function setLocationInMap(latitude, longitude) {
		var mylocation = new Microsoft.Maps.Location(latitude, longitude);

		infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
			visible: false
		});
		infobox.setMap(map);


		var pin = new Microsoft.Maps.Pushpin(mylocation);
		map.entities.push(pin)
		pin.metadata = {
			description: 'Your Location'
		}
		Microsoft.Maps.Events.addHandler(pin, 'mouseover', hoverPinHandler)
		Microsoft.Maps.Events.addHandler(pin, 'mouseout', outPinHandler)

		lat = $('#showeventLocLat').val()
		long = $('#showeventLocLong').val()
		if (lat !== "" || long !== "") {
			let loc = new Microsoft.Maps.Location(lat, long);
			let pin = new Microsoft.Maps.Pushpin(loc, {
				icon: "/images/pin.png"
			})
			pin.metadata = {
				description: 'Event Location'
			}
			Microsoft.Maps.Events.addHandler(pin, 'mouseover', hoverPinHandler)
			Microsoft.Maps.Events.addHandler(pin, 'mouseout', outPinHandler)
			map.entities.push(pin)
		}
		map.setView({
			// mapTypeId: Microsoft.Maps.MapTypeId.aerial,
			center: mylocation,
			zoom: 16,
			padding: 80,
			animate: true,
			heading: 0,
			tilt: 0,
			liteMode: true
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


function GetShowEventParticipantMap() {
	var map = new Microsoft.Maps.Map('#event-participant-show-map', {
		showDashboard: false,
		showTermsLink: false,
		showBreadcrumb: false,
		enableClickableLogo: false,
		liteMode: true
	});

	function setLocationInMap(latitude, longitude) {
		var mylocation = new Microsoft.Maps.Location(latitude, longitude);

		infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
			visible: false
		});
		infobox.setMap(map);


		var pin = new Microsoft.Maps.Pushpin(mylocation);
		map.entities.push(pin)
		pin.metadata = {
			description: 'Your Location'
		}
		Microsoft.Maps.Events.addHandler(pin, 'mouseover', hoverPinHandler)
		Microsoft.Maps.Events.addHandler(pin, 'mouseout', outPinHandler)

		lat = $('#showeventPartLocLat').val()
		long = $('#showeventPartLocLong').val()
		if (lat !== "" || long !== "") {
			let loc = new Microsoft.Maps.Location(lat, long);
			let pin = new Microsoft.Maps.Pushpin(loc, {
				icon: "/images/pin.png"
			})
			pin.metadata = {
				description: 'Event Location'
			}
			Microsoft.Maps.Events.addHandler(pin, 'mouseover', hoverPinHandler)
			Microsoft.Maps.Events.addHandler(pin, 'mouseout', outPinHandler)
			map.entities.push(pin)
		}
		map.setView({
			// mapTypeId: Microsoft.Maps.MapTypeId.aerial,
			center: mylocation,
			zoom: 16,
			padding: 80,
			animate: true,
			heading: 0,
			tilt: 0,
			liteMode: true
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







function GetShowProfileMap() {
	var map = new Microsoft.Maps.Map('#profile-show-map', {
		showDashboard: false,
		showTermsLink: false,
		showBreadcrumb: false,
		enableClickableLogo: false,
		liteMode: true
	});

	function setLocationInMap(latitude, longitude) {
		var mylocation = new Microsoft.Maps.Location(latitude, longitude);

		infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
			visible: false
		});
		infobox.setMap(map);


		var pin = new Microsoft.Maps.Pushpin(mylocation);
		map.entities.push(pin)
		pin.metadata = {
			description: 'Your Location'
		}
		Microsoft.Maps.Events.addHandler(pin, 'mouseover', hoverPinHandler)
		Microsoft.Maps.Events.addHandler(pin, 'mouseout', outPinHandler)

		lat = $('#profileLocLat').val()
		long = $('#profileLocLong').val()
		if (lat !== "" || long !== "") {
			let loc = new Microsoft.Maps.Location(lat, long);
			let pin = new Microsoft.Maps.Pushpin(loc, {
				icon: "/images/pin.png"
			})
			pin.metadata = {
				description: 'Event Location'
			}
			Microsoft.Maps.Events.addHandler(pin, 'mouseover', hoverPinHandler)
			Microsoft.Maps.Events.addHandler(pin, 'mouseout', outPinHandler)
			map.entities.push(pin)
		}
		map.setView({
			// mapTypeId: Microsoft.Maps.MapTypeId.aerial,
			center: mylocation,
			zoom: 16,
			padding: 80,
			animate: true,
			heading: 0,
			tilt: 0,
			liteMode: true
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

