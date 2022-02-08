import { Server } from "socket.io";

let io
let connections = 0

const socket = {}

function connect(server){
    io = Server(server)
    socket.io = io

    io.on('connection', function(socket){
        console.log(`Connect...`);
		console.log(`Cantidad de conexiones: ${++connections}`);

		/**Cuando un cliente se desconecte **/
		socket.on('disconnect', (message) => {
			console.log(`[DISCONNECT]: ${message}`);
			connections--;
			showClients(socket);
		})

		showClients(socket);
    })

    function showClients(socket) {
        console.log( socket.client.conn.server.clientsCount + " users connected" );
    }
    
}

export default {
    connect,
    socket
}