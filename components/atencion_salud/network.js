import controller from "./controller.js"
import { success, error } from "../../network/response.js"
import { Router } from "express"

const atencion_salud = Router()

atencion_salud.get('/', fetchThroughGet)

function fetchThroughGet(request,response){
    controller.getAtencionSalud()
    .then((acList)=>{
        success(request, response, acList)
    })
    .catch(e => {
        error(request, response, e)
    })
}

atencion_salud.post('/', insertByPost)

function insertByPost(request, response){
    controller.insertAtencionSalud(request.body)
    .then((data) => {
        success(request, response, data, 201);
    })
    .catch(e => {
        error(request, response, e);
    });
}

export default atencion_salud