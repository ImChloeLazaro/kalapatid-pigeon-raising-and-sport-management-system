const ObjectId = require("mongodb").ObjectId

function Club(name, date, description, members) {
	return {
		_id: new ObjectId(),
		name: name,
		date: date,
		description: description,
		members: members
	}
}


function ClubMember(accountId, username, memberStatus) {
	return {
		_id: new ObjectId(),
		accountId: new ObjectId(accountId),
		username: username,
		memberStatus: memberStatus
	}
}

module.exports.Club = Club
module.exports.ClubMember = ClubMember