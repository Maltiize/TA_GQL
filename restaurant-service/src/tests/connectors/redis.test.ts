import { mock } from "jest-mock-extended";
import Redis from "../../connectors/redis";

const mockRedis = mock<any>() as any;

describe("Redis Tests", () => {
  beforeEach(() => {
    mockRedis.mockClear();
  });
  test("test get method", async () => {
    mockRedis.get.calledWith("key").mockReturnValue('{"data":"hello"}');
    mockRedis.get.calledWith("badkey").mockReturnValue(null);
    const redis = new Redis(mockRedis);
    expect(await redis.getKey("key")).toBe('{"data":"hello"}');
    expect(await redis.getKey("badkey")).toBe(null);
  });

  test("test getPosts axios not working", async () => {
    mockRedis.get.mockImplementation(() => {
      throw new Error("error");
    });
    const redis = new Redis(mockRedis);
    try {
      await redis.getKey("key");
      // to make sure we never reach that one
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toStrictEqual(new Error("error"));
    }
  });
});
