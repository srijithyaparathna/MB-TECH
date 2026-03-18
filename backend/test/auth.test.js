const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/utils/db");
const User = require("../src/models/User");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset DB for tests
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "password123" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("userId");
  });

  it("should not allow duplicate usernames", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "password123" });

    expect(res.statusCode).toEqual(400);
  });

  it("should login a registered user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "wrongpass" });

    expect(res.statusCode).toEqual(401);
  });

  it("should not login non-existent user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "nouser", password: "password" });

    expect(res.statusCode).toEqual(401);
  });
});