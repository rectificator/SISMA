import Model from "./model.js";

let model = new Model();

function getSuicidio() {
  return model.fetch();
}

function insertSuicidio(suicidio_data) {
  model.insert(suicidio_data);
}

export default {
  list: getSuicidio,
  insert: insertSuicidio,
};
