import express from "express"
import { Server } from "http"
import config from "./config";
import cors from "cors";
import bodyParser from "body-parser";

const app = express()
const server = Server(app)


