import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"


class UsersService{
    async create(email:string) {
        const usersRepository = getCustomRepository(UsersRepository);

        //verificar se usuario existe
        const userExist = await usersRepository.findOne({
            email
        })

        // se existir retornar o user
        if(userExist){
            return userExist;
        }

        //se não existir, salvar no BD
        const user = usersRepository.create({email});
        await usersRepository.save(user);
        return user; 
        
    }
}

export {UsersService}