import Postgres from "../connectors/postgres";
import FetcherAPI from "../connectors/fetcherAPI";
import sql from "../constants/sql";
import { DataSource } from "apollo-datasource";
import {
  RestaurantResult,
  redisQuery,
  Pagination,
  PaginatedResult,
} from "../interfaces/type";
import { AxiosResponse } from "axios";
import Redis from "../connectors/redis";
import redisQueries from "../constants/redis";
class Restaurant extends DataSource {
  private database: Postgres;
  private api: FetcherAPI;
  private redis: Redis;

  constructor(database: Postgres, api: FetcherAPI, redis: Redis) {
    super();
    this.database = database;
    this.api = api;
    this.redis = redis;
  }

  async getAll(
    perPage: number = 4,
    page: number = 1,
    imageOnly: boolean = false
  ) : Promise<PaginatedResult>{
    const redisQuery: redisQuery = redisQueries.getRestaurants;
    const redisKey =
      redisQueries.getRestaurants.query + `:${perPage}:${page}:${imageOnly}`;
    const cached = await this.redis.getKey(redisKey);
    if (cached) {
      return JSON.parse(cached);
    }
    const query = imageOnly ? sql.getOnlyImg : sql.get;
    Object.assign(query, { values: [perPage, (page - 1) * perPage] });
    const result = await this.database.execute(query);
    const res: AxiosResponse = await this.api.getPosts();
    result.map((x: RestaurantResult) =>
      this.normalize(
        x,
        res.data.images.filter((image: any) => image.imageUuid == x.image_uuid)
      )
    );
    const finalResult: PaginatedResult = {
      restaurants: result,
      pagination: await this.getPagination(perPage, page, imageOnly),
    };
    await this.redis.setKey(
      redisKey,
      JSON.stringify(finalResult),
      redisQuery.ttl
    );
    return finalResult;
  }

  private async getPagination(
    perPage: number,
    page: number,
    imageOnly: boolean = false
  ): Promise<Pagination> {
    const redisQuery = redisQueries.getRestaurantsCount;
    const redisKey = redisQuery.query + `:${imageOnly}`;
    const cached = await this.redis.getKey(redisKey);
    if (cached) {
      return JSON.parse(cached);
    }
    const queryCount = imageOnly ? sql.getOnlyImgCount : sql.getCount;
    const resultCount = await this.database.execute(queryCount);
    const pagination: Pagination = {
      total: resultCount[0].count,
      pageCount: Math.ceil(resultCount[0].count / perPage),
      currentPage: page,
    };
    await this.redis.setKey(
      redisKey,
      JSON.stringify(pagination),
      redisQuery.ttl
    );
    return pagination;
  }

  private normalize(data: RestaurantResult, imgs: any) {
    data.restaurantUuid = data.restaurant_uuid;
    data.country = {
      code: data.country_code,
      locales: data.locales,
    };
    data.images = imgs.map((x: any) => x.url);
    return data;
  }
}

export default Restaurant;
