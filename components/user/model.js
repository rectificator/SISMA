import QueryBuilder from "../../query.js"

async function fetch(options={}) {
    let schema = {
        table: 'a_usuarios'
    }

    let query = new QueryBuilder()
    
    query = query
    .select()
    .from(schema.table)

    return await query.build()
}

export default {
    fetch
}