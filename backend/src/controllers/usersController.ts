import { ApiError } from "../middlewares/error";
import { User } from "../models/User";

export async function getMe(userId: string) {
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    tier: user.tier,
    createdAt: user.createdAt,
  };
}
