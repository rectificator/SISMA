import Model from "./model.js";

let model = new Model()

function getAccionesComunitarias() {

    return model.fetch()
    
}

function insertAccionesComunitarias(acciones_comunitarias_data){
    model.insert(acciones_comunitarias_data)
}

export default {
    list: getAccionesComunitarias,
    insert: insertAccionesComunitarias
}