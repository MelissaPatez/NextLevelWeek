import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";

class AnswerController {
    /*
        https://ethereal.email/1?u=d43555f7-b778-4f21-81cf-5eec4cb1ca64
        --Route Params => Parametros que compoe a rota
        routes.get("/answers/:value")
        --Query Params =>Busca, Paginacao, nao obrigatorios
        ?
        chave=valor
    */
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveyUser = await surveyUserRepository.findOne({
            id: String(u),
        });

        if (!surveyUser) {
            return response.status(400).json({
                error: "Survey User does not exists!",
            });
        }

        surveyUser.value = Number(value);

        await surveyUserRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };
