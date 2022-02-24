import Model from "./model.js";

let model = new Model();

function getAccionesPrevencionSalud() {
  return model.fetch();
}

function insertAccionesPrevencionSalud(acciones_prevencion_salud_data) {
  model.insert(acciones_prevencion_salud_data);
}

export default {
  list: getAccionesPrevencionSalud,
  insert: insertAccionesPrevencionSalud,
};
