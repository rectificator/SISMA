import { Strategy } from "passport-local";
import * as QBuilder from "../../../query.js";
import bcrypt from "bcrypt";

let QueryBuilder = QBuilder.default.QueryBuilder;

export const localStrategy = new Strategy(
  { usernameField: 'username', passwordField: 'password' },
  async (userName, password, done) => {
    try {
      let user = await QueryBuilder.getFromTableWhere(
        "a_usuarios",
        "nombre_usuario",
        `'${userName}'`
      );
      //console.log("username: ", user);
      user = user[0][0];

      let isMatch = false;
      if (user == undefined) {
        done("Unauthorized", false);
      } else {
        isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          done("Unauthorized", false);
        }
        
        delete user.integridad
        delete user.password
        done(null, user);
      }
    } catch (error) {
      done(error, false);
    }
  }
);
