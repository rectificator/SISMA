import store from "./store.js";

function getAccionesPrevencionSalud() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
}

function insertAccionesPrevencionSalud(acciones_prevencion_salud_data) {
  return new Promise((resolve, reject) => {
    resolve(store.insert(acciones_prevencion_salud_data));
  });
}

export default {
  getAccionesPrevencionSalud,
  insertAccionesPrevencionSalud,
};
