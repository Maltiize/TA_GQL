import { mock } from "jest-mock-extended";
import { Pool, PoolClient } from "pg";
import Postgres from "../../connectors/postgres";

const mockPool = mock<Pool>() as any;
const mockClient = mock<PoolClient>() as any;

afterEach(() => {
  jest.resetAllMocks();
});

describe("postgres  Tests", () => {
  test("test postgres execute method", async () => {
    const result = { rows: [1, 2, 3] };
    const query = { text: "select id from restaurant" };
    mockPool.connect.mockReturnValue(mockClient);
    mockClient.query.calledWith(query).mockReturnValue(result);
    mockClient.release.mockImplementation(() => {});
    const postgres = new Postgres(mockPool);
    expect(await postgres.execute(query)).toBe(result.rows);
  });
});
