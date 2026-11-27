import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

// The curved eggplant header used at the top of every page.
export function Hero({ children, tall = false }: { children?: ReactNode; tall?: boolean }) {
  return (
    <div className={`rounded-b-[300px] bg-eggplant-800 ${tall ? "pb-56" : "pb-32"}`}>
      <Navbar />
      <div className="px-4 pt-16 md:pt-20">{children}</div>
    </div>
  );
}
