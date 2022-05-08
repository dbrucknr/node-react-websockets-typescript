import request from "supertest";
import { startApplication } from "../config/app";

const server = startApplication();

describe("Test Application Status Health Check", () => {
  it("Request /health-check should return 200 Status", async () => {
    const result = await request(server).get("/health-check").send();
    expect(result.status).toBe(200);
  });
});
