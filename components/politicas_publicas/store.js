import Model from "./model.js";

let model = new Model();

function getPoliticasPublicas() {
  return model.fetch();
}

function insertPoliticasPublicas(politicas_publicas) {
  model.insert(politicas_publicas);
}

export default {
  list: getPoliticasPublicas,
  insert: insertPoliticasPublicas,
};
