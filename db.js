// Importamos mysql2 con el Promise Wrapper
import knex from "knex";



const db = {
    connect: async function (dbUrl){
      const options = {
         client: 'mysql2',
         connection: {
           host : dbUrl,
           port : 3306,
           user : 'root',
           password : '13pilar13',
           database : 'sisma'
         },
         pool: { min: 0, max: 10 }
      }
      knex(options)
      
      //console.log('USUSARIOS: ', await knex(options).select().from('a_usuarios'))
      
      console.log('\x1b[34m%s\x1b[0m', '[db] Conectada con éxito')
     }
}



export default db