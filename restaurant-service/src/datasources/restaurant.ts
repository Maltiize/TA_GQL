import Postgres from "../connectors/postgres";
import FetcherAPI from "../connectors/fetcherAPI";
import sql from "../constants/sql";
import { DataSource } from "apollo-datasource";
import {
  RestaurantResult,
  redisQuery,
  Pagination,
  PaginatedResult,
  SQLQuery,
  ImageApiResult,
  CountResult,
} from "../interfaces/type";
import { AxiosResponse } from "axios";
import Redis from "../connectors/redis";
import redisQueries from "../constants/redis";
import { pageNumber, numberEl } from "../constants/default.value";
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
    perPage: number = pageNumber,
    page: number = numberEl,
    imageOnly: boolean = false
  ): Promise<PaginatedResult> {
    const redisQuery: redisQuery = redisQueries.getRestaurants;
    const redisKey: string =
      redisQueries.getRestaurants.query + `:${perPage}:${page}:${imageOnly}`;
    const cached: string = await this.redis.getKey(redisKey);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        this.redis.del(redisKey);
      }
    }
    const query: SQLQuery = imageOnly ? sql.getOnlyImg : sql.get;
    Object.assign(query, { values: [perPage, (page - 1) * perPage] });
    const result: [RestaurantResult] = await this.database.execute(query);
    const res: AxiosResponse = await this.api.getPosts();
    result.map((x: RestaurantResult) =>
      this.normalize(
        x,
        res.data.images.filter(
          (image: ImageApiResult) => image.imageUuid == x.image_uuid
        )
      )
    );
    const total: number = await this.getTotal(imageOnly);
    const pagination: Pagination = {
      total: total,
      pageCount: Math.ceil(total / perPage),
      currentPage: page,
    };
    const finalResult: PaginatedResult = {
      restaurants: result,
      pagination: pagination,
    };
    await this.redis.setKey(
      redisKey,
      JSON.stringify(finalResult),
      redisQuery.ttl
    );
    return finalResult;
  }

  private async getTotal(imageOnly: boolean = false): Promise<number> {
    const redisQuery: redisQuery = redisQueries.getRestaurantsCount;
    const redisKey: string = redisQuery.query + `:${imageOnly}`;
    const cached: number = await this.redis.getKey(redisKey);
    if (cached) {
      return cached;
    }
    const queryCount: SQLQuery = imageOnly ? sql.getOnlyImgCount : sql.getCount;
    const resultCount: [CountResult] = await this.database.execute(queryCount);
    await this.redis.setKey(
      redisKey,
      String(resultCount[0].count),
      redisQuery.ttl
    );
    return resultCount[0].count;
  }

  private normalize(data: RestaurantResult, imgs: [ImageApiResult]) {
    data.restaurantUuid = data.restaurant_uuid;
    data.country = {
      code: data.country_code,
      locales: data.locales,
    };
    data.images = imgs.map((x: ImageApiResult) => x.url);
    return data;
  }
}

export default Restaurant;
