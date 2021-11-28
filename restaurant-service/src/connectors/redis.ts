import config from "config";

class Redis {
  private client: any;

  constructor(client: any) {
    this.client = client;
  }

  async getKey(key: string) {
    this.client.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );
    return await this.client.get(key);
  }

  async setKey(key: string, value: string) {
    await this.client.set(key, value);
    this.client.expire(key,config.get("redis.ttl"));
  }
}

export default Redis;
