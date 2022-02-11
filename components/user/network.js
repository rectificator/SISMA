import * as response from "../../network/response.js"
import * as controller from "./controller.js"
import { Router } from "express"

const user = Router()

user.get('/', function (request, res) {
    controller.getUsers()
    .then((userList) => {
        response.success(request, res, userList);
    })
    .catch(e => {
        response.error(request, res, e);
    });
});

export default user