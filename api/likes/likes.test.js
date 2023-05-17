const request = require("supertest");
const db = require("../../data/db-config");
const app = require("../server");

const createdUser = {
  username: "alicegreen",
  password: "pass1234",
};

const admin = {
  username: "admin",
  password: "pass1234",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("__________LIKES__________", () => {
  test("[1.1] [GET] should return all likes", async () => {
    const login = await request(app).post("/api/v1/auth/login").send(admin);
    const res = await request(app)
      .get("/api/v1/likes")
      .set("authorization", login.body.token);
    expect(res.status).toBe(200);
    expect(res.body["Total Likes"]).toBeGreaterThan(0);
  });
  test("[1.2] [GET] should return forbidden when retrieving all likes without admin access", async () => {
    const login = await request(app)
      .post("/api/v1/auth/login")
      .send(createdUser);
    const res = await request(app)
      .get("/api/v1/likes")
      .set("authorization", login.body.token);
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Forbidden.");
  });
  test("[2] [POST] should post new like", async () => {
    const login = await request(app)
      .post("/api/v1/auth/login")
      .send(createdUser);
    const res = await request(app)
      .post("/api/v1/likes")
      .set("authorization", login.body.token);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ isLiked: 1 });
    expect(res.body).toHaveProperty(
      "like_id",
      "isLiked",
      "user_id",
      "user_id",
      "tweet_id"
    );
  });
  test("[3] [GET] should update like", async () => {
    const login = await request(app)
      .post("/api/v1/auth/login")
      .send(createdUser);
    const res1 = await request(app)
      .get("/api/v1/likes/1")
      .set("authorization", login.body.token);

    const expectedValue = (res1.body.isLiked = 0 ? 0 : 1);

    const res2 = await request(app)
      .get("/api/v1/likes/1")
      .set("authorization", login.body.token);
    expect(res2.status).toBe(200);
    expect(res2.body).toMatchObject({ isLiked: expectedValue });
  });
});
