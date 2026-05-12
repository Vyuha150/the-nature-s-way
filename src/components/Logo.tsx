interface LogoProps {
  className?: string;
  tone?: "dark" | "light" | "honey";
}

export const Logo = ({ className = "h-10 w-10", tone = "dark" }: LogoProps) => {
  const stroke = tone === "light" ? "hsl(var(--linen))" : tone === "honey" ? "hsl(var(--honey))" : "hsl(var(--umber))";
  return (
    <svg viewBox="0 0 64 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="The Nature's Way">
      {/* seed */}
      <circle cx="32" cy="6" r="4" fill={stroke} />
      <line x1="32" y1="10" x2="32" y2="20" stroke={stroke} strokeWidth="1.2" />
      {/* leaf */}
      <ellipse cx="32" cy="46" rx="18" ry="26" stroke={stroke} strokeWidth="1.4" />
      <line x1="32" y1="22" x2="32" y2="70" stroke={stroke} strokeWidth="1.2" />
      <line x1="16" y1="38" x2="48" y2="38" stroke={stroke} strokeWidth="1.1" />
      <line x1="14" y1="46" x2="50" y2="46" stroke={stroke} strokeWidth="1.1" />
      <line x1="16" y1="54" x2="48" y2="54" stroke={stroke} strokeWidth="1.1" />
    </svg>
  );
};
