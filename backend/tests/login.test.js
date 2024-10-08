import request from "supertest";
import app from "../index"; // Ensure this points to where your Express app is exported

describe("POST /api/users/auth", () => {
  it("should log in a user with correct credentials", async () => {
    const res = await request(app).post("/api/users/auth").send({
      email: "arsh@gmail.com",
      password: "arsh123",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token"); // Assuming your API returns a token
  });

  it("should return error with incorrect credentials", async () => {
    const res = await request(app).post("/api/users/auth").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(500); // Assuming 500 for Unauthorized
    expect(res.body).toHaveProperty("message");
  });
});
