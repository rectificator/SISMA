import controller from "./controller.js"
import { success, error } from "../../network/response.js"
import { Router } from "express"

const sisma = Router()

sisma.get('/info_registro', fetchThroughGet(controller.getInfoRegistro))
sisma.get('/modalidad', fetchThroughGet(controller.getModalidad))
sisma.get('/anio', fetchThroughGet(controller.getAnio))
sisma.get('/mes', fetchThroughGet(controller.getMes))
sisma.get('/estado', fetchThroughGet(controller.getEstado))
sisma.get('/municipio', fetchThroughGet(controller.getMunicipio))
sisma.get('/institucion', fetchThroughGet(controller.getInstitucion))
sisma.get('/poblacion', fetchThroughGet(controller.getPoblacion))
sisma.get('/tipo_actividad', fetchThroughGet(controller.getTipoActividad))
sisma.get('/tipo_accion', fetchThroughGet(controller.getTipoAccion))

function fetchThroughGet(fetchFunction){
    return function (request,response){
        fetchFunction()
        .then((acList)=>{
            success(request, response, acList)
        })
        .catch(e => {
            error(request, response, e)
        })
    }
}

export default sisma