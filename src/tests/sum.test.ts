import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "..";
import clearDb from "./helpers/reset-db";

describe("POST /sum", () => {
  it("it should add two numbers", async () => {
    beforeAll(async () => {
      console.log("clearing db before running tests");
      await clearDb();
    });

    const { status, body } = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(status).toBe(200);
    expect(body).toEqual({ answer: 3, id: expect.any(Number) });
  });

  it("the post sum endpoint should fail beacuse the numbers are too big and return an error response", async () => {
    const { status, body } = await request(app).post("/sum").send({
      a: 1000001,
      b: 2000000,
    });

    expect(status).toBe(422);
    expect(body).toEqual({ message: "Sorry we dont support big numbers" });
  });
});
