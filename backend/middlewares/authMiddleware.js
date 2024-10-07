import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import WMA from "../models/wmaModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from 'jwt' cookie
  token = req.cookies.jwt;
  // console.log(`token from authMiddleware => `, token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const authenticateWMA = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from 'jwt' cookie
  token = req.cookies.jwt_wma;
  console.log(`token from authMiddleware => `, token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.wma = await WMA.findById(decoded.wmaId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no WMA token");
  }
});

// Check admin authentication
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as admin!!!");
  }
};

export { authenticate, authenticateWMA, authorizeAdmin };
