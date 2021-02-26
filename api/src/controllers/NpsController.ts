import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull} from "typeorm";
import { SurveyUserRepository } from "../repositories/SurveyUserRepository";


class NpsController {

    async execute(request: Request, response: Response) {
        const { survey_id} = request.params;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveysUsers = await surveyUserRepository.find({ //array com todas as respostas
            survey_id,
            value: Not(IsNull())

        });

        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const totalAnswer = surveysUsers.length;

        const calculate = (promoters - detractor) / totalAnswer;

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswer,
            nps: calculate,
        });

    }
}

export { NpsController };