import knex from "knex";
const connection = {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : '13pilar13',
      database : 'sisma'
    },
    pool: { min: 0, max: 10 }
 }

 const knexInstance = knex(connection)

 export default knexInstance