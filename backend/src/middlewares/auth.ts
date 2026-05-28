import { NextFunction, Request, Response } from "express";
import { ApiError } from "./error";
import { verifyAccessToken } from "../utils/jwt";
import { User } from "../models/User";

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    next(new ApiError(401, "Missing bearer token"));
    return;
  }

  const token = auth.slice("Bearer ".length).trim();
  const payload = verifyAccessToken(token);
  if (!payload) {
    next(new ApiError(401, "Invalid token"));
    return;
  }

  const user = await User.findById(payload.sub).lean();
  if (!user) {
    next(new ApiError(401, "User not found"));
    return;
  }

  req.user = { id: user._id.toString(), role: user.role, email: user.email };
  next();
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    next(new ApiError(403, "Admin access required"));
    return;
  }
  next();
}
