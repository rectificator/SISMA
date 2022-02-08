import mysql2 from "mysql2";




 await function connect(dbUrl){
    const connection = mysql2.createConnection({
        host: dbUrl,
        user: 'root',
        password: '13pilar13',
        database: 'pavigurumis',
        port: 3306
     });
     connection.connect(function(error){
        if(error){
           throw error;
        }else{
           console.log('Conexion correcta.');
        }
     });
     connection.end();
 }

export default db