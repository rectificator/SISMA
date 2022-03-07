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

const capacitacion = Router();

capacitacion.get(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.capacitacion),
  fetchThroughGet
);

function fetchThroughGet(request, response) {
  controller
    .getCapacitacion()
    .then((acList) => {
      success(request, response, acList);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

capacitacion.post(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.capacitacion, crudVerbs.create),
  insertByPost
);

function insertByPost(request, response) {
  controller
    .insertCapacitacion(request.body)
    .then((data) => {
      success(request, response, data, 201);
    })
    .catch((e) => {
      error(request, response, e);
    });
}

export default capacitacion;
