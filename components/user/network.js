import * as response from "../../network/response.js";
import controller from "./controller.js";
import { Router } from "express";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
import config from "../../config.js";
import {
  checkApiKey,
  jwtAuthenticate,
  checkRole,
  crudVerbs,
  resourcesList,
} from "../../middlewares/auth.handler.js";

const user = Router();

user.get(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.user),
  function (request, res) {
    controller
      .getUsers()
      .then((userList) => {
        response.success(request, res, userList);
      })
      .catch((e) => {
        response.error(request, res, e);
      });
  }
);

user.post(
  "/",
  checkApiKey,
  jwtAuthenticate,
  checkRole(resourcesList.user, crudVerbs.create),
  function (request, res) {
    controller
      .insertUser(request.body)
      .then((data) => {
        response.success(request, res, data, 201);
      })
      .catch((e) => {
        response.error(request, res, e);
      });
  }
);

user.post(
  "/login",
  passport.authenticate("local", { session: false }),
  function (request, res) {
    controller
      .loginUser(request.user)
      .then((user) => {
        //JWT
        const payload = {
          sub: user.id,
          role: user.privilegios,
        };
        const jwt = jsonwebtoken.sign(payload, config.jwtSecret);
        response.success(request, res, { jwt }, 201);
      })
      .catch((e) => {
        response.error(request, res, e);
      });
  }
);

export default user;
