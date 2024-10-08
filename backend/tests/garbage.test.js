import request from "supertest";
import app from "../index"; // Ensure this points to where your Express app is exported

describe("GET /api/garbage/", () => {
  it("returns the garbages created", async () => {
    const res = await request(app).get("/api/garbage/");
    expect(res.statusCode).toBe(200);
    expect(res.body); // Assuming your API returns a token
  });
});

describe("POST /api/garbage/", () => {
  it("should create a garbage request", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3Mjg0MDE3MDEsImV4cCI6MTczMDk5MzcwMX0.p0sIucJVgeOPJkoFNR-Q6Vb_-EER9UlR-3hO_fZY0SE"; // Replace with a valid JWT token
    const res = await request(app)
      .post("/api/garbage/")
      .set("Authorization", `Bearer ${token}`)
      .send({
        longitude: 79.3211,
        latitude: 6.3216,
        type: "Recyclable",
        address: "Px",
        area: "6704064d5ad2461800050f1f",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body);
  });
});
