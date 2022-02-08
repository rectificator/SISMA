import express from "express"
import { Server } from "http"
import config from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from "./socket"
import db from "./db"
import routes from "./network/router";

const app = express()
const server = Server(app)

// Aquí va la conexión a la db

app.use(cors())



