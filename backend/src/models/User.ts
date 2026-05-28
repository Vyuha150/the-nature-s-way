import mongoose, { Schema } from "mongoose";

export type UserRole = "admin" | "customer";
export type UserTier = "VIP" | "Returning" | "New";

export interface UserDoc {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  tier: UserTier;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], required: true },
    tier: { type: String, enum: ["VIP", "Returning", "New"], required: true, default: "New" },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model<UserDoc>("User", userSchema);
