import { Pool } from 'pg';

class Postgres {
  private pool: Pool;

  constructor(config:any) {
    this.pool = new Pool(config);
  }

  async execute(query: any) {
    const client = await this.pool.connect();
    const { rows } = await client.query(query);
    client.release();
    return rows;
  }
}

export default Postgres