import express from "express"
import { Server } from "http"
import config from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from "./socket"

const app = express()
const server = Server(app)


