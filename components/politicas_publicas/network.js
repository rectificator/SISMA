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

const politicas_publicas = Router();

politicas_publicas.get(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.politicas_publicas),
  fetchThroughGet
);

function fetchThroughGet(request, response) {
  controller
    .getPoliticasPublicas()
    .then((acList) => {
      success(request, response, acList);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

politicas_publicas.post(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.politicas_publicas, crudVerbs.create),
  insertByPost
);

function insertByPost(request, response) {
  controller
    .insertPoliticasPublicas(request.body)
    .then((data) => {
      success(request, response, data, 201);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

export default politicas_publicas;
