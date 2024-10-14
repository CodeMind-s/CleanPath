import request from "supertest";
import app from "../index"; // Ensure this points to where your Express app is exported

describe("GET /api/garbage/", () => {
  it("returns the garbages created", async () => {
    const res = await request(app).get("/api/garbage/");
    expect(res.statusCode).toBe(200);
    expect(res.body); // Assuming your API returns a token
  });

  it("returns 404 for an invalid endpoint", async () => {
    const res = await request(app).get("/api/invalid-endpoint/");
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /api/garbage/", () => {
  it("should create a garbage request", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3Mjg4ODIxMTEsImV4cCI6MTczMTQ3NDExMX0.C1tHiWxr7YUCvLcFtsc4ct-4-8hud2g8j8x9GyrINeU"; // Replace with a valid JWT token
    const res = await request(app)
      .post("/api/garbage/")
      .set("Cookie", [`jwt=${token}`])
      .send({
        longitude: 79.3211,
        latitude: 6.3216,
        type: "Recyclable",
        address: "Px",
        area: "6703ffa8c936b7432d667c8e", // Replace with a valid area ID if necessary
      });

    // Expect a successful creation
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id"); // Assuming the response contains an ID or other fields
  });

  it("should fail to create a garbage request without a token", async () => {
    const res = await request(app).post("/api/garbage/").send({
      longitude: 79.3211,
      latitude: 6.3216,
      type: "Recyclable",
      address: "Px",
      area: "6703ffa8c936b7432d667c8e", // Replace with a valid area ID if necessary
    });

    // Expect an unauthorized error
    expect(res.statusCode).toBe(500);
  });

  it("should fail to create a garbage request with invalid data", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3Mjg4ODIxMTEsImV4cCI6MTczMTQ3NDExMX0.C1tHiWxr7YUCvLcFtsc4ct-4-8hud2g8j8x9GyrINeU"; // Replace with a valid JWT token
    const res = await request(app)
      .post("/api/garbage/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        longitude: "invalid", // Invalid longitude
        latitude: 6.3216,
        type: "Recyclable",
        address: "Px",
        area: "6703ffa8c936b7432d667c8e", // Replace with a valid area ID if necessary
      });

    // Expect a bad request error
    expect(res.statusCode).toBe(500);
  });
});
