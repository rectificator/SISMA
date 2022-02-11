import user from "../components/user/network.js"

const routes = function (server){
    server.use('/user', user)
}

export default routes