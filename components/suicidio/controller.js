import store from "./store.js";

function getSuicidio() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
}

function insertSuicidio(suicidio_data) {
  return new Promise((resolve, reject) => {
    resolve(store.insert(suicidio_data));
  });
}

export default {
  getSuicidio,
  insertSuicidio,
};
