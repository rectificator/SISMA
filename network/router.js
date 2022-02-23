import user from "../components/user/network.js"
import acciones_comunitarias from "../components/acciones_comunitarias/network.js"
import sisma from "../components/sisma/network.js"

const routes = function (server){
    server.use('/user', user)
    server.use('/acciones_comunitarias', acciones_comunitarias)
    server.use('/sisma', sisma)
}

export default routes