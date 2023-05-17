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

describe("__________COMMENTS__________", () => {
  let login;
  describe("Comments", () => {
    beforeEach(async () => {
      login = await request(app).post("/api/v1/auth/login").send(createdUser);
    });
    test("[1] [GET] should return all comments", async () => {
      const res = await request(app)
        .get("/api/v1/comments")
        .set("authorization", login.body.token);
      expect(res.status).toBe(200);
      expect(res.body["Total Comments"]).toBeGreaterThan(0);
    });
    test("[2.1] [GET] should return comment", async () => {
      const res = await request(app)
        .get("/api/v1/comments/1")
        .set("authorization", login.body.token);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        comment: "Great post, thanks for sharing!",
      });
    });
    test("[2.2] [GET] should return 'Comment is not found.'", async () => {
      const res = await request(app)
        .get("/api/v1/comments/99")
        .set("authorization", login.body.token);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Comment is not found.");
    });
    test("[3] [POST] should return new comment", async () => {
      const res = await request(app)
        .post("/api/v1/comments/")
        .set("authorization", login.body.token)
        .send({
          tweet_id: 2,
          comment: "new comment",
        });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ comment: "new comment" });
      expect(res.body).toHaveProperty(
        "comment_id",
        "comment",
        "tweet_id",
        "user_id"
      );
    });
    test("[4] [PUT] should return updated comment", async () => {
      const res = await request(app)
        .put("/api/v1/comments/1")
        .set("authorization", login.body.token)
        .send({
          comment: "updated comment",
        });
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ comment: "updated comment" });
      expect(res.body).toHaveProperty(
        "comment_id",
        "comment",
        "tweet_id",
        "user_id"
      );
    });
    test("[5] [DEL] should return No Content", async () => {
      const res = await request(app)
        .del("/api/v1/comments/1")
        .set("authorization", login.body.token);
      expect(res.status).toBe(204);
    });
  });
});
