import config from "../config.js";
import passport from "passport";
import access_control, { resourcesList } from "../utils/access_control.js";
import * as QBuilder from "../query.js";
let QueryBuilder = QBuilder.default.QueryBuilder;

function checkApiKey(request, response, netx) {
  //console.log("API_KEY: ", config.apiKey);
  /*
  Cambiar el API Key para que se consulten 
  tokens autogenerados dinámicamente desde una DB
  */
 
  const apiKey = request.headers["api"];
  if (apiKey == config.apiKey) {
    netx();
  } else {
    netx("Unauthorized");
  }
}

const jwtAuthenticate = passport.authenticate("jwt", { session: false });

function checkRole(resource, crudAction = crudVerbs.read) {
  return (request, response, netx) => {
    const user = request.user;
    //console.log("USER:", user);
    QueryBuilder.getFromTableWhere("privilegios_usuario", "id", user.role)
      .then((roleList) => {
        let role = roleList[0][0].privilegio;
        console.log("ROLE:", role);
        let permission = access_control.can(role).read(resource);
        if (crudAction in crudActions) {
          permission = crudActions[crudAction](role, resource);
        }

        return permission;
      })
      .then((permission) => {
        if (permission.granted) {
          netx();
        } else {
          netx("Unauthorized");
        }
      });
  };
}

const crudActions = {
  create: (role, resource) => access_control.can(role).create(resource),
  read: (role, resource) => access_control.can(role).read(resource),
  update: (role, resource) => access_control.can(role).update(resource),
  delete: (role, resource) => access_control.can(role).delete(resource),
};

const crudVerbs = {
  create: "create",
  read: "read",
  update: "update",
  delete: "delete",
};

export {
  checkApiKey,
  jwtAuthenticate,
  checkRole,
  crudActions,
  crudVerbs,
  resourcesList,
};
