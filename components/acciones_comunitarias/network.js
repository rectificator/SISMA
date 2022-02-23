import controller from "./controller.js"
import { success, error } from "../../network/response.js"
import { Router } from "express"

const acciones_comunitarias = Router()

acciones_comunitarias.get('/', fetchThroughGet)

function fetchThroughGet(request,response){
    controller.getAccionesComunitarias()
    .then((acList)=>{
        success(request, response, acList)
    })
    .catch(e => {
        error(request, response, e)
    })
}

acciones_comunitarias.post('/', insertByPost)

function insertByPost(request, response){
    controller.insertAccionesComunitarias(request.body)
    .then((data) => {
        success(request, response, data, 201);
    })
    .catch(e => {
        error(request, response, e);
    });
}

export default acciones_comunitarias