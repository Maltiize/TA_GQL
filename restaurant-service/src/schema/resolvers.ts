import { DataSources, QueryArgs } from "../interfaces/type";
import { pageNumber, numberEl } from "../constants/default.value";


const resolvers = {
  Query: {
    getRestaurants: async (
      _: any,
      args:QueryArgs,
      { dataSources }: { dataSources: DataSources }
    ) => {
      const allUsers = await dataSources.restaurants.getAll(
        args.perPage || numberEl,
        args.page || pageNumber,
        args.imageOnly || false
      );
      return allUsers;
    } 
  },
};

export default resolvers;
