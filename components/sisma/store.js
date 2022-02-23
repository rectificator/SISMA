import Model from "./model.js";

let model = new Model()

function get() {

    return model.fetch()
}

function getInfoRegistro(){
    return model.fetchInfoRegistro()
}

function getModalidad(){
    return model.fetchModalidad()
}

function getAnio(){
    return model.fetchAnio()
}

function getMes(){
    return model.fetchMes()
}

function getEstado(){
    return model.fetchEstado()
}

function getMunicipio(){
    return model.fetchMunicipio()
}

function getInstitucion(){
    return model.fetchInstitucion()
}

function getPoblacion(){
    return model.fetchPoblacion()
}

function getTipoActividad(){
    return model.fetchTipoActividad()
}


export default {
    listInfoRegistro: getInfoRegistro,
    listModalidad: getModalidad,
    listAnio: getAnio,
    listMes: getMes,
    listEstado: getEstado,
    listMunicipio: getMunicipio,
    listInstitucion: getInstitucion,
    listPoblacion: getPoblacion,
    listTipoActividad: getTipoActividad,
}