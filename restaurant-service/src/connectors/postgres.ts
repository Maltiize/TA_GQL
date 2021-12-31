import { Pool } from "pg";
import { SQLQuery } from "../interfaces/type";

class Postgres {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async execute(query: SQLQuery) {
    const client = await this.pool.connect();
    const { rows } = await client.query(query);
    client.release();
    return rows;
  }
}

export default Postgres;
