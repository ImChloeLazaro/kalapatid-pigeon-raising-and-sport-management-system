const { ObjectId } = require("mongodb")
const globalConstants = require("../../../constants/constants");
const { verifyLogin, datetimenow } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')

const { getNotifications, insertNotification } = require("../../../database/notification-query")
const Notification = require("../../../model/notification")


const GET_PARTICIPANT = (req, res) => {

	function query(clubId, eventId, partuName, fn) {
		filter = { username: partuName, clubId: new ObjectId(clubId), eventId: new ObjectId(eventId) }
		dbf.getEventParticipantDataBy(filter, (err, docs) => {
			fn(err, docs)
		})
	}

	verifyLogin(req, res, (accountId, username) => {
		let partuName = req.query.username
		let clubId = req.query.clubId
		let eventId = req.query.eventId

		query(clubId, eventId, partuName, (err, docs) => {
			if (docs != null) {
				getNotifications({}, (err, notifications) => {
					return res.render("event/manage-participant/participant.html", {
						ctx: globalConstants.ctx,
						username: username,
						accountId: accountId,
						partuName: partuName,
						eventId: eventId,
						clubId: clubId,
						participant: docs,
						notifications: notifications
					})
				})
			} else {
				res.redirect(globalConstants.ctx.DOMAIN_NAME + "/events")
			}
		})

	})
}

const UPDATE_PARTICIPANT = (req, res) => {
	function query(accountId, username, filter, setUpdate, fn) {
		if (setUpdate.status === "accepted") {
			dbf.updateEventParticipantDataBy(filter, setUpdate, (err) => {
				insertNotification(Notification(
					accountId,
					username,
					{
						title: "Event Registration Accepted",
						message: "Your registration for " + req.body.eventName + " has been accepted.",
						link: globalConstants.ctx.DOMAIN_NAME + `/events/show?eventId=${filter.eventId}&clubId=${filter.clubId}`,
						seen: false,
					},
					datetimenow()))
				fn(err)
			})
		} else if (setUpdate.status === "declined") {
			dbf.deleteEventParticipantDataBy(filter, (err) => {
				insertNotification(Notification(
					accountId,
					username,
					{
						title: "Event Registration Declined",
						message: "Your registration for " + req.body.eventName + " has been declined.",
						link: globalConstants.ctx.DOMAIN_NAME + `/events/show?eventId=${filter.eventId}&clubId=${filter.clubId}`,
						seen: false,
					},
					datetimenow()))
				fn(err)
			})
		}
	}
	verifyLogin(req, res, (accountId, username) => {
		let partuName = req.body.partuName
		let clubId = req.body.clubId
		let eventId = req.body.eventId
		let status = req.body.status
		console.log(req.body);

		let filter = { username: partuName, clubId: new ObjectId(clubId), eventId: new ObjectId(eventId) }
		let setUpdate = { status: status }

		query(accountId, username, filter, setUpdate, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + `/events/show?eventId=${eventId}&clubId=${clubId}`)
		})
	})
}


// pigeonSerialGenerator(4)
const GET_PARTICIPANT_REQUEST = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId
		let eventId = req.query.eventId
		getNotifications({}, (err, notifications) => {
			return res.render("event/manage-participant/participant-request.html", {
				ctx: globalConstants.ctx,
				username: username,
				accountId: accountId,
				notifications: notifications,
				clubId: clubId,
				eventId: eventId
			})
		})
	})
}

function serialNoGenerator(number) {
	return (number).toString().padStart(6, "0")
}
var lastCoutingNum = null;
function pigeonSerialGenerator(eventId, clubId, participantId, numberOfPegions, fn) {
	dbf.getLastInsertedParticipantData({ eventId: new ObjectId(eventId) }, (docs) => {
		let pigeons = []
		let lastParticipant = docs[0]
		if (lastParticipant == undefined) {
			let limit = Number(numberOfPegions)
			for (let i = 1; i <= limit; i++) {
				pigeons.push(model.Pigeon(eventId, clubId, participantId, i, serialNoGenerator(i)))
			}
		} else {
			let lastIndex = lastParticipant.pigeons.length - 1
			lastCoutingNum = lastParticipant.pigeons[lastIndex].pigeonNumber
			limit = lastCoutingNum + Number(numberOfPegions)

			for (let i = lastCoutingNum + 1; i <= limit; i++) {
				pigeons.push(model.Pigeon(eventId, clubId, participantId, i, serialNoGenerator(i)))
			}
		}
		fn(pigeons);
	})
}




const POST_PARTICIPANT_REQUEST = (req, res) => {
	function query(data, fn) {
		dbf.insertEventParticipantData(data, (err) => {
			fn(err)
		})
	}


	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId
		let eventId = req.query.eventId
		let info = req.body.description;
		let lat = req.body.lat;
		let long = req.body.long;
		let dropOffAddress = req.body.dropOffAddress
		let billingStatus = req.body.billingStatus
		let status = "pending";
		pigeonSerialGenerator(eventId, clubId, accountId, req.body.pigeons, (pigeons) => {
			let eventParticipant = model.EventParticipant(eventId, accountId, clubId, username, status, info, lat, long, billingStatus, dropOffAddress, pigeons)
			console.log(eventParticipant);
			query(eventParticipant, (err) => {
				insertNotification(Notification(
					accountId,
					username,
					{
						title: "Event Request",
						message: `You have requested to join the event ${eventId}`,
						link: globalConstants.ctx.DOMAIN_NAME + `/events/show?eventId=${eventId}&clubId=${clubId}`,
						seen: false,
					}, datetimenow()))
				return res.redirect(globalConstants.ctx.DOMAIN_NAME + `/events/show?eventId=${eventId}&clubId=${clubId}`)
			})
		});
	})
}


const GET_PARTICIPANT_REMOVE = (req, res) => {
	function query(filter, fn) {
		dbf.deleteEventParticipantDataBy(filter, (err) => {
			fn(err)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		let id = req.query.id
		let eventId = req.query.eventId;
		let clubId = req.query.clubId
		let filter = { _id: new ObjectId(id), eventId: new ObjectId(eventId), clubId: new ObjectId(clubId) }
		query(filter, (err) => {
			insertNotification(Notification(
				accountId,
				username,
				{
					title: "Event Participant Removed",
					message: `You been removed to the  event ${eventId}`,
					link: globalConstants.ctx.DOMAIN_NAME + `/events/show?eventId=${eventId}&clubId=${clubId}`,
					seen: false,
				}, datetimenow()))
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + `/events/show?eventId=${eventId}&clubId=${clubId}`)
		})
	})
}


module.exports = {
	GET_PARTICIPANT: GET_PARTICIPANT,
	UPDATE_PARTICIPANT: UPDATE_PARTICIPANT,
	GET_PARTICIPANT_REQUEST: GET_PARTICIPANT_REQUEST,
	POST_PARTICIPANT_REQUEST: POST_PARTICIPANT_REQUEST,
	GET_PARTICIPANT_REMOVE: GET_PARTICIPANT_REMOVE
}