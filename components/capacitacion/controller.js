import store from "./store.js";

function getCapacitacion(){
    return new Promise( (resolve,reject) => {
        resolve( store.list() )
    })
}

function insertCapacitacion(capacitacion_data){
    return new Promise( (resolve,reject) => {
        resolve(store.insert(capacitacion_data))
    })
}

export default {
    getCapacitacion,
    insertCapacitacion
}