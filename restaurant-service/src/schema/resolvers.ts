import { DataSources, QueryArgs } from "../interfaces/type";

const resolvers = {
  Query: {
    getRestaurants: async (
      _: any,
      args:QueryArgs,
      { dataSources }: { dataSources: DataSources }
    ) => {
      const allUsers = await dataSources.restaurants.getAll(
        args.perPage || 4,
        args.page || 1,
        args.imageOnly || false
      );
      return allUsers;
    } 
  },
};

export default resolvers;
