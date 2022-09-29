import { NextApiRequest, NextApiResponse } from "next"
import { Server } from 'socket.io';
import NextCors from "nextjs-cors";

const index = async (req: NextApiRequest, res: NextApiResponse | any) => {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (!res.socket.server.io) {

        console.log('Socket is initializing');

        const io = new Server(res.socket.server);

        res.socket.server.io = io;
        io.on('connection', socket => {

            console.log(`Connected: ${socket.id}`);

            /**desconeccion del chat */
            socket.on('disconnect', () => console.log(`Disconect: ${socket.id}`));

            /** Union a un chat */
            socket.on('join', room => {
                console.log(`Socket ${socket.id} joining room with ID: ${room}`);
                socket.join(room);
            });

            /**Enviar mensaje a un room */
            socket.on('chat', data => {
                const { message, room } = data;
                console.log(`msg: ${message}, room: ${room}`);
                io.to(room).emit('chat', message);
            });
        })
    }
    res.status(200).end();
}

export default index
/** ejemplo de la pagina 
 * https://tincode.es/blog/manejo-de-salas-con-socket-io-y-react-hooks
io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on('disconnect', () =>
        console.log(`Disconnected: ${socket.id}`));
    socket.on('join', (room) => {
        console.log(`Socket ${socket.id} joining ${room}`);
        socket.join(room);
    });
    socket.on('chat', (data) => {
        const { message, room } = data;
        console.log(`msg: ${message}, room: ${room}`);
        io.to(room).emit('chat', message);
    });
});
*/