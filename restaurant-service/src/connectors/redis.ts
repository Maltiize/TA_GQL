class Redis {
  private client: any;
  private ttl: number;

  constructor(client: any, ttl: number) {
    this.client = client;
    this.ttl = ttl;
  }

  async getKey(key: string) {
    this.client.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );
    return await this.client.get(key);
  }

  async setKey(key: string, value: string) {
    await this.client.set(key, value);
    this.client.expire(key, this.ttl);
  }
}

export default Redis;
