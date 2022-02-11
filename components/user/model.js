import knex from "knex";
import connection from "../../dbConfig.js"

async function model(table='a_usuarios', columns= '*') {
    return await knex(connection).select().from(table)
}

export default model