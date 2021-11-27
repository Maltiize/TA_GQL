import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Restaurant {
    restaurantUuid: String
    name: String!
    allowReview: Boolean!
    images: [String]
  }

  type Query {
    getAllRestaurant(
      perPage: Int = 4,
      page: Int = 1
    ): [Restaurant!]!
  }
`;

export default typeDefs;