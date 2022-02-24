import controller from "./controller.js";
import { success, error } from "../../network/response.js";
import { Router } from "express";

const capacitacion = Router();

capacitacion.get("/", fetchThroughGet);

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

capacitacion.post("/", insertByPost);

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
