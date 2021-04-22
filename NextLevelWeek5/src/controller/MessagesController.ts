import {  Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
  async create(request: Request, response: Response) {
    const { admin_id, text, user_id} = request.body;
    
        const messageService = new MessagesService();
        
        const message = await messageService.create({ admin_id, text, user_id });

        return response.json(message);
    } 

    //localhost:3333/messagens/idDoUsuario
    async showByUser(request: Request, response: Response){
      const { id } = request.params;

      const messageService = new MessagesService();

      const list = await messageService.ListByUser(id);

      return response.json(list);

    }
}

export { MessagesController };