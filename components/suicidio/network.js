import controller from "./controller.js";
import { success, error } from "../../network/response.js";
import { Router } from "express";

const suicidio = Router();

suicidio.get("/", fetchThroughGet);

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

suicidio.post("/", insertByPost);

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
