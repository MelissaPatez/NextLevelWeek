import { EntityRepository, Repository } from "typeorm";
import { SuveryUser } from "../models/SurveyUser";

@EntityRepository(SuveryUser)
class SurveyUserRepository extends Repository<SuveryUser> {}


export { SurveyUserRepository };
