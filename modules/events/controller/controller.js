const { ObjectId } = require("mongodb")
const globalConstants = require("../../../constants/constants");
const { verifyLogin } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')

const { getAllClubDataBy, getClubAllMemberDataBy } = require("../../clubs/db/db-functions");
const { ctx } = require("../../../constants/constants");




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
					fn(events, clubs, clubMembers)
				})
			})
		})

	}
	verifyLogin(req, res, (accountId, username) => {
		query((events, clubs, clubMembers) => {
			return res.render("event/index.html", {
				ctx: globalConstants.ctx,
				accountId: accountId,
				username: username,
				events: events,
				clubs: clubs,
				clubMembers: clubMembers
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
				fn(event, eventParticipants)
			})
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(accountId, req.query.eventId, req.query.clubId, (event, eventParticipants) => {
			return res.render("event/show-event.html", {
				ctx: globalConstants.ctx,
				accountId: accountId,
				username: username,
				clubId: req.query.clubId,
				event: event,
				eventParticipants: eventParticipants
			})
		})
	})

}




const GET_CREATE_EVENT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		return res.render("event/create-event.html", {
			ctx: globalConstants.ctx,
			username: username,
			accountId: accountId,
			clubId: req.query.clubId
		})
	})
}



const POST_CREATE_EVENT = (req, res) => {
	function query(accountId, data, fn) {
		dbf.insertEventData(data, (err) => {
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
		let hourStart = req.body.hourStart
		let hourEnd = req.body.hourEnd
		let type = req.body.type
		let description = req.body.description
		let maxParticipants = req.body.maxParticipants
		let EventModel = model.Event(accountId, clubId, name, date, long, lat, hourStart, hourEnd, type, description, username, clubName, maxParticipants)
		query(accountId, EventModel, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/clubs/show?clubId=" + clubId)
		})
	})
}


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
			console.log(docs)
			return res.render("event/participant.html", {
				ctx: globalConstants.ctx,
				username: username,
				accountId: accountId,
				partuName: partuName,
				eventId: eventId,
				clubId: clubId,
				participant: docs
			})
		})

	})
}

const UPDATE_PARTICIPANT = (req, res) => {
	function query(filter, setUpdate, fn) {
		if (setUpdate.status === "accepted") {
			dbf.updateEventParticipantDataBy(filter, setUpdate, (err) => {
				fn(err)
			})
		} else if (setUpdate.status === "declined") {
			dbf.deleteEventParticipantDataBy(filter, (err) => {
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

		query(filter, setUpdate, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + `/events/show?eventId=${eventId}&clubId=${clubId}`)
		})
	})
}


pigeonSerialGenerator("4")


const GET_PARTICIPANT_REQUEST = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let clubId = req.query.clubId
		let partId = req.query.partId
		return res.render("event/participant-request.html", {
			ctx: globalConstants.ctx,
			username: username,
			accountId: accountId,
		})
	})
}

function serialNoGenerator(number) {
	return (number).toString().padStart(6, "0")
}


function pigeonSerialGenerator(eventId, clubId, participantId, numberOfPegions) {
	let pigeons = []
	for (let i = 1; i <= Number(numberOfPegions); i++) {
		pigeons.push(model.Pigeon(eventId, clubId, participantId, i, serialNoGenerator(i)))
	}
	return pigeons;
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
		let status = "pending";
		let pigeons = pigeonSerialGenerator(eventId, clubId, accountId, req.body.pigeons);
		let eventParticipant = model.EventParticipant(eventId, accountId, clubId, username, status, info, lat, long, pigeons)
		query(eventParticipant, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + `/events/show?eventId=${eventId}&clubId=${clubId}`)
		})
	})
}


module.exports = {
	GET_EVENT: GET_EVENT,
	SHOW_EVENT_ID: SHOW_EVENT_ID,
	GET_CREATE_EVENT: GET_CREATE_EVENT,
	POST_CREATE_EVENT: POST_CREATE_EVENT,
	GET_PARTICIPANT: GET_PARTICIPANT,
	UPDATE_PARTICIPANT: UPDATE_PARTICIPANT,
	GET_PARTICIPANT_REQUEST: GET_PARTICIPANT_REQUEST,
	POST_PARTICIPANT_REQUEST: POST_PARTICIPANT_REQUEST
}

