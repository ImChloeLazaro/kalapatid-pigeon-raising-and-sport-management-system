const ObjectId = require("mongodb").ObjectId

function Event(accountId, clubId, name, date, long, lat, hourStart, hourEnd, type, description, username, clubName, maxParticipants) {
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
		maxParticipants: maxParticipants,
		clubId: new ObjectId(clubId),
		creatorName: username,
		clubName: clubName
	}
}




function EventParticipant(eventId, accountId, clubId, username, status, info, lat, long, pigeons) {
	return {
		_id: new ObjectId(),
		eventId: new ObjectId(eventId),
		accountId: new ObjectId(accountId),
		clubId: new ObjectId(clubId),
		username: username,
		status: status,
		info: info,
		lat: lat,
		long: long,
		pigeons: pigeons,
	}
}

function Pigeon(eventId, clubId, participantId, pigeonNumber, serialNo) {
	return {
		_id: new ObjectId(),
		eventId: new ObjectId(eventId),
		clubId: new ObjectId(clubId),
		participantId: new ObjectId(participantId),
		pigeonNumber: Number(pigeonNumber),
		serialNo: serialNo
	}
}


module.exports.Event = Event
module.exports.EventParticipant = EventParticipant
module.exports.Pigeon = Pigeon
