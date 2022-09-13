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


function EventParticipant(eventId, accountId, clubId, username) {
	return {
		_id: new ObjectId(),
		eventId: new ObjectId(eventId),
		accountId: new ObjectId(accountId),
		clubId: new ObjectId(clubId),
		username: username
	}
}


module.exports.Event = Event
module.exports.EventParticipant = EventParticipant