const ObjectId = require("mongodb").ObjectId

module.exports.Club = function Club(name, date, description, creatorId, founderName) {
	return {
		_id: new ObjectId(),
		name: name,
		date: date,
		description: description,
		creatorId: new ObjectId(creatorId),
		founderName: founderName
	}
}


module.exports.ClubMember = function ClubMember(clubId, accountId, username, role, memberStatus) {
	return {
		_id: new ObjectId(),
		clubId: new ObjectId(clubId),
		accountId: new ObjectId(accountId),
		username: username,
		role: role,
		memberStatus: memberStatus
	}
}



module.exports.ClubAnnouncement = function ClubAnnouncement(data) {
	return {
		_id: new ObjectId(),
		clubId: new ObjectId(data.clubId),
		accountId: new ObjectId(data.accountId),
		username: data.username,
		title: data.title,
		content: data.content
	}
}
