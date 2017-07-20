
import { Model, Document } from "mongoose";
import { SearchCriteria } from "../../models/index";

export class BaseRepo<IModel extends Document>{

    public mongooseModelInstance: Model<IModel>;

    public async single(id: string, populationArgument?: object): Promise<IModel> {
        let query = this.mongooseModelInstance.findById(id);
        query = populationArgument ? query.populate(populationArgument) : query;
        return await query;
    }

    public async list(searchCriteria: SearchCriteria, populationArgument?: object): Promise<IModel[]> {
        let query = this.mongooseModelInstance.find()
            .skip(searchCriteria.skip)
            .limit(searchCriteria.limit)
            .sort(searchCriteria.sort);

        query = populationArgument ? query.populate(populationArgument) : query;

        return await query;
    }

    public blank(){
        return new this.mongooseModelInstance();
    }

    public count(searchCriteria: SearchCriteria,): Promise<number> {
    this.searchCriteria = new SearchCriteria(request, next);
    return this.mongooseModelInstance
      .find(this.searchCriteria.criteria)
      .count()
      .then((count: number) => {

        response.json({
          CollectionName: this.mongooseModelInstance.collection.name,
          CollectionCount: count,
          SearchCriteria: this.searchCriteria.criteria,
        });

        log.info(`Executed Count Operation: ${this.mongooseModelInstance.collection.name}, Count: ${count}`);
      })
      .catch((error) => { next(error); });
  }
}