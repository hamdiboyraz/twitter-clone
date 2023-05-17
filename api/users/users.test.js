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

describe("__________USERS__________", () => {
  describe("_____ADMIN_____", () => {
    let login;

    beforeEach(async () => {
      login = await request(app).post("/api/v1/auth/login").send(admin);
    });

    test("[1] [GET] should return all users", async () => {
      const res = await request(app)
        .get("/api/v1/users")
        .set("authorization", login.body.token);
      expect(res.status).toBe(200);
      expect(res.body["Total Users"]).toBeGreaterThan(0);
    });
    test("[2.1] [GET] should return 'User not found.'", async () => {
      const res = await request(app)
        .get("/api/v1/users/999")
        .set("authorization", login.body.token);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User is not found.");
    });
    test("[2.2] [GET] should return user", async () => {
      const res = await request(app)
        .get("/api/v1/users/1")
        .set("authorization", login.body.token);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        user_id: 1,
        username: "admin",
        email: "admin@example.com",
        password:
          "$2a$12$mzwu/hNbHKV0N1jC/p6dbeLQfBIQhP6SQK8xYnGkK5nqb5pluo/rm",
        role: "admin",
        active: 1,
      });
    });
    test("[3] [PUT] should return updated user", async () => {
      const res = await request(app)
        .put("/api/v1/users/10")
        .set("authorization", login.body.token)
        .send({ username: "deneme123" });
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        username: "deneme123",
      });
    });
    test("[4] [DEL] should return No Content", async () => {
      const res = await request(app)
        .del("/api/v1/users/10")
        .set("authorization", login.body.token);
      expect(res.status).toBe(204);
    });
    test("[5] [GET] should return all likes by User", async () => {
      const res = await request(app)
        .get("/api/v1/users/1/likes")
        .set("authorization", login.body.token);
      expect(res.status).toBe(200);
      expect(res.body[0].likes.length).toBeGreaterThan(0);
    });
  });
  describe("_____USERS_____", () => {
    let login;
    describe("____USER____", () => {
      beforeEach(async () => {
        login = await request(app).post("/api/v1/auth/login").send(createdUser);
      });

      test("[1] [GET] should return forbidden when retrieving all users without admin access", async () => {
        const res = await request(app)
          .get("/api/v1/users")
          .set("authorization", login.body.token);
        expect(res.status).toBe(403);
        expect(res.body.message).toBe("Forbidden.");
      });

      test("[2.1] [GET] should return user profile", async () => {
        const res = await request(app)
          .get("/api/v1/users/me")
          .set("authorization", login.body.token);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
          user_id: 4,
          username: "alicegreen",
          email: "alicegreen@example.com",
        });
      });

      test("[2.2] [GET] should not access profile without login", async () => {
        const res = await request(app).get("/api/v1/users/me");

        expect(res.status).toBe(401);
        expect(res.body.message).toBe("You must logged in.");
      });

      test("[3] [PUT] should return updated user profile", async () => {
        const res = await request(app)
          .put("/api/v1/users/me")
          .set("authorization", login.body.token)
          .send({ username: "deneme123", email: "deneme123@deneme.com" });
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
          username: "deneme123",
        });
      });
      test("[4] [DEL] should return No Content", async () => {
        const res = await request(app)
          .del("/api/v1/users/me")
          .set("authorization", login.body.token);
        expect(res.status).toBe(204);
      });
      test("[5.1] [GET] should return tweets by user", async () => {
        const res = await request(app)
          .get("/api/v1/users/me/tweets")
          .set("authorization", login.body.token);
        expect(res.status).toBe(200);
        expect(res.body[0].tweets.length).toBeGreaterThan(0);
      });
      test("[5.2] [GET] should return comments by user", async () => {
        const res = await request(app)
          .get("/api/v1/users/me/comments")
          .set("authorization", login.body.token);
        expect(res.status).toBe(200);
        expect(res.body[0].comments.length).toBeGreaterThan(0);
      });
      test("[5.3] [GET] should return likes by user", async () => {
        const res = await request(app)
          .get("/api/v1/users/me/likes")
          .set("authorization", login.body.token);
        expect(res.status).toBe(200);
        expect(res.body[0].likes.length).toBeGreaterThan(0);
      });
    });
  });
});
