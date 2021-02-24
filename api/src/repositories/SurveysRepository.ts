import { EntityRepository, Repository } from "typeorm";
import { Suvery } from "../models/Survey";

@EntityRepository(Suvery)
class SurveysRepository extends Repository<Suvery> {}


export { SurveysRepository };

