import model from "./model.js";

async function getUsers(){

    const users = await model();

    return users;

}



export const list = getUsers