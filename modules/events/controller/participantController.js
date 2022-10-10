const { ObjectId } = require("mongodb")
const globalConstants = require("../../../constants/constants");
const { verifyLogin } = require("../../../lib/toolkit")
const dbf = require('../db/db-functions')
const model = require('../model/model')




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
				return res.render("event/manage-participant/participant.html", {
					ctx: globalConstants.ctx,
					username: username,
					accountId: accountId,
					partuName: partuName,
					eventId: eventId,
					clubId: clubId,
					participant: docs
				})
			} else {
				res.redirect(globalConstants.ctx.DOMAIN_NAME + "/events")
			}
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
		return res.render("event/manage-participant/participant-request.html", {
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
	GET_PARTICIPANT: GET_PARTICIPANT,
	UPDATE_PARTICIPANT: UPDATE_PARTICIPANT,
	GET_PARTICIPANT_REQUEST: GET_PARTICIPANT_REQUEST,
	POST_PARTICIPANT_REQUEST: POST_PARTICIPANT_REQUEST
}