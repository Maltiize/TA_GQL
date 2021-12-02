import { mock } from "jest-mock-extended";
import fetcherAPI from "../../connectors/fetcherAPI";
import { AxiosStatic } from "axios";

const mockAxios = mock<AxiosStatic>() as any;



describe("Fetcher Api Tests", () => {

  beforeEach(() => {
    mockAxios.mockClear();
  });

  test("test getPosts method", async () => {
    mockAxios.get
      .calledWith("http://image-service:3010/images")
      .mockReturnValue('{"data":"hello"}');
    const api = new fetcherAPI(mockAxios, "http://image-service:3010/images");
    expect(await api.getPosts()).toBe('{"data":"hello"}');
  });

  test("test getPosts axios not working", async () => {
    mockAxios.get.mockImplementation(() => {
      throw new Error("error");
    });
    const api = new fetcherAPI(mockAxios, "http://image-service:3010/images");
    try {
      await api.getPosts();
      // to make sure we never reach that one
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toStrictEqual(new Error("error"));
    }
  });
});
