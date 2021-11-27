import Postgres from "../adapters/postgres";
import sql from "../constants/restaurant";
import { DataSource } from "apollo-datasource";

class Restaurant extends DataSource {
  private database: Postgres;

  constructor({ database }: { database: Postgres }) {
    super();
    this.database = database;
  }

  async getAll(perPage: number = 4, page: number = 1) {
    Object.assign(sql.query, { values: [perPage, (page - 1) * perPage] });
    const result = await this.database.execute(sql.query);
    result.map((x:any)=>{x.restaurantUuid = x.restaurant_uuid});
    return result;
  }
}

export default Restaurant;
