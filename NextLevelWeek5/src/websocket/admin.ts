import {io} from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
//importar o admin em server.ts

//conexao sem admin
io.on("connect", async (socket) =>{
    const connectionsService =  new ConnectionsService();
    const messagesService =  new MessagesService();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
    
    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const {user_id} = params;
        const allMessages = await messagesService.ListByUser(user_id);
        
        callback(allMessages);
    });
    socket.on("admin_send_message", async (params) =>{
        const { user_id, text} = params;

        //salva mensagem
        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        const {socket_id} = await connectionsService.findByUserId(user_id);

        //emit mensagem
        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id
        });
    });
} );