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

const acciones_comunitarias = Router();

acciones_comunitarias.get(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.acciones_comunitarias),
  fetchThroughGet
);

function fetchThroughGet(request, response) {
  controller
    .getAccionesComunitarias()
    .then((acList) => {
      success(request, response, acList);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

acciones_comunitarias.post(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.acciones_comunitarias, crudVerbs.create),
  insertByPost
);

function insertByPost(request, response) {
  console.log("BODY: ", request.body);
  const user = request.user;
  request.body.info_registro.registrada_por = user.sub;
  controller
    .insertAccionesComunitarias(request.body)
    .then((data) => {
      success(request, response, data, 201);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

export default acciones_comunitarias;
