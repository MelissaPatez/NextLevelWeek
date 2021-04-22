import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
   admin_id?: string; // ?: opcional
   text: string;
   user_id: string;
}

class MessagesService{
    async create({ admin_id, text, user_id} : IMessageCreate) {
        const messagesRepository = getCustomRepository(MessagesRepository);

        const message = messagesRepository.create({
            admin_id,
            text,
            user_id,
        });

    await messagesRepository.save(message);
    return message;
    }

    async ListByUser(user_id: string){
        const messagesRepository = getCustomRepository(MessagesRepository);

        //para trazer todas informações da tabela relacionada nesse casso a tabela users
        const list = await messagesRepository.find({
            where: {user_id},
            relations: ["user"], // mesmo nome que estiver na tabela entidades
        });

        // const list = await messagesRepository.find({user_id});   //traz informaçõe geral da requisição 
        return list; 
    }
}

export{ MessagesService }