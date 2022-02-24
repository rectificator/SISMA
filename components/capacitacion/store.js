import Model from "./model.js";

let model = new Model()

function getCapacitacion() {

    return model.fetch()
    
}

function insertCapacitacion(capacitacion_data){
    model.insert(capacitacion_data)
}

export default {
    list: getCapacitacion,
    insert: insertCapacitacion
}