import { mock } from "jest-mock-extended";
import { Pool, PoolClient } from "pg";
import Postgres from "../../connectors/postgres";

const mockPool = mock<Pool>() as any;
const mockClient = mock<PoolClient>() as any;


describe("postgres  Tests", () => {

  beforeEach(() => {
    mockPool.mockClear();
  });

  test("test postgres execute method", async () => {
    const result = { rows: [1, 2, 3] };
    const query = "select id from restaurant";
    mockPool.connect.mockReturnValue(mockClient);
    mockClient.query.calledWith(query).mockReturnValue(result);
    mockClient.release.mockImplementation(() => {});
    const postgres = new Postgres(mockPool);
    expect(await postgres.execute(query)).toBe(result.rows);
  });
});
