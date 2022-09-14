const ObjectId = require("mongodb").ObjectId

function Club(name, date, description, creatorId) {
	return {
		_id: new ObjectId(),
		name: name,
		date: date,
		description: description,
		creatorId: new ObjectId(creatorId)
	}
}


function ClubMember(clubId, accountId, username, memberStatus) {
	return {
		_id: new ObjectId(),
		clubId: new ObjectId(clubId),
		accountId: new ObjectId(accountId),
		username: username,
		memberStatus: memberStatus
	}
}

module.exports.Club = Club
module.exports.ClubMember = ClubMember