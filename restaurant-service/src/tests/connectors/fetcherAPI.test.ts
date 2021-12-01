import { mock } from "jest-mock-extended";
import fetcherAPI from "../../connectors/fetcherAPI";
import { AxiosStatic } from "axios";

const mockAxios = mock<AxiosStatic>() as any;

beforeEach(() => {
  mockAxios.mockClear();
});

describe("Fetcher Api Tests", () => {
  test("test getPosts method", async () => {
    mockAxios.get
      .calledWith("http://image-service:3010/images")
      .mockReturnValue('{"data":"hello"}');
    const api = new fetcherAPI(mockAxios, "http://image-service:3010/images");
    expect(await api.getPosts()).toBe('{"data":"hello"}');
  });

  test("test getPosts axios not working", async () => {
    mockAxios.get
      .calledWith("http://image-service:3010/images")
      .mockImplementation(() => {
        throw new Error("error");
      });
    const api = new fetcherAPI(mockAxios, "http://image-service:3010/images");
    expect(async () => {
      await api.getPosts();
    }).rejects.toThrow();
  });
});
