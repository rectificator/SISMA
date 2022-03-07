import store from "./store.js";
import bcrypt from "bcrypt";

function getUsers() {
  return Promise.resolve(store.list());
}

function insertUser(usuario) {
  return new Promise((resolve, reject) => {
    resolve(store.insert(usuario));
  });
}

function loginUser(data) {
  return new Promise((resolve, reject) => {
    //let users = this.getUsers()
    
    resolve(data);
  });
}

export default {
  getUsers,
  insertUser,
  loginUser
};
