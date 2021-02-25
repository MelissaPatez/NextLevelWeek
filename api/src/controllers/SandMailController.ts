//enviar email

import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { UserRepository } from "../repositories/UsersRepository";

class SendMailController {
    [x: string]: RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;

    async create(request: Request, response: Response) {
        const { email, survey_id} = request.body;

        //para validar o usuario e pesquisa 
        const surveysRepository = getCustomRepository(SurveysRepository);
        const userRepository = getCustomRepository(UserRepository);
        const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (!userAlreadyExists){
            return response.status(400).json({
                error: "User does not exists!!",
            });
        }

        const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id });
        
        if (!surveyAlreadyExists){
            return response.status(400).json({
                error: "Survey does not exists!!",
            });
        }
        //salvar informações na tabela surveyuser
        const surveyUser = await surveysUsersRepository.create({
            user_id: surveyAlreadyExists.id,
            survey_id
        })
        await surveysUsersRepository.save(surveyUser);

        //enviar email para o usuario
        return response.json(surveyUser);
    }
}

export { SendMailController }