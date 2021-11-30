import { AxiosStatic } from "axios";
class fetcherAPI {
  private axios: AxiosStatic;
  private url: string;

  constructor(axios: AxiosStatic, url:string) {
    this.axios = axios;
    this.url = url;
  }

  async getPosts() {
    return await this.axios.get(this.url);
  }
}
export default fetcherAPI;
