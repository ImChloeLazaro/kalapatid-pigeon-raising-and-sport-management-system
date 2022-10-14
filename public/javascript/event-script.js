
console.log("event script loaded")
function getAddressByLocation(lat, long, id) {
	console.log(id, lat, long)
	fetch(`https://nominatim.openstreetmap.org/search.php?q=${lat},${long}&polygon_geojson=1&format=json`)
		.then(response => response.json())
		.then(j => {
			let address = j[0].display_name;
			$(`#${id}`).text(address)
		})
}
