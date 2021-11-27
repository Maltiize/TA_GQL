import { dataSources, pageArgs } from "../type";

const resolvers = {
  Query: {
    getAllRestaurant: async (
      _: any,
      args:pageArgs,
      { dataSources }: { dataSources: dataSources }
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
