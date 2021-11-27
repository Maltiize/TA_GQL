import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Restaurant {
    restaurantUuid: String
    name: String!
    allowReview: Boolean!
    images: [String]
    country: Country
  }

  type Country{
    code: String,
    locales: [String]
  }

  type Query {
    restaurants(
      perPage: Int = 4,
      page: Int = 1
    ): [Restaurant!]!
  }
`;

export default typeDefs;