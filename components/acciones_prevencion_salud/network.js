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

const acciones_prevencion_salud = Router();

acciones_prevencion_salud.get(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.acciones_prevencion_salud),
  fetchThroughGet
);

function fetchThroughGet(request, response) {
  controller
    .getAccionesPrevencionSalud()
    .then((acList) => {
      success(request, response, acList);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

acciones_prevencion_salud.post(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.acciones_prevencion_salud, crudVerbs.create),
  insertByPost
);

function insertByPost(request, response) {
  controller
    .insertAccionesPrevencionSalud(request.body)
    .then((data) => {
      success(request, response, data, 201);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

export default acciones_prevencion_salud;
