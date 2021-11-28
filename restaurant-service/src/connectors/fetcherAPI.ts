import { AxiosStatic } from "axios";
import config from "config";

class fetcherAPI {
  private axios: AxiosStatic;

  constructor(axios: AxiosStatic) {
    this.axios = axios;
  }

  async getPosts() {
    return await this.axios.get(config.get("api.url"));
  }
}
export default fetcherAPI;
