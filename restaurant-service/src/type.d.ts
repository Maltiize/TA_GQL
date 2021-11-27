import Restaurant from "./datasources/restaurant";

export interface pageArgs {
  perPage: number;
  page: number;
}

export interface dataSources {
  postgres: Restaurant;
}
