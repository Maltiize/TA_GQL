import Postgres from "../middlewares/postgres";
import sql from "../constants/restaurant";
import { DataSource } from "apollo-datasource";

class Restaurant extends DataSource {
  private database: Postgres;

  constructor({ database }: { database: Postgres }) {
    super();
    this.database = database;
  }

  async getAll(perPage: number = 4, page: number = 1) {
    Object.assign(sql.get, { values: [perPage, (page - 1) * perPage] });
    const result = await this.database.execute(sql.get);
    result.map((x: any) => this.normalize(x));
    return result;
  }

  private normalize(data: any) {
    data.restaurantUuid = data.restaurant_uuid;
    data.country = {
      code: data.country_code,
      locales: data.locales,
    };
  }
}

export default Restaurant;
