import bcrypt from "bcryptjs";

export async function hashPassword(value: string) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(value, salt);
}

export async function verifyPassword(value: string, hash: string) {
  return bcrypt.compare(value, hash);
}
