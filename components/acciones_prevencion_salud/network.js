import controller from "./controller.js";
import { success, error } from "../../network/response.js";
import { Router } from "express";

const acciones_prevencion_salud = Router();

acciones_prevencion_salud.get("/", fetchThroughGet);

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

acciones_prevencion_salud.post("/", insertByPost);

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
