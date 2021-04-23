import {io} from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
//importar o admin em server.ts

//conexao sem admin
io.on("connect", async (socket) =>{
    const connectionsService =  new ConnectionsService();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
} )