const { ObjectId } = require("mongodb")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')


const { Chat } = require("../../chat/model/models")
const { insertChatData } = require("../../chat/db/db-functions")

const { getNotifications } = require("../../../database/notification-query")

const globalConstants = require("../../../constants/constants");
const { getAllEventDataBy, deleteAllEventParticipantDataBy, deleteEventDataBy } = require("../../events/db/db-functions")
const { getAllClubAnnouncementDataBy } = require("../db/db-functions")

const GET_CLUB = (req, res) => {
	function query(fn) {
		dbf.getAllClubDataBy({}, (err, docs) => {
			if (err) return
			let clubs = docs
			dbf.getClubAllMemberDataBy({}, (err, docs) => {
				if (err) return
				let clubMembers = docs
				fn(clubs, clubMembers)
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			query((clubs, clubMembers) => {
				if (clubs != null && clubMembers != null) {
					return res.render("club/index.html", {
						ctx: globalConstants.ctx,
						accountId: accountId,
						username: username,
						notifications: notifications,
						clubs: clubs,
						clubMembers: clubMembers
					})
				} else {
					return res.redirect(globalConstants.ctx.DOMAIN_NAME)
				}
			})
		})
	})
}


const GET_SHOW_CLUB_ID = (req, res) => {
	function query(clubId, fn) {
		dbf.getClubDataBy({ _id: new ObjectId(clubId) }, (err, docs) => {
			if (err) return
			let club = docs
			dbf.getClubAllMemberDataBy({ clubId: new ObjectId(clubId) }, (err, docs) => {
				if (err) return
				let clubMembers = docs
				getAllEventDataBy({ clubId: new ObjectId(clubId) }, (err, docs) => {
					if (err) return
					let events = docs
					getAllClubAnnouncementDataBy({ clubId: new ObjectId(clubId) }, (err, docs) => {
						if (err) return
						let announcements = docs
						fn(club, clubMembers, events, announcements)
					})
				})
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			query(req.query.clubId, (club, clubMembers, events, announcements) => {
				if (club != null && clubMembers != null && events != null && announcements != null) {
					return res.render("club/manage-club/show-club.html", {
						ctx: globalConstants.ctx,
						accountId: accountId,
						username, username,
						notifications: notifications,
						club: club,
						clubMembers: clubMembers,
						events: events,
						announcements: announcements
					})
				} else {
					return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
				}
			})
		})
	})
}



const GET_EDIT_CLUB_ID = (req, res) => {
	function query(clubId, fn) {
		dbf.getClubDataBy({ _id: new ObjectId(clubId) }, (err, docs) => {
			if (err) return
			let club = docs
			dbf.getClubAllMemberDataBy({ clubId: new ObjectId(clubId) }, (err, docs) => {
				if (err) return
				let clubMembers = docs
				getAllEventDataBy({ clubId: new ObjectId(clubId) }, (err, docs) => {
					if (err) return
					let events = docs
					console.log(events);
					fn(club, clubMembers, events)
				})
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			query(req.query.clubId, (club, clubMembers, events) => {
				if (club != null && clubMembers != null && events != null) {
					return res.render("club/manage-club/edit-club.html", {
						ctx: globalConstants.ctx,
						accountId: accountId,
						username, username,
						notifications: notifications,
						club: club,
						clubMembers: clubMembers,
						events: events
					})
				} else {
					return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
				}
			})
		})
	})
}



const POST_EDIT_CLUB_ID = (req, res) => {
	function query(filter, setUpdate, fn) {
		dbf.updateClubDataBy(filter, { $set: setUpdate }, (err) => {
			fn(err)
		})

	}
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId;
		let clubName = req.body.clubName;
		let description = req.body.description;
		let filter = { _id: new ObjectId(clubId) };
		let setUpdate = { name: clubName, description: description };
		query(filter, setUpdate, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}

const GET_DELETE_CLUB_ID = (req, res) => {
	function query(filter, fn) {
		dbf.deleteClubDataBy(filter, (err) => {
			deleteEventDataBy({ clubId: filter._id }, (err) => {
				deleteAllEventParticipantDataBy({ clubId: filter._id }, (err) => {
					fn(err)
				})
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId;
		let filter = { _id: new ObjectId(clubId) }
		query(filter, (err) => {
			res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
		});
	})
}



const GET_CREATE_CLUB = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			return res.render("club/manage-club/create-club.html", {
				ctx: globalConstants.ctx,
				username: username,
				accountId: accountId,
				notifications: notifications
			})
		})
	})
}



const POST_CREATE_CLUB = (req, res) => {
	function query(clubModel, clubMemberModel, fn) {
		dbf.insertClubData(clubModel, (err) => {
			if (!err) {
				dbf.insertClubMemberData(clubMemberModel, (err) => {
					if (err) {
						console.log(err)
					}
				})
			}
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let name = req.body.clubName
		let datetime = datetimenow()
		let description = req.body.description
		let clubModel = model.Club(name, datetime, description, accountId, username)
		let clubMemberModel = model.ClubMember(clubModel._id.toString(), accountId, username, "admin", "accepted")
		query(clubModel, clubMemberModel, (err) => {
			let chatModel = Chat(accountId, clubModel._id.toString(), clubModel.name, datetime, username, `
			Welcome to ${clubModel.name} club!
			`)
			insertChatData(chatModel, (err) => {
				return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs")
			})
		})
	})
}



module.exports = {
	GET_CLUB: GET_CLUB,
	GET_SHOW_CLUB_ID: GET_SHOW_CLUB_ID,
	GET_EDIT_CLUB_ID: GET_EDIT_CLUB_ID,
	GET_CREATE_CLUB: GET_CREATE_CLUB,
	GET_DELETE_CLUB_ID: GET_DELETE_CLUB_ID,


	POST_CREATE_CLUB: POST_CREATE_CLUB,
	POST_EDIT_CLUB_ID: POST_EDIT_CLUB_ID,

	POST_MEMBERSHIP_REQUEST: require("./clubMemberController").POST_MEMBERSHIP_REQUEST,
	POST_MEMBERSHIP_HANDLE_REQUEST: require("./clubMemberController").POST_MEMBERSHIP_HANDLE_REQUEST,
	POST_MEMBERSHIP_UNJOIN: require("./clubMemberController").POST_MEMBERSHIP_UNJOIN,
	POST_MODERATOR_SET: require("./clubMemberController").POST_MODERATOR_SET,
	POST_MODERATOR_REMOVE: require("./clubMemberController").POST_MODERATOR_REMOVE,

	GET_CLUB_ANNOUNCEMENT_SHOW: require("./clubAnnouncementController").GET_CLUB_ANNOUNCEMENT_SHOW,
	GET_CLUB_ANNOUNCEMENT_CREATE: require("./clubAnnouncementController").GET_CLUB_ANNOUNCEMENT_CREATE,
	GET_CLUB_ANNOUNCEMENT_EDIT: require("./clubAnnouncementController").GET_CLUB_ANNOUNCEMENT_EDIT,
	GET_CLUB_ANNOUNCEMENT_DELETE: require("./clubAnnouncementController").GET_CLUB_ANNOUNCEMENT_DELETE,


	POST_CLUB_ANNOUNCEMENT_CREATE: require("./clubAnnouncementController").POST_CLUB_ANNOUNCEMENT_CREATE,
	POST_CLUB_ANNOUNCEMENT_EDIT: require("./clubAnnouncementController").POST_CLUB_ANNOUNCEMENT_EDIT,
}

