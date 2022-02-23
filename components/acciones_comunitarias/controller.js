import store from "./store.js";

function getAccionesComunitarias(){
    return new Promise( (resolve,reject) => {
        resolve( store.list() )
    })
}

function insertAccionesComunitarias(acciones_comunitarias_data){
    return new Promise( (resolve,reject) => {
        resolve(store.insert(acciones_comunitarias_data))
    })
}

export default {
    getAccionesComunitarias,
    insertAccionesComunitarias
}