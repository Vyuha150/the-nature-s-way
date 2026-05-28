export function parseDurationToMs(value: string) {
  const match = /^([0-9]+)([smhd])$/.exec(value.trim());
  if (!match) {
    throw new Error(`Invalid duration: ${value}`);
  }
  const amount = Number(match[1]);
  const unit = match[2];
  if (unit === "s") return amount * 1000;
  if (unit === "m") return amount * 60 * 1000;
  if (unit === "h") return amount * 60 * 60 * 1000;
  return amount * 24 * 60 * 60 * 1000;
}

export function addDuration(date: Date, duration: string) {
  return new Date(date.getTime() + parseDurationToMs(duration));
}
