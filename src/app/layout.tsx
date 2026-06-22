import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Header from "@/components/layout/Header";
import QueryProvider from "@/components/providers/QueryProvider";
import "./globals.css";

const CormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

const JostSans = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Store",
  description: "Luxury shoe store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${CormorantGaramond.variable} ${JostSans.variable} h-full antialiased`}
    >
      <body>
        <QueryProvider>
          <div className="absolute top-0 left-0 w-full z-50">
            <Header />
          </div>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
