
const express = require("express")
const constants = require('./constants/constants')
const config = require('./config/config')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
config(app, express, server, io, constants, __dirname)
