import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Restaurant {
    restaurantUuid: String
    name: String!
    allowReview: Boolean!
    images: [String]
    country: Country
  }

  type Pagination {
    total: Int
    pageCount: Int
    currentPage: Int
  }

  type Country {
    code: String
    locales: [String]
  }

  type RestaurantResult{
    restaurants: [Restaurant!]!
    pagination: Pagination
  }

  type Query {
    getRestaurants(
      perPage: Int = 4
      page: Int = 1
      imageOnly: Boolean = false
    ): RestaurantResult
  }
`;

export default typeDefs;
