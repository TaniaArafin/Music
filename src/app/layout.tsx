import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Music.io", template: "%s · Music.io" },
  description: "Where every emotion finds its sound. Stream, collect and share music.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
