import { DataSources, PageArgs } from "../interfaces/type";

const resolvers = {
  Query: {
    restaurants: async (
      _: any,
      args:PageArgs,
      { dataSources }: { dataSources: DataSources }
    ) => {
      const allUsers = await dataSources.postgres.getAll(
        args.perPage || 4,
        args.page || 1
      );
      return allUsers;
    } 
  },
};

export default resolvers;
