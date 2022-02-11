import * as store from "./store.js";

export const getUsers = function (){
    return Promise.resolve(store.list());
}

