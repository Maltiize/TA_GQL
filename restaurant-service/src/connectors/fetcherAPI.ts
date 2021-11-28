import axios from "axios";

class fetcherAPI {
  async getPosts(url: string) {
    return await axios.get(url);
  }
}
export default fetcherAPI;
