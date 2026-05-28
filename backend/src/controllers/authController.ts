import { ApiError } from "../middlewares/error";
import { User } from "../models/User";
import { RefreshToken } from "../models/RefreshToken";
import { hashPassword, verifyPassword } from "../utils/password";
import { addDuration } from "../utils/time";
import { env } from "../config/env";
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { randomUUID } from "crypto";

async function issueTokens(userId: string, role: "admin" | "customer") {
  const tokenId = randomUUID();
  const refreshToken = signRefreshToken({ sub: userId, tokenId });
  const tokenHash = hashToken(refreshToken);
  const expiresAt = addDuration(new Date(), env.REFRESH_EXPIRES_IN);

  await RefreshToken.create({ user: userId, tokenHash, expiresAt });

  const accessToken = signAccessToken({ sub: userId, role });
  return { accessToken, refreshToken };
}

export async function register(name: string, email: string, password: string) {
  const existing = await User.findOne({ email }).lean();
  if (existing) {
    throw new ApiError(409, "Email already in use");
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email, passwordHash, role: "customer", tier: "New" });
  return issueTokens(user._id.toString(), user.role);
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    throw new ApiError(401, "Invalid credentials");
  }

  return issueTokens(user._id.toString(), user.role);
}

export async function refresh(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const tokenHash = hashToken(refreshToken);
  const stored = await RefreshToken.findOne({ tokenHash });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
    throw new ApiError(401, "Refresh token expired");
  }

  stored.revokedAt = new Date();
  await stored.save();

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  return issueTokens(user._id.toString(), user.role);
}

export async function logout(refreshToken?: string) {
  if (!refreshToken) return;
  const tokenHash = hashToken(refreshToken);
  await RefreshToken.updateOne({ tokenHash, revokedAt: null }, { $set: { revokedAt: new Date() } });
}

export async function bootstrapAdmin(name: string, email: string, password: string) {
  const adminExists = await User.exists({ role: "admin" });
  if (adminExists) {
    throw new ApiError(409, "Admin already exists");
  }

  if (email !== env.ADMIN_BOOTSTRAP_EMAIL || password !== env.ADMIN_BOOTSTRAP_PASSWORD) {
    throw new ApiError(403, "Invalid bootstrap credentials");
  }

  const passwordHash = await hashPassword(password);
  const admin = await User.create({ name, email, passwordHash, role: "admin", tier: "VIP" });
  return issueTokens(admin._id.toString(), admin.role);
}
