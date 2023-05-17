const request = require("supertest");
const db = require("../../data/db-config");
const app = require("../server");

const createdUser = {
  username: "alicegreen",
  password: "pass1234",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("__________TWEETS__________", () => {
  let login;
  describe("Tweets", () => {
    beforeEach(async () => {
      login = await request(app).post("/api/v1/auth/login").send(createdUser);
    });
    test("[1] [GET] should return all tweets", async () => {
      const res = await request(app)
        .get("/api/v1/tweets")
        .set("authorization", login.body.token);
      expect(res.status).toBe(200);
      expect(res.body["Total Tweets"]).toBeGreaterThan(0);
    });
    test("[2.1] [GET] should return tweet", async () => {
      const res = await request(app)
        .get("/api/v1/tweets/1")
        .set("authorization", login.body.token);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ tweet: "This is my first tweet" });
    });
    test("[2.2] [GET] should return 'Tweet is not found.'", async () => {
      const res = await request(app)
        .get("/api/v1/tweets/99")
        .set("authorization", login.body.token);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Tweet is not found.");
    });
    test("[3] [POST] should return new tweet", async () => {
      const res = await request(app)
        .post("/api/v1/tweets/")
        .set("authorization", login.body.token)
        .send({
          tweet: "new tweet",
        });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ tweet: "new tweet" });
      expect(res.body).toHaveProperty("tweet_id", "tweet", "user_id");
    });
    test("[4] [PUT] should return updated tweet", async () => {
      const res = await request(app)
        .put("/api/v1/tweets/1")
        .set("authorization", login.body.token)
        .send({
          tweet: "updated tweet",
        });
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ tweet: "updated tweet" });
      expect(res.body).toHaveProperty("tweet_id", "tweet", "user_id");
    });
    test("[5] [DEL] should return No Content", async () => {
      const res = await request(app)
        .del("/api/v1/tweets/1")
        .set("authorization", login.body.token);

      expect(res.status).toBe(204);
    });
  });
});
