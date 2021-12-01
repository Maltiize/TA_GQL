import { mock } from "jest-mock-extended";
import { apiResult,postgresResult,finalResult} from "../mockdata/mock";
import Restaurant from "../../datasources/restaurant";
import Postgres from "../../connectors/postgres";
import FetcherAPI from "../../connectors/fetcherAPI";
import Redis from "../../connectors/redis";
import sql from "../../constants/sql";
import redisQueries from "../../constants/redis";


const mockPostgres = mock<Postgres>() as any;
const mockFetcherApi = mock<FetcherAPI>() as any;
const mockRedis = mock<Redis>() as any;

describe("restaurant  Tests", () => {
  test("test restaurant getAll method no cache", async () => {
    Object.assign(sql.get, { values: [4, 0] });  
    mockRedis.getKey.mockReturnValue(null);
    mockPostgres.execute.calledWith(sql.get).mockReturnValue(postgresResult);
    mockFetcherApi.getPosts.mockReturnValue(apiResult);
    const restaurant = new Restaurant(mockPostgres, mockFetcherApi, mockRedis);
    expect(await restaurant.getAll(4,1)).toStrictEqual(finalResult);
  });

  test("test restaurant getAll method  cache", async () => {
    const redisKey = redisQueries.getRestaurants.query + ":4:1";
    mockRedis.getKey.calledWith(redisKey).mockReturnValue(JSON.stringify(finalResult));
    const restaurant = new Restaurant(mockPostgres, mockFetcherApi, mockRedis);
    expect(await restaurant.getAll(4,1)).toStrictEqual(finalResult);
  });
});
