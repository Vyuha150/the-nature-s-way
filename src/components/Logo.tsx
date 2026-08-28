import brandLogo from "@/assets/brand-logo.jpg.asset.json";

interface LogoProps {
  className?: string;
  tone?: "dark" | "light" | "honey";
}

export const Logo = ({ className = "h-10 w-10" }: LogoProps) => {
  return (
    <img
      src={brandLogo.url}
      alt="The Nature's Way — Nothing Hidden"
      loading="lazy"
      className={`${className} rounded-full object-cover object-center ring-1 ring-honey/40`}
    />
  );
};
