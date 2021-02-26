//enviar email
import { resolve } from 'path';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";
import { UserRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
class SendMailController {

    async execute(request: Request, response: Response) {
        const { email, survey_id} = request.body;

        //para validar o usuario e pesquisa 
        const surveysRepository = getCustomRepository(SurveysRepository);
        const userRepository = getCustomRepository(UserRepository);
        const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

        const user = await userRepository.findOne({ email });

        if (!user){
            return response.status(400).json({
                error: "User does not exists!!",
            });
        }

        const survey = await surveysRepository.findOne({ id: survey_id });
        
        if (!survey){
            return response.status(400).json({
                error: "Survey does not exists!!",
            });
        }

        const npsPath = resolve(__dirname, "..", "views", "email", "npsMail.hbs"); //caminho

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }
    
        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{user_id: user.id}, {value: null}],
            relations: ["user", "survey"]
        });

        if(surveyUserAlreadyExists){
            await SendMailService.execute(email, survey.id, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }
        //salvar informações na tabela surveyuser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser);

        //enviar email para o usuario
   
        await SendMailService.execute( email, survey.title, variables, npsPath );
        
        return response.json(surveyUser);
    }
}

export { SendMailController }