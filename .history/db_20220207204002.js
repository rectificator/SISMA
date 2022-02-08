import mysql2 from "mysql2";


const db = {
    connect: async function (dbUrl){
        const connection = await mysql2.createPool({
            host: dbUrl,
            user: 'root',
            password: '13pilar13',
            database: 'sisma',
            port: 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
         });
         /* connection.connect(function(error){
            if(error){
               throw error;
            }else{
               console.log('Conexion correcta.');
            }
         }); */
         
         // execute will internally call prepare and query
         const [rows, fields] = connection.execute(
             `SELECT * FROM a_usuarios`/* ,
            function(err, results, fields) {
            console.log('Error: ', err); // err contains Error returned by server
            console.log('Results: ', results); // results contains rows returned by server
            console.log('Fields: ', fields.length); // fields contains extra meta data about results, if available
        
            // If you execute same statement again, it will be picked from a LRU cache
            // which will save query preparation time and give better performance
            }
         */);

        console.log('Returned Rows: ', rows)
        console.log('Returned Fields: ', fields)
         
         //connection.end();

     }
}



export default db