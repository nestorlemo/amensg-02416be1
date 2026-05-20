import logoLight from "@/assets/amensg/logo-light.svg";
import logoDark from "@/assets/amensg/logo-dark.svg";

export function Logo({ variant = "dark", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  // "light" = for dark backgrounds (white text). "dark" = for light backgrounds.
  const src = variant === "light" ? logoLight : logoDark;
  return <img src={src} alt="AMENSG IT Automation" className={className} />;
}
