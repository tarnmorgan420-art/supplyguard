import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SupplyGuard AI — FDA Compliance for Supplement Brands",
  description: "Rewrite your supplement copy to be FDA compliant in seconds. Plus an AI advisor that helps customers find the right products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}