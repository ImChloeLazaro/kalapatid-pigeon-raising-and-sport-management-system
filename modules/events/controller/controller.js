const { ObjectId } = require("mongodb")
const globalConstants = require("../../../constants/constants");
const { verifyLogin } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')







const GET_EVENT = (req, res) => {
	function query(accountId, fn) {
		// let accountIdObj = new ObjectId(accountId)
		// let filter = { accountId: accountIdObj }
		dbf.getAllEventDataBy({}, (err, docs) => {
			if (err) return
			let events = docs
			fn(events)
		})
	}
	verifyLogin(req, res, (accountId, username) => {
		query(accountId, (events) => {
			return res.render("event/index.html", {
				ctx: globalConstants.ctx,
				username: username,
				events: events
			})
		})
	})

}


const SHOW_EVENT_ID = (req, res) => {
	function query(accountId, eventId, fn) {
		let eventIdObj = new ObjectId(eventId)
		let accountIdObj = new ObjectId(accountId)
		let filter = {
			accountId: accountIdObj, _id: eventIdObj
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
		query(accountId, req.params.id, (event, eventParticipants) => {
			return res.render("event/show-event.html", {
				ctx: globalConstants.ctx,
				accountId: accountId,
				username: username,
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
		let name = req.body.name
		let date = req.body.date
		let long = req.body.long
		let lat = req.body.lat
		let hourStart = req.body.hourStart
		let hourEnd = req.body.hourEnd
		let type = req.body.type
		let description = req.body.description
		let EventModel = model.Event(accountId, name, date, long, lat, hourStart, hourEnd, type, description)
		query(accountId, EventModel, (err) => {
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/events")
		})
	})
}




const GET_ADD_PARTICIPANT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let eventId = req.params.eventId
		dbf.getAllAcountData((err, docs) => {
			let accounts = docs
			let filter = { eventId: new ObjectId(eventId) }
			dbf.getEventAllParticipantDataBy(filter, (err, docs) => {
				let eventParticipants = docs
				return res.render("event/add-participant.html", {
					ctx: globalConstants.ctx,
					eventId: eventId,
					username: username,
					accountId: accountId,
					accounts: accounts,
					eventParticipants: eventParticipants
				})
			})
		})
	})
}


const POST_ADD_PARTICIPANT = (req, res) => {
	verifyLogin(req, res, (accountId, username) => {
		let eventParticipants = []
		let eventId = req.params.eventId
		let participants = req.body.participants
		if (participants instanceof Array) {
			participants.forEach(participant => {
				eventParticipants.push(model.EventParticipant(eventId, participant["accountId"], participant["accountId"], participant["username"]))
			})
		}
		console.log(eventParticipants);
		dbf.insertManyEventParticipantData(eventParticipants, (err) => {
			console.log(err)
			return res.redirect(globalConstants.ctx.DOMAIN_NAME + "/events/show/" + eventId)
		})
	})
}




module.exports = {
	GET_EVENT: GET_EVENT,
	SHOW_EVENT_ID: SHOW_EVENT_ID,
	GET_CREATE_EVENT: GET_CREATE_EVENT,
	POST_CREATE_EVENT: POST_CREATE_EVENT,
	POST_ADD_PARTICIPANT: POST_ADD_PARTICIPANT,
	GET_ADD_PARTICIPANT: GET_ADD_PARTICIPANT
}

