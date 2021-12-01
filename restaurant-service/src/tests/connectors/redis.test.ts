import { mock } from "jest-mock-extended";
import Redis from "../../connectors/redis";

const mockRedis = mock<any>() as any;

beforeEach(() => {
  mockRedis.mockClear();
});

describe("Redis Tests", () => {
  test("test get method", async () => {
    mockRedis.get.calledWith("key").mockReturnValue('{"data":"hello"}');
    mockRedis.get.calledWith("badkey").mockReturnValue(null);
    const redis = new Redis(mockRedis, 10);
    expect(await redis.getKey("key")).toBe('{"data":"hello"}');
    expect(await redis.getKey("badkey")).toBe(null);
  });

  test("test getPosts axios not working", async () => {
    mockRedis.get.calledWith("key").mockImplementation((str: any) => {
      throw new Error(str);
    });
    const api = new Redis(mockRedis, 10);
    expect(async () => {
      await api.getKey("key");
    }).rejects.toThrow();
  });
});
