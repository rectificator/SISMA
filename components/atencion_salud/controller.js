import store from "./store.js";

function getAtencionSalud(){
    return new Promise( (resolve,reject) => {
        resolve( store.list() )
    })
}

function insertAtencionSalud(atencion_salud_data){
    return new Promise( (resolve,reject) => {
        resolve(store.insert(atencion_salud_data))
    })
}

export default {
    getAtencionSalud,
    insertAtencionSalud
}