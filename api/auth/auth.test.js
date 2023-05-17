const request = require("supertest");
const db = require("../../data/db-config");
const app = require("../server");

const newUser = {
  username: "testuser",
  password: "12345678",
  passwordConfirm: "12345678",
  email: "testuser@deneme.com",
};

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

describe("Sanity Test", () => {
  test("Sanity check", () => {
    expect(true).toBe(true);
  });

  test("Check environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("__________AUTH__________", () => {
  describe("_____REGISTER_____", () => {
    test("[1] [POST] should register a new user successfully", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(newUser);
      expect(res.status).toBe(201);
      expect(res.body.message).toMatch(/Registered Successfully/);
    });
    test("[2.1] [POST] should return an error if username is too short", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({ ...newUser, username: "test" });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(
        /Username must be between 6 and 20 characters long/
      );
    });
    test("[2.2] [POST] should return an error if username is too long", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({ ...newUser, username: "testtesttesttesttest1" });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(
        /Username must be between 6 and 20 characters long/
      );
    });
    test("[2.3] [POST] should return an error if password is too short", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({ ...newUser, password: "1234567" });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(
        /Password must be between 8 and 50 characters long/
      );
    });
    test("[2.4] [POST] should return an error if password is too long", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({
          ...newUser,
          password: "012345678901234567890123456789012345678901234567890",
        });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(
        /Password must be between 8 and 50 characters long/
      );
    });
    test("[2.5] [POST] should return an error if username already exists", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({
          ...newUser,
          username: "alicegreen",
        });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Username already exists/);
    });
    test("[2.6] [POST] should return an error if passwords don't match", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({
          ...newUser,
          password: "test1234",
          passwordConfirm: "test123",
        });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Passwords do not match!/);
    });
  });

  describe("_____LOGIN_____", () => {
    test("[3.1] [POST] should return an error if username is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ password: "12345678" });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Username and password are required");
    });
    test("[3.2] [POST] should return an error if password is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ username: "testuser123" });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Username and password are required");
    });

    test("[3.3] [POST] should return an error if username or password is incorrect", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ ...createdUser, password: "12345" });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid username or password");
    });
    test("[3.4] [POST] should return an error if username or password is incorrect", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ ...createdUser, username: "alice" });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid username or password");
    });

    test("[3.5] [POST] should login user successfully", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send(createdUser);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe(`${createdUser.username} is back!`);
      expect(res.body.token).toBeTruthy();
    });
  });

  describe("_____LOGOUT_____", () => {
    test("[4] [GET] should logout user successfully", async () => {
      await request(app).post("/api/v1/auth/login").send(createdUser);
      const res = await request(app).get("/api/v1/auth/logout").send();
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Successfully logged out.");
    });
  });
});
