const request = require("supertest");
const { app, startServer, closeServer, close_db } = require("../index");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mock User model
jest.mock("../models/userModel");

describe("User Registration API", () => {
  beforeAll(() => {
    startServer();
  });

  afterAll(async () => {
    await close_db();
    closeServer();
  });

  it("should register a new user successfully", async () => {
    // ✅ Mock User.findOne to return null (user does not exist)
    User.findOne.mockResolvedValue(null);

    // ✅ Mock password hashing
    const hashedPassword = await bcrypt.hash("password123", 10);

    // ✅ Mock User.create to return the new user
    User.create.mockResolvedValue({
      _id: "67c0946689c7ae16b4d32627",
      name: "xyzxx",
      email: "xyzxx@gmail.com",
      password: hashedPassword,
      image: "test_image_data",
    });

    // ✅ Mock JWT token generation
    jwt.sign = jest.fn().mockReturnValue("mocked_token");

    // ✅ Send registration request
    const res = await request(app).post("/user/register").send({
      name: "xyzxx",
      email: "xyzxx@gmail.com",
      password: "password123",
    });

    // ✅ Verify response
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token", "mocked_token");
    expect(res.body).toHaveProperty("_id", "67c0946689c7ae16b4d32627");
    expect(res.body).toHaveProperty("name", "xyzxx");
    expect(res.body).toHaveProperty("email", "xyzxx@gmail.com");
    expect(res.body).toHaveProperty("image"); // Profile image should be included
  });
});
