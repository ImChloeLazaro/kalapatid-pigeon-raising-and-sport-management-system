$(function () {
	console.log("event script loaded")

	function getAddressByLocation(lat, long) {
		console.log("getAddressByLocation loaded.");
		fetch(`https://nominatim.openstreetmap.org/search.php?q=${lat},${long}&polygon_geojson=1&format=json`)
			.then(response => response.json())
			.then(j => {
				let address = j[0].display_name;

				let eventLocations = $(".event-location");
				console.log($(eventLocations[0]).find("p")[0])
				//get Address by location using eventId as a unique identifier
				let elt = $("#eventLocLat").text()
				let ell = $("#eventLocLong").text()

			})
	}


})