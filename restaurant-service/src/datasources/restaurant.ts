import Postgres from "../connectors/postgres";
import FetcherAPI from "../connectors/fetcherAPI";
import sql from "../constants/sql";
import config from "config";
import { DataSource } from "apollo-datasource";
import { RestaurantResult } from "../interfaces/type";
import { AxiosResponse } from "axios";

class Restaurant extends DataSource {
  private database: Postgres;
  private api: FetcherAPI;

  constructor(database: Postgres, api: FetcherAPI) {
    super();
    this.database = database;
    this.api = api;
  }

  async getAll(perPage: number = 4, page: number = 1) {
    Object.assign(sql.get, { values: [perPage, (page - 1) * perPage] });
    const result = await this.database.execute(sql.get);
    const res: AxiosResponse = await this.api.getPosts(config.get("api.url"));
    return result.map((x: RestaurantResult) =>
      this.normalize(
        x,
        res.data.images.filter(
          (image: any) => image.imageUuid == x.image_uuid
        )
      )
    );
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
