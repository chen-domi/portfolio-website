import type { Metadata } from "next";
import { Source_Serif_4, Courier_Prime } from "next/font/google";
import { basePath } from "@/lib/basePath";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dominic Chen — Working Notes",
  description:
    "Notes on pricing, code, and the long approach to quant development.",
  icons: {
    icon: [
      { url: `${basePath}/dc-logo-favicon.ico` },
      { url: `${basePath}/dc-logo-favicon.png`, type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${courierPrime.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
