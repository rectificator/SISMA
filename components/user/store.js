import Model from "./model.js";

let model = new Model();

function getUsers() {
  return model.fetchUsuarios();
}

function insertUser(data) {
  model.insertUser(data);
}


export default {
  list: getUsers,
  insert: insertUser,
};
