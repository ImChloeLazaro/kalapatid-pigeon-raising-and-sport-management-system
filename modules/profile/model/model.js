
const ObjectId = require("mongodb").ObjectId

module.exports.Profile = function Profile(accId, info) {
	return {
		_id: new ObjectId(),
		accountId: new ObjectId(accId),
		info: info
	}
}