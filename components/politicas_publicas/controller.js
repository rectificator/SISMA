import store from "./store.js";

function getPoliticasPublicas() {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
}

function insertPoliticasPublicas(politicas_publicas) {
  return new Promise((resolve, reject) => {
    resolve(store.insert(politicas_publicas));
  });
}

export default {
  getPoliticasPublicas,
  insertPoliticasPublicas,
};
