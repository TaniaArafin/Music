import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-blossom-500 text-white shadow-lg shadow-blossom-500/30 hover:-translate-y-0.5 hover:bg-blossom-600 hover:shadow-xl active:translate-y-0",
  ghost: "bg-white/10 text-blossom-50 ring-1 ring-white/30 hover:bg-white/20",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold tracking-wide transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blossom-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${extra}`;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={buttonClass(variant, className)} {...props} />;
}
