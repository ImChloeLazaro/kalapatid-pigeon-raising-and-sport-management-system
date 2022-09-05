const express = require("express");
const controller = require("./controller/controller");

const search = express.Router()

search.get("/", controller.SEARCH)
search.get("/result", controller.SEARCH_RESULT)


module.exports = search;






