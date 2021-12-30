export interface QueryArgs {
  perPage: number;
  page: number;
  imageOnly: boolean;
}

export interface DataSources {
  restaurants: Restaurant;
}

export interface RestaurantResult {
  restaurant_uuid: string;
  name: string;
  country_code: string;
  locales: [String];
  restaurantUuid: String;
  image_uuid: string;
  allowReview: Boolean;
  images: any;
  country: any;
}

export interface Pagination {
  total: Int;
  pageCount: Int;
  currentPage: Int;
}

export interface PaginatedResult {
  pagination: Pagination;
  restaurants: Restaurant;
}

export interface RestaurantGQL {
  restaurantUuid: String;
  name: String;
  allowReview: Boolean;
  images: [String];
  country: any;
}

export interface redisQuery {
  query: string;
  ttl: number;
}

export interface SQLQuery {
  text: string;
}
export interface ImageApiResult {
  imageUuid: text;
  url: text;
}
export interface CountResult {
  count: number;
}
