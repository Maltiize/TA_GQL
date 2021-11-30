import { mock } from "jest-mock-extended";
import fetcherAPI from "../../connectors/fetcherAPI";
import { AxiosStatic } from "axios";

describe("Fetcher Api Tests", () => {
  test("test getPosts method", async () => {
    const mockAxios = mock<AxiosStatic>() as any;
    mockAxios.get
      .calledWith("http://image-service:3010/images")
      .mockReturnValue('{"data":"hello"}');
    const api = new fetcherAPI(mockAxios, "http://image-service:3010/images");
    expect(await api.getPosts()).toBe('{"data":"hello"}');
  });
});
