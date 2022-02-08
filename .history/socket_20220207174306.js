import { Server } from "socket.io";

let io
let connections = 0

const socket = {}

function connect(server){
    io = Server(server)
    socket.io = io

    io.on('connection', function(socket){
        console.log(`Connect...`);
		console.log(`Cantidad de conexiones: ${++conections}`);

		/**Cuando un cliente se desconecte **/
		socket.on('disconnect', (message) => {
			console.log(`[DISCONNECT]: ${message}`);
			conections--;
			showClients(socket);
		})

		showClients(socket);
    })
}