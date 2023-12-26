import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import { exo2 } from "@/utils/fonts";
import "./globals.css";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Handwritten Equation Solver",
  description:
    "Empower your math journey with our equation solver – effortlessly upload or type your problem and discover instant solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={exo2.className}>{children}</body>
    </html>
  );
}
