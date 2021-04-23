import { getCustomRepository, Repository } from "typeorm"
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"

interface IConnectionCreate {
    admin_id?: string; // ?: opcional
    socket_id: string;
    user_id: string;
    id?: string;
 }
class ConnectionsService{
    private connectionsRepository : Repository<Connection>;

    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }
    
    async create({socket_id, admin_id, user_id, id}: IConnectionCreate) {
        const connection= this.connectionsRepository.create({
            socket_id,
            admin_id,
            user_id,
            id
        })
        await this.connectionsRepository.save(connection);
        return connection;
    }

    async findByUserId(user_id: string){
        const connection = this.connectionsRepository.findOne({user_id});
        return connection;
    }
    //conexao sem admin
    async findAllWithoutAdmin(){
        const connections = this.connectionsRepository.find({
            where: {admin_id: null},
            relations: ["user"],
        });
        return connections;
    }
}
export {ConnectionsService}