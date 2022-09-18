const ObjectId = require("mongodb").ObjectId

function Event(accountId, clubId, name, date, long, lat, hourStart, hourEnd, type, description, username, clubName) {
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
		description: description,

		clubId: new ObjectId(clubId),
		creatorName: username,
		clubName: clubName
	}
}



function EventParticipantRequest(eventId, clubId, epId) {
	return {
		_id: new ObjectId(),
		eventId: new ObjectId(eventId),
		clubId: new ObjectId(clubId),
		epId: new ObjectId(epId)
	}
}

function EventParticipant(eventId, accountId, clubId, username, status, info) {
	return {
		_id: new ObjectId(),
		eventId: new ObjectId(eventId),
		accountId: new ObjectId(accountId),
		clubId: new ObjectId(clubId),
		username: username,
		status: status,
		info: info
	}
}


module.exports.Event = Event
module.exports.EventParticipant = EventParticipant