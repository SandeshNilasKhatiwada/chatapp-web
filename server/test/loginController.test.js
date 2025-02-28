const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { app, startServer, closeServer, close_db } = require("../index");
const User = require("../Models/userModel");

// ✅ Mock User Model
jest.mock("../models/userModel");

describe("User Login API (Using Name and Password)", () => {
  beforeAll(() => {
    startServer(); // Start server before running tests
  });

  afterAll(async () => {
    await close_db();
    await closeServer(); // Close the server after tests finish
  });

  // ✅ 1. Successful Login Using Name and Password
  it("should login successfully with valid name and password", async () => {
    const mockUser = {
      _id: "67b98654a2d6daa8af1bc8f5",
      name: "ksandresh1",
      email: "ksandresh1@gmail.com",
      password: await bcrypt.hash("sandesh1", 10),
      image: null,
    };

    User.findOne.mockResolvedValue(mockUser); // Simulate finding the user in the database
    bcrypt.compare = jest.fn().mockResolvedValue(true); // Simulate correct password match
    jwt.sign = jest.fn().mockReturnValue("mocked_token"); // Simulate JWT token generation

    const res = await request(app)
      .post("/user/login")
      .send({ name: "ksandresh1", password: "sandesh1" }); // Use name instead of email

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id", "67b98654a2d6daa8af1bc8f5");
    expect(res.body).toHaveProperty("name", "ksandresh1");
    expect(res.body).toHaveProperty("email", "ksandresh1@gmail.com");
    expect(res.body).toHaveProperty("token", "mocked_token");
  });

  // ✅ 2. Login Failure (Incorrect Password)
  it("should return 401 for incorrect password", async () => {
    const mockUser = {
      _id: "67b98654a2d6daa8af1bc8f5",
      name: "ksandresh1",
      password: await bcrypt.hash("sandesh1", 10),
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(false); // Wrong password

    const res = await request(app)
      .post("/user/login")
      .send({ name: "ksandresh1", password: "wrongpassword" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid username and password");
  });

  // ✅ 3. Login Failure (Non-existent User)
  it("should return 401 for non-existent user", async () => {
    User.findOne.mockResolvedValue(null); // No user found

    const res = await request(app)
      .post("/user/login")
      .send({ name: "doesnotexist", password: "password123" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid username and password");
  });

  // ✅ 4. Login Failure (Missing Name or Password)
  it("should return 400 when name is missing", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({ password: "sandesh1" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Please provide name and password");
  });

  it("should return 400 when password is missing", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({ name: "ksandresh1" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Please provide name and password");
  });

  // ✅ 5. Server Error Handling
  it("should return 500 when the database throws an error", async () => {
    User.findOne.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/user/login")
      .send({ name: "ksandresh1", password: "sandesh1" });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Server error");
  });
});
