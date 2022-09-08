const axios = require('axios');


async function getLocationWeather(location) {
	try {
		let data = null;
		const params = { access_key: '05d158b59d80b14c47a5ae9f8a3d31b2', query: location }
		await axios.get('http://api.weatherstack.com/current', { params })
			.then(response => {
				data = response.data;
			}).catch(error => {
				console.log(error);
			});
		return data;
	} catch (err) {
		return err;
	}
}



async function getForcastWeather(location) {
	try {
		let data = null;
		let q = location
		let key = '3f66c7588cc14f418bb11203220705'
		await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${q}&days=7`)
			.then(response => {
				data = response.data;
			}).catch(error => {
				console.log(error);
			})
		return data;
	} catch (err) {
		return err;
	}
}

// getLocationWeather('13.1086684,123.0587209')
// 	.then(
// 		result => {
// 			console.log(`\tlocation name: ${result.location.name}`)
// 			console.log(`\tcountry: ${result.location.country}`)
// 			console.log(`\tregion: ${result.location.region}`)
// 			console.log(`\tlocation: ${result.location.lat},${result.location.lon}`)
// 			console.log(`\tlocation name: ${result.location.name}`)
// 			console.log(`\tdescription: ${result.current.weather_descriptions[0]}`)
// 			console.log(`\ttemperature: ${result.current.temperature}℃`)
// 			console.log(`\thumidity: ${result.current.humidity}`)
// 			console.log(`\twind speed: ${result.current.wind_speed}`)
// 			console.log(`\twind degree: ${result.current.wind_degree}`)
// 			console.log(`\twind direction: ${result.current.wind_dir}`)
// 		}
// 	)
// 	.catch(err => console.error(err))


module.exports.getLocationWeather = getLocationWeather
module.exports.getForcastWeather = getForcastWeather