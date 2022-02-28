import store from "./store.js";

function getInfoRegistro() {
  return new Promise((resolve, reject) => {
    resolve(store.listInfoRegistro());
  });
}

function getModalidad() {
  return new Promise((resolve, reject) => {
    resolve(store.listModalidad());
  });
}

function getAnio() {
  return new Promise((resolve, reject) => {
    resolve(store.listAnio());
  });
}

function getMes() {
  return new Promise((resolve, reject) => {
    resolve(store.listMes());
  });
}

function getEstado() {
  return new Promise((resolve, reject) => {
    resolve(store.listEstado());
  });
}

function getMunicipio() {
  return new Promise((resolve, reject) => {
    resolve(store.listMunicipio());
  });
}

function getInstitucion() {
  return new Promise((resolve, reject) => {
    resolve(store.listInstitucion());
  });
}

function getPoblacion() {
  return new Promise((resolve, reject) => {
    resolve(store.listPoblacion());
  });
}

function getTipoActividad() {
  return new Promise((resolve, reject) => {
    resolve(store.listTipoActividad());
  });
}

function getTipoAccion() {
  return new Promise((resolve, reject) => {
    resolve(store.listTipoAccion());
  });
}

export default {
  getInfoRegistro,
  getModalidad,
  getAnio,
  getMes,
  getEstado,
  getMunicipio,
  getInstitucion,
  getPoblacion,
  getTipoActividad,
  getTipoAccion,
};
