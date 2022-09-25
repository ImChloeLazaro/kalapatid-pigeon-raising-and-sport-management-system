const globalConstants = require("../../../constants/constants")
const { verifyLogin } = require("../../../lib/toolkit")
const { getClubAllMemberDataBy, getAllClubDataBy } = require("../../clubs/db/db-functions")
const { getEventAllParticipantDataBy, getAllEventDataBy } = require("../../events/db/db-functions")
const dbf = require('../db/db-functions')

const ObjectId = require("mongodb").ObjectId

const GET_PROFILE = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let othername = req.query.username
		if (othername === undefined || othername === username) {
			othername = username
		}
		req.session.othername = othername
		let accountFilter = { username: othername }

		dbf.getAccountDataBy(accountFilter, (err, docs) => {
			let accData = docs

			let addressFilter = { acc_id: new ObjectId(accData._id) }
			dbf.getAddressDataBy(addressFilter, (err, docs) => {
				let addrData = docs
				let profileFilter = { accountId: new ObjectId(accData._id) }
				dbf.getProfileDataBy(profileFilter, (err, docs) => {
					let profileData = docs
					getClubAllMemberDataBy(profileFilter, (err, docs) => {
						let clubMembers = docs
						getEventAllParticipantDataBy(profileFilter, (err, docs) => {
							let eventParticipants = docs
							getAllClubDataBy({}, (err, docs) => {
								let clubs = docs
								getAllEventDataBy({}, (err, docs) => {
									let events = docs
									return res.render("profile/profile.html", {
										ctx: globalConstants.ctx,
										accountId: accountId,
										username: username,
										othername: othername,
										accData: accData,
										addrData: addrData,
										profileData: profileData,
										clubMembers: clubMembers,
										eventParticipants: eventParticipants,
										clubs: clubs,
										events: events
									})
								})
							})
						})
					})
				})
			})
		})
	})
}




const EDIT_PROFILE = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let othername = req.query.username
		if (othername === undefined || othername === username) {
			othername = username
		}
		req.session.othername = othername
		let accountFilter = { username: othername }
		dbf.getAccountDataBy(accountFilter, (err, docs) => {
			let accData = docs
			let addressFilter = { acc_id: accData._id }
			dbf.getAddressDataBy(addressFilter, (err, docs) => {
				let addrData = docs
				let profileFilter = { accountId: req.query.id }
				dbf.getProfileDataBy(profileFilter, (err, docs) => {
					let profileData = docs
					return res.render("profile/edit-profile.html", {
						ctx: globalConstants.ctx,
						username: username,
						othername: othername,
						accData: accData,
						addrData: addrData,
						profileData: profileData
					})
				})
			})
		})
	})
}





const GET_PROFILE_MESSAGEME_ID = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let othername = req.query.username
		console.log(othername)
		var messageId = null
		let filter = {
			$or: [
				{ username1: othername, username2: username },
				{ username1: username, username2: othername }
			]
		}
		dbf.getAllMessageDataBy(filter, (err, docs) => {
			messageId = new require("mongodb").ObjectId().toString()
			if (docs.length !== 0) {
				docs.forEach(data => {
					messageId = data.messageId.toString()
					console.log(messageId)
				})
			}
			console.log(docs)

			let redirectUrl = `${globalConstants.ctx.DOMAIN_NAME}/messages/${messageId}/?username=${othername}`
			return res.redirect(redirectUrl)
		})


	})
}



module.exports = {
	GET_PROFILE: GET_PROFILE,
	EDIT_PROFILE: EDIT_PROFILE,
	GET_PROFILE_MESSAGEME_ID: GET_PROFILE_MESSAGEME_ID
}

