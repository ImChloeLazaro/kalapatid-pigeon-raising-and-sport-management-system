const { ObjectId } = require("mongodb")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')


const { insertNotification } = require("../../../database/notification-query")
const Notification = require("../../../model/notification")

const globalConstants = require("../../../constants/constants");



const POST_MEMBERSHIP_REQUEST = (req, res) => {
	function query(data, fn) {
		dbf.insertClubMemberData(data, (err) => {
			fn(err)
		})

	}
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.body.clubId
		let clubMember = model.ClubMember(clubId, accountId.toString(), username, "user", "pending")
		query(clubMember, (docs) => {
			insertNotification(Notification(
				accountId,
				username,
				globalConstants.notificationPreveledge.CLUB,
				{
					title: "Membership request",
					message: "You have a new membership request",
					link: globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId,
					seen: false,
				},
				datetimenow()
			));

			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}


const POST_MEMBERSHIP_HANDLE_REQUEST = (req, res) => {
	function query(filter, setUpdate, fn) {
		if (setUpdate.memberStatus === "declined") {
			console.log(filter, setUpdate, "declined");
			dbf.deleteClubMemberData(filter, (err) => {
				//if no error, send notification to user that the membership request is declined by admin
				insertNotification(Notification(
					req.body.accountId,
					req.body.username,
					globalConstants.notificationPreveledge.CLUB,
					{
						title: "Membership request declined",
						message: "Your membership request to " + req.body.clubName + " is declined",
						link: globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + req.body.clubId,
						seen: false,
					},
					datetimenow()))

				fn(err)
			})
		} else if (setUpdate.memberStatus === "accepted") {
			console.log(filter, setUpdate, "accepted");
			dbf.updateClubMemberData(filter, setUpdate, (err) => {
				//if no error, send notification to user that the membership request is accepted by admin
				insertNotification(Notification(
					req.body.accountId,
					req.body.username,
					globalConstants.notificationPreveledge.CLUB,
					{
						title: "Membership request accepted",
						message: "Your membership request to " + req.body.clubName + " is accepted",
						link: globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + req.body.clubId,
						seen: false,
					},
					datetimenow()))

				fn(err)
			})
		}
	}
	verifyLogin(req, res, (accountId, username) => {
		let id = req.body.id;
		let accId = req.body.accId;
		let clubId = req.body.clubId
		let status = req.body.status;

		let filter = { _id: new ObjectId(id), clubId: new ObjectId(clubId) }
		let setUpdate = { memberStatus: status }
		query(filter, setUpdate, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}

const POST_MEMBERSHIP_UNJOIN = (req, res) => {
	function query(filter, fn) {
		dbf.removeClubMemberData(filter, (err) => {
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		if (req.body.username !== username) {
			username = req.body.username
		}
		console.log("username: ".red, username);
		let id = req.body.id;
		let clubId = req.body.clubId
		let filter = { username: username, clubId: new ObjectId(clubId) }
		query(filter, (err) => {
			console.log(err);
			insertNotification(Notification(
				accountId,
				username,
				globalConstants.notificationPreveledge.CLUB,
				{
					title: "Membership unjoin",
					message: "You have unjoined " + req.body.clubName,
					link: globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId,
					seen: false,
				},
				datetimenow()))

			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}



const POST_MODERATOR_SET = (req, res) => {
	function query(filter, setUpdate, fn) {
		dbf.updateClubMemberData(filter, setUpdate, (err) => {
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		if (req.body.username !== username) {
			username = req.body.username
		}
		console.log("username: ".red, username);
		let id = req.body.id;
		let clubId = req.body.clubId
		let filter = { username: username, clubId: new ObjectId(clubId) }
		let setUpdate = { role: "moderator" }
		query(filter, setUpdate, (err) => {
			console.log(err);
			//if no error, send notification to user
			insertNotification(Notification(
				req.body.accountId,
				req.body.username,
				globalConstants.notificationPreveledge.CLUB,
				{
					title: "You are now a moderator",
					message: "You are now a moderator of " + req.body.clubName,
					link: globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + req.body.clubId,
					seen: false,
				},
				datetimenow()))

			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}


const POST_MODERATOR_REMOVE = (req, res) => {
	function query(filter, setUpdate, fn) {
		dbf.updateClubMemberData(filter, setUpdate, (err) => {
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		if (req.body.username !== username) {
			username = req.body.username
		}
		console.log("username: ".red, username);
		let id = req.body.id;
		let clubId = req.body.clubId
		let filter = { username: username, clubId: new ObjectId(clubId) }
		let setUpdate = { role: "user" }
		query(filter, setUpdate, (err) => {
			console.log(err);
			//if no error, send notification to user
			insertNotification(Notification(
				req.body.accountId,
				req.body.username,
				globalConstants.notificationPreveledge.CLUB,
				{
					title: "You are no longer a moderator",
					message: "You are no longer a moderator of " + req.body.clubName,
					link: globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + req.body.clubId,
					seen: false,
				},
				datetimenow()))

			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}



module.exports = {
	POST_MEMBERSHIP_REQUEST: POST_MEMBERSHIP_REQUEST,
	POST_MEMBERSHIP_HANDLE_REQUEST: POST_MEMBERSHIP_HANDLE_REQUEST,
	POST_MEMBERSHIP_UNJOIN: POST_MEMBERSHIP_UNJOIN,
	POST_MODERATOR_SET: POST_MODERATOR_SET,
	POST_MODERATOR_REMOVE: POST_MODERATOR_REMOVE
}