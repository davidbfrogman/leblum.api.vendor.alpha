
import { Model, Document } from "mongoose";

export class BaseRepo<IModel extends Document>{

    public mongooseModelInstance: Model<IModel>;

    public async single(id: string, populationArgument?: object): Promise<IModel> {
        let query = this.mongooseModelInstance.findById(id);

        query = populationArgument ? query.populate(populationArgument) : query;
        throw( {mongo: "This is a mongo error"});
        return await query;
    }
}