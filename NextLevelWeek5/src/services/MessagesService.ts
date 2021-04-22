import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
   admin_id?: string; // ?: opcional
   text: string;
   user_id: string;
}

class MessagesService{
    private messagesRepository : Repository<Message>;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }
    async create({ admin_id, text, user_id} : IMessageCreate) {
        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id,
        });

    await this.messagesRepository.save(message);
    return message;
    }

    async ListByUser(user_id: string){
        //para trazer todas informações da tabela relacionada nesse casso a tabela users
        const list = await this.messagesRepository.find({
            where: {user_id},
            relations: ["user"], // mesmo nome que estiver na tabela entidades
        });

        // const list = await messagesRepository.find({user_id});   //traz informaçõe geral da requisição 
        return list; 
    }
}

export{ MessagesService }