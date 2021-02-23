import { Request, Response } from "express";
import { getRepository } from "typeorm";

class UserController {
    async create(request: Request, response: Response) {
        const body = request.body;
        console.log(body);
        return response.send();
    }
}

export { UserController };