const ObjectId = require("mongodb").ObjectId

function Event(accountId, name, date, long, lat, hourStart, hourEnd, type, description) {
	return {
		_id: new ObjectId(),
		accountId: new ObjectId(accountId),
		name: name,
		date: date,
		long: long,
		lat: lat,
		hourStart: hourStart,
		hourEnd: hourEnd,
		type: type,
		description: description
	}
}

module.exports.Event = Event