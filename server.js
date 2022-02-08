'use strict'
import express from "express"
import { Server } from "http"
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from "./socket.js"
import config from "./config.js";
import db from "./db.js"
import routes from "./network/router.js";

const app = express()
const server = Server(app)

// Aquí va la conexión a la db
db.connect(config.dbUrl)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

connect(server)
/*  IMPORTANTE! 
**************************************
    Siempre añadir el body-parser
    antes que el router
    de lo contrario 
    nunca se aplicará 
    el body-parser
**************************************
*/
routes(app)
app.use(`/${config.publicRoute}`, express.static(config.publicFolder))

server.listen(config.port, function(){
    console.log('La aplicación está escuchando en', ` ${config.host}:${config.port}`)
})

