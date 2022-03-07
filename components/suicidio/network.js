import controller from "./controller.js";
import { success, error } from "../../network/response.js";
import { Router } from "express";
import {
  checkApiKey,
  jwtAuthenticate,
  checkRole,
  crudVerbs,
  resourcesList,
} from "../../middlewares/auth.handler.js";

const suicidio = Router();

suicidio.get(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.suicidio),
  fetchThroughGet
);

function fetchThroughGet(request, response) {
  controller
    .getSuicidio()
    .then((acList) => {
      success(request, response, acList);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

suicidio.post(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.suicidio, crudVerbs.create),
  insertByPost
);

function insertByPost(request, response) {
  controller
    .insertSuicidio(request.body)
    .then((data) => {
      success(request, response, data, 201);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

export default suicidio;
