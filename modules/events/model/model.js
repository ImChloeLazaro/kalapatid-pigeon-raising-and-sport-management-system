const ObjectId = require("mongodb").ObjectId

function Event(accountId, clubId, name, date, long, lat, datetimeStart, datetimeEnd, type, description, username, clubName, maxParticipants, accessability, eventStatus) {
	return {
		_id: new ObjectId(),
		accountId: new ObjectId(accountId),
		name: name,
		date: date,
		long: long,
		lat: lat,
		datetimeStart: datetimeStart,
		datetimeEnd: datetimeEnd,
		type: type,
		description: description,
		maxParticipants: maxParticipants,
		clubId: new ObjectId(clubId),
		creatorName: username,
		clubName: clubName,
		accessability: accessability,
		eventStatus: eventStatus
	}
}




function EventParticipant(eventId, accountId, clubId, username, status, info, lat, long, dropOffAddress, pigeons) {
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
		dropOffAddress: dropOffAddress,
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
