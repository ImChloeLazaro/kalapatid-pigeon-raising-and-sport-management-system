const { ObjectId } = require("mongodb")
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")

const { getNotifications, insertNotification } = require("../../../database/notification-query")
const Notification = require("../../../model/notification")



const dbf = require('../db/db-functions')
const model = require('../model/model')
const globalConstants = require("../../../constants/constants");


const GET_CLUB_ANNOUNCEMENT_CREATE = (req, res) => {

	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId;
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			return res.render("club/announcement/create.html", {
				ctx: globalConstants.ctx,
				accountId: accountId,
				username: username,
				clubId: clubId,
				notifications: notifications
			})
		})
	})
}

const POST_CLUB_ANNOUNCEMENT_CREATE = (req, res) => {
	function query(data, fn) {
		dbf.insertClubAnnouncementData(data, (err) => {
			if (err) return
			fn()
		})
	}
	verifyLogin(req, res, (accountId, username) => {

		let data = new model.ClubAnnouncement({
			clubId: new ObjectId(req.query.clubId),
			accountId: new ObjectId(accountId),
			username: username,
			title: req.body.title,
			content: req.body.content
		})

		query(data, (err) => {
			insertNotification(Notification(
				accountId,
				username,
				globalConstants.notificationPreveledge.CLUB,
				{
					title: "#" + data.title,
					message: "New Announcement entitled \"" + data.title + "\" has been created",
					link: globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + req.query.clubId,
					seen: false,
				},
				datetimenow()
			));

			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + req.query.clubId)
		})
	})
}



const GET_CLUB_ANNOUNCEMENT_SHOW = (req, res) => {
	function query(filter, fn) {
		dbf.getClubAnnouncementDataBy(filter, (err, docs) => {
			if (err) return
			fn(err, docs)
		})
	}

	verifyLogin(req, res, (accountId, username) => {
		let id = req.query.id;
		let clubId = req.query.clubId;
		let cfilter = { _id: new ObjectId(id), clubId: new ObjectId(clubId) }
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			query(cfilter, (err, docs) => {
				let announcement = docs;
				return res.render("club/announcement/show.html", {
					ctx: globalConstants.ctx,
					accountId: accountId,
					username: username,
					notifications: notifications,

					clubId: clubId,
					announcement: announcement,
				})
			})
		})
	})
}




const GET_CLUB_ANNOUNCEMENT_EDIT = (req, res) => {
	function query(filter, fn) {
		dbf.getClubAnnouncementDataBy(filter, (err, docs) => {
			if (err) return
			fn(err, docs)
		})
	}

	verifyLogin(req, res, (accountId, username) => {
		let id = req.query.id;
		let clubId = req.query.clubId;
		let cfilter = { _id: new ObjectId(id), clubId: new ObjectId(clubId) }
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			query(cfilter, (err, docs) => {
				let announcement = docs;
				return res.render("club/announcement/edit.html", {
					ctx: globalConstants.ctx,
					accountId: accountId,
					username: username,
					notifications: notifications,
					clubId: clubId,
					announcement: announcement
				})
			})
		})
	})
}

const POST_CLUB_ANNOUNCEMENT_EDIT = (req, res) => {
	function query(filter, setUpdate, fn) {
		dbf.updateClubAnnouncementDataBy(filter, setUpdate, (err) => {
			if (err) return
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let id = req.query.id;
		let clubId = req.query.clubId;

		let filter = { _id: new ObjectId(id), clubId: new ObjectId(clubId) }
		let setUpdate = { title: req.body.title, content: req.body.content }
		query(filter, setUpdate, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}





const GET_CLUB_ANNOUNCEMENT_DELETE = (req, res) => {
	function query(filter, fn) {
		dbf.deleteClubAnnouncementDataBy(filter, (err) => {
			if (err) return
			fn()
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let id = req.query.id;
		let clubId = req.query.clubId;
		let filter = { _id: new ObjectId(id), clubId: new ObjectId(clubId) }
		query(filter, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})

}



module.exports = {
	GET_CLUB_ANNOUNCEMENT_SHOW: GET_CLUB_ANNOUNCEMENT_SHOW,
	GET_CLUB_ANNOUNCEMENT_CREATE: GET_CLUB_ANNOUNCEMENT_CREATE,
	GET_CLUB_ANNOUNCEMENT_EDIT: GET_CLUB_ANNOUNCEMENT_EDIT,
	GET_CLUB_ANNOUNCEMENT_DELETE: GET_CLUB_ANNOUNCEMENT_DELETE,


	POST_CLUB_ANNOUNCEMENT_CREATE: POST_CLUB_ANNOUNCEMENT_CREATE,
	POST_CLUB_ANNOUNCEMENT_EDIT: POST_CLUB_ANNOUNCEMENT_EDIT,

}

