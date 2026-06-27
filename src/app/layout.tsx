import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CookieBanner } from "@/components/ui/CookieBanner";
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
  title: "ATELIER",
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
          <TopBar />
          <Header />
          <Breadcrumbs />
          {children}
          <CookieBanner />
        </QueryProvider>
      </body>
    </html>
  );
}
