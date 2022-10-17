const { ObjectId } = require("mongodb")
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')

const { getAllClubDataBy, getClubAllMemberDataBy } = require("../../clubs/db/db-functions");
const { ctx } = require("../../../constants/constants");
const { getEventAllParticipantDataBy } = require("../db/db-functions");
const { bgBlack } = require("colors");

const { getNotifications, insertNotification } = require("../../../database/notification-query")
const Notification = require("../../../model/notification")


const GET_EVENT = (req, res) => {
	function query(fn) {
		dbf.getAllEventDataBy({}, (err, docs) => {
			if (err) return
			let events = docs
			getAllClubDataBy({}, (err, docs) => {
				if (err) return
				let clubs = docs
				getClubAllMemberDataBy({}, (err, docs) => {
					if (err) return
					let clubMembers = docs
					getEventAllParticipantDataBy({}, (err, docs) => {
						if (err) return
						let eventParticipants = docs
						fn(events, clubs, clubMembers, eventParticipants)
					})

				})
			})
		})

	}
	verifyLogin(req, res, (accountId, username) => {
		query((events, clubs, clubMembers, eventParticipants) => {
			let filter = { accountId: new ObjectId(accountId) };
			getNotifications(filter, (err, notifications) => {
				return res.render("event/index.html", {
					ctx: globalConstants.ctx,
					accountId: accountId,
					username: username,
					events: events,
					clubs: clubs,
					clubMembers: clubMembers,
					eventParticipants: eventParticipants,
					notifications: notifications
				})
			})
		})
	})

}


const SHOW_EVENT_ID = (req, res) => {
	function query(accountId, eventId, clubId, fn) {
		let eventIdObj = new ObjectId(eventId)
		let clubIdObj = new ObjectId(clubId)

		let filter = {
			_id: eventIdObj,
			clubId: clubIdObj
		}
		dbf.getEventDataBy(filter, (err, docs) => {
			if (err) return
			let event = docs
			dbf.getEventAllParticipantDataBy({ eventId: eventIdObj }, (err, docs) => {
				if (err) return
				let eventParticipants = docs
				getClubAllMemberDataBy({ clubId: clubIdObj }, (err, docs) => {
					if (err) return
					let clubMembers = docs
					fn(event, eventParticipants, clubMembers)
				})
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(accountId, req.query.eventId, req.query.clubId, (event, eventParticipants) => {
			if (event != null && eventParticipants != null) {
				getNotifications({}, (err, notifications) => {
					return res.render("event/manage-event/show-event.html", {
						ctx: globalConstants.ctx,
						accountId: accountId,
						username: username,
						clubId: req.query.clubId,
						event: event,
						eventParticipants: eventParticipants,
						notifications: notifications
					})
				})
			} else {
				return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/events")
			}
		})
	})

}



const GET_EDIT_EVENT_ID = (req, res) => {
	function query(accountId, eventId, clubId, fn) {
		let eventIdObj = new ObjectId(eventId)
		let clubIdObj = new ObjectId(clubId)

		let filter = {
			_id: eventIdObj,
			clubId: clubIdObj
		}
		dbf.getEventDataBy(filter, (err, docs) => {
			if (err) return
			let event = docs
			dbf.getEventAllParticipantDataBy({ eventId: eventIdObj }, (err, docs) => {
				if (err) return
				let eventParticipants = docs
				fn(event, eventParticipants)
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(accountId, req.query.eventId, req.query.clubId, (event, eventParticipants) => {
			if (event != null && eventParticipants != null) {
				let filter = { accountId: new ObjectId(accountId) };
				getNotifications(filter, (err, notifications) => {
					return res.render("event/manage-event/edit-event.html", {
						ctx: globalConstants.ctx,
						accountId: accountId,
						username: username,
						clubId: req.query.clubId,
						event: event,
						eventParticipants: eventParticipants,
						notifications: notifications
					})
				})
			} else {
				return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/events")
			}
		})
	})

}

const POST_EDIT_EVENT_ID = (req, res) => {
	function query(filter, setUpdate, fn) {
		dbf.updateEventDataBy(filter, { $set: setUpdate }, (err) => {
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let eventId = req.query.eventId;
		let clubId = req.query.clubId;

		let name = req.body.name;
		let type = req.body.type;
		let datetimeStart = req.body.datetimeStart;
		let datetimeEnd = req.body.datetimeEnd;
		let description = req.body.description;
		let long = req.body.long;
		let lat = req.body.lat;
		let accessability = req.body.accessability
		let eventStatus = req.body.eventStatus

		let filter = { _id: new ObjectId(eventId), clubId: new ObjectId(clubId) }
		let setUpdate = {
			name: name,
			type: type,
			hourStart: datetimeStart,
			datetimeEnd: datetimeEnd,
			description: description,
			lat: lat,
			long: long,
			accessability: accessability,
			eventStatus: eventStatus
		}
		query(filter, setUpdate, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/events/show?eventId=" + eventId + "&clubId=" + clubId)
		})
	})
}

const GET_DELETE_EVENT = (req, res) => {
	function query(eventId, clubId, fn) {
		let eventIdObj = new ObjectId(eventId)
		let clubIdObj = new ObjectId(clubId)
		let filter = { _id: eventIdObj, clubId: clubIdObj }
		let delAlPartfilter = { eventId: eventIdObj }
		dbf.deleteEventDataBy(filter, (err) => {
			dbf.deleteAllEventParticipantDataBy(delAlPartfilter, (err) => {
				fn(err)
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId;
		let eventId = req.query.eventId;
		let eventName = req.query.eventName;
		insertNotification(Notification(
			accountId,
			username,
			globalConstants.notificationPreveledge.CLUB,
			{
				title: req.body.eventName + " Event Deleted",
				message: "Event " + req.body.eventName + " has been deleted",
				link: "",
				seen: false
			},
			datetimenow()))

		query(eventId, clubId, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}



const POST_DELETE_EVENT = (req, res) => {
	function query(accountId, eventId, clubId, fn) {
		let eventIdObj = new ObjectId(eventId)
		let clubIdObj = new ObjectId(clubId)
		let filter = { _id: eventIdObj, clubId: clubIdObj }
		let delAlPartfilter = { eventId: eventIdObj }
		dbf.deleteEventDataBy(filter, (err) => {
			dbf.deleteAllEventParticipantDataBy(delAlPartfilter, (err) => {
				fn(err)
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(accountId, req.body.eventId, req.body.clubId, (err) => {
			insertNotification(Notification(
				accountId,
				username,
				globalConstants.notificationPreveledge.CLUB,
				{
					title: req.body.eventName + " Event Deleted",
					message: "Event " + req.body.eventName + " has been deleted",
					link: "",
					seen: false
				},
				datetimenow()))
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + req.body.clubId)
		})
	})
}


const GET_CREATE_EVENT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let filter = { accountId: new ObjectId(accountId) };
		getNotifications(filter, (err, notifications) => {
			return res.render("event/manage-event/create-event.html", {
				ctx: globalConstants.ctx,
				username: username,
				accountId: accountId,
				clubId: req.query.clubId,
				notifications: notifications
			})
		})
	})
}



const POST_CREATE_EVENT = (req, res) => {
	function query(accountId, data, fn) {
		dbf.insertEventDataBy(data, (err) => {
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId
		let clubName = req.query.clubName
		let name = req.body.name
		let date = req.body.date
		let long = req.body.long
		let lat = req.body.lat
		let datetimeStart = req.body.datetimeStart
		let datetimeEnd = req.body.datetimeEnd
		let type = req.body.type
		let description = req.body.description
		let maxParticipants = req.body.maxParticipants
		let accessability = req.body.accessability
		let eventStatus = req.body.eventStatus

		let EventModel = model.Event(
			accountId,
			clubId,
			name, date, long, lat, datetimeStart, datetimeEnd,
			type, description, username, clubName,
			maxParticipants, accessability, eventStatus)


		query(accountId, EventModel, (err) => {
			insertNotification(Notification(
				accountId,
				username,
				globalConstants.notificationPreveledge.CLUB,
				{
					title: name + " Event Created",
					message: "Event " + name + " has been created",
					link: globalConstants.ctx.DOMAIN_NAME + "/events/show?eventId=" + EventModel._id + "&clubId=" + clubId,
					seen: false
				},
				datetimenow()))

			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}


module.exports = {
	GET_EVENT: GET_EVENT,
	SHOW_EVENT_ID: SHOW_EVENT_ID,
	GET_EDIT_EVENT_ID: GET_EDIT_EVENT_ID,
	POST_EDIT_EVENT_ID: POST_EDIT_EVENT_ID,
	GET_DELETE_EVENT: GET_DELETE_EVENT,
	POST_DELETE_EVENT: POST_DELETE_EVENT,
	GET_CREATE_EVENT: GET_CREATE_EVENT,
	POST_CREATE_EVENT: POST_CREATE_EVENT,


	GET_PARTICIPANT: require("./participantController").GET_PARTICIPANT,
	UPDATE_PARTICIPANT: require("./participantController").UPDATE_PARTICIPANT,
	GET_PARTICIPANT_REQUEST: require("./participantController").GET_PARTICIPANT_REQUEST,
	POST_PARTICIPANT_REQUEST: require("./participantController").POST_PARTICIPANT_REQUEST,
	GET_PARTICIPANT_REMOVE: require("./participantController").GET_PARTICIPANT_REMOVE,
}

