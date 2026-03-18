const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/utils/db");
const User = require("../src/models/User");
const Task = require("../src/models/Task");

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create test user and get token
  await request(app)
    .post("/api/auth/register")
    .send({ username: "taskuser", password: "password123" });

  const res = await request(app)
    .post("/api/auth/login")
    .send({ username: "taskuser", password: "password123" });

  token = res.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Task Endpoints", () => {
  it("should add a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task 1", description: "Task Desc 1" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Test Task 1");
  });

  it("should get maximum 5 recent tasks", async () => {
    // Add 6 tasks
    for (let i = 2; i <= 6; i++) {
      await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: `Task ${i}`, description: `Desc ${i}` });
    }

    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeLessThanOrEqual(5);
    expect(res.body[0]).toHaveProperty("title", "Task 6"); // Most recent first
  });

  it("should mark a task as done", async () => {
    const tasksRes = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    const taskId = tasksRes.body[0].id;

    const res = await request(app)
      .patch(`/api/tasks/${taskId}/done`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Task completed");
  });

  it("should not return completed tasks in getTasks", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.find(t => t.title === "Task 6")).toBeUndefined();
  });
});