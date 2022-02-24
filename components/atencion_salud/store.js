import Model from "./model.js";

let model = new Model()

function getAtencionSalud() {

    return model.fetch()
    
}

function insertAtencionSalud(atencion_salud_data){
    model.insert(atencion_salud_data)
}

export default {
    list: getAtencionSalud,
    insert: insertAtencionSalud
}