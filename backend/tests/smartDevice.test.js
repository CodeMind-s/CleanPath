import request from "supertest";
import app from "../index";

describe("GET /api/smartDevices/", () => {
  it("returns all smart devices (Admin only)", async () => {
    const adminToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzOTY4N2Y2MjNjZWY2NjNhNTJhN2EiLCJpYXQiOjE3MjkzMzEyMTYsImV4cCI6MTczMTkyMzIxNn0.JeANfjN3C_r6CdbPYvslbYKUJZBciTGRD0EuGKWhH_U"; //Admin JWT token
    const res = await request(app)
      .get("/api/smartDevices/")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // Expecting an array of devices
  });

  it("returns 403 for non-admin users", async () => {
    const userToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3MjkzMzEzOTAsImV4cCI6MTczMTkyMzM5MH0.Z2WbBh7a5vV1gl19R2sqjOR4wsK7d0xt5Un8H2LtMZw"; // user JWT token
    const res = await request(app)
      .get("/api/smartDevices/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
  });

  it("returns 404 for an invalid endpoint", async () => {
    const res = await request(app).get("/api/invalid-endpoint/");
    expect(res.statusCode).toBe(404);
  });
});

// describe("POST /api/smartDevices/", () => {
//   it("should create a smart device", async () => {
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3MjkzMzEzOTAsImV4cCI6MTczMTkyMzM5MH0.Z2WbBh7a5vV1gl19R2sqjOR4wsK7d0xt5Un8H2LtMZw"; // Replace with a valid JWT token
//     const res = await request(app)
//       .post("/api/smartDevices/")
//       .set("Cookie", [`jwt=${token}`])
//       .send({
//         longitude: 79.3211,
//         latitude: 6.3216,
//         type: "Recyclable",
//         area: "6703ffa8c936b7432d667c8e", // Replace with a valid area ID if necessary
//       });

//     // Expect a successful creation
//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty("_id"); // Assuming the response contains an ID or other fields
//   });

//   it("should fail to create a smart device without a token", async () => {
//     const res = await request(app).post("/api/smartDevices/").send({
//       longitude: 79.3211,
//       latitude: 6.3216,
//       type: "Recyclable",
//       area: "6703ffa8c936b7432d667c8e", // Replace with a valid area ID if necessary
//     });

//     // Expect an unauthorized error
//     expect(res.statusCode).toBe(401);
//   });

//   it("should fail to create a smart device with invalid data", async () => {
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3MjkzMzEzOTAsImV4cCI6MTczMTkyMzM5MH0.Z2WbBh7a5vV1gl19R2sqjOR4wsK7d0xt5Un8H2LtMZw"; // Replace with a valid JWT token
//     const res = await request(app)
//       .post("/api/smartDevices/")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         longitude: "invalid", // Invalid longitude
//         latitude: 6.3216,
//         type: "Recyclable",
//         area: "6703ffa8c936b7432d667c8e", // Replace with a valid area ID if necessary
//       });

//     // Expect a bad request error
//     expect(res.statusCode).toBe(400);
//   });
// });

// describe("GET /api/smartDevices/:id", () => {
//   it("should return a single smart device by ID", async () => {
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3MjkzMzEzOTAsImV4cCI6MTczMTkyMzM5MH0.Z2WbBh7a5vV1gl19R2sqjOR4wsK7d0xt5Un8H2LtMZw"; // Replace with a valid user JWT token
//     const deviceId = "67136ce71f366a41fa984a9e"; // Replace with a valid device ID
//     const res = await request(app)
//       .get(`/api/smartDevices/${deviceId}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("_id", deviceId);
//   });

//   it("should return 404 for a non-existing device ID", async () => {
//     const token =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3MjkzMzEzOTAsImV4cCI6MTczMTkyMzM5MH0.Z2WbBh7a5vV1gl19R2sqjOR4wsK7d0xt5Un8H2LtMZw"; // Replace with a valid user JWT token
//     const res = await request(app)
//       .get("/api/smartDevices/invalidDeviceId")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(404);
//   });
// });

// describe("PUT /api/smartDevices/:id", () => {
//   it("should update a smart device's details (Admin only)", async () => {
//     const adminToken = "your-admin-jwt-token"; // Replace with a valid admin JWT token
//     const deviceId = "67136ce71f366a41fa984a9e"; // Replace with a valid device ID
//     const res = await request(app)
//       .put(`/api/smartDevices/${deviceId}`)
//       .set("Authorization", `Bearer ${adminToken}`)
//       .send({
//         status: "Active",
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("status", "Active");
//   });

//   it("should return 403 for non-admin users trying to update a device", async () => {
//     const userToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3MjkzMzEzOTAsImV4cCI6MTczMTkyMzM5MH0.Z2WbBh7a5vV1gl19R2sqjOR4wsK7d0xt5Un8H2LtMZw"; // Replace with a valid user JWT token
//     const deviceId = "67136ce71f366a41fa984a9e"; // Replace with a valid device ID
//     const res = await request(app)
//       .put(`/api/smartDevices/${deviceId}`)
//       .set("Authorization", `Bearer ${userToken}`)
//       .send({
//         status: "Inactive",
//       });

//     expect(res.statusCode).toBe(403);
//   });
// });

// describe("DELETE /api/smartDevices/:id", () => {
//   it("should delete a smart device (Admin only)", async () => {
//     const adminToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzOTY4N2Y2MjNjZWY2NjNhNTJhN2EiLCJpYXQiOjE3MjkzMzEyMTYsImV4cCI6MTczMTkyMzIxNn0.JeANfjN3C_r6CdbPYvslbYKUJZBciTGRD0EuGKWhH_U"; // Replace with a valid admin JWT token
//     const deviceId = "67136ce71f366a41fa984a9e"; // Replace with a valid device ID
//     const res = await request(app)
//       .delete(`/api/smartDevices/${deviceId}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe("Smart device removed successfully!");
//   });

//   it("should return 403 for non-admin users trying to delete a device", async () => {
//     const userToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzZjY0ZWMxMjRiMTAwNmQxNmRkZjQiLCJpYXQiOjE3MjkzMzEzOTAsImV4cCI6MTczMTkyMzM5MH0.Z2WbBh7a5vV1gl19R2sqjOR4wsK7d0xt5Un8H2LtMZw"; // Replace with a valid user JWT token
//     const deviceId = "67136ce71f366a41fa984a9e"; // Replace with a valid device ID
//     const res = await request(app)
//       .delete(`/api/smartDevices/${deviceId}`)
//       .set("Authorization", `Bearer ${userToken}`);

//     expect(res.statusCode).toBe(403);
//   });

//   it("should return 404 for a non-existing device ID", async () => {
//     const adminToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzAzOTY4N2Y2MjNjZWY2NjNhNTJhN2EiLCJpYXQiOjE3MjkzMzEyMTYsImV4cCI6MTczMTkyMzIxNn0.JeANfjN3C_r6CdbPYvslbYKUJZBciTGRD0EuGKWhH_U"; // Replace with a valid admin JWT token
//     const res = await request(app)
//       .delete("/api/smartDevices/invalidDeviceId")
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(404);
//   });
// });
