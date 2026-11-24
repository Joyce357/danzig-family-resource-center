import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-next",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading-next",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danzig.ca"),
  title: "Danzig Family Resource Center",
  description:
    "Danzig Family Resource Center in West Hill, Scarborough. Supporting youth, families, and residents.",
  openGraph: {
    title: "Danzig Family Resource Center",
    description:
      "Danzig Family Resource Center in West Hill, Scarborough. Supporting youth, families, and residents.",
    url: "https://danzig.ca",
    siteName: "Danzig Family Resource Center",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/Bunny-and-friends.png",
        alt: "Danzig Family Resource Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danzig Family Resource Center",
    description:
      "Danzig Family Resource Center in West Hill, Scarborough. Supporting youth, families, and residents.",
    images: ["/images/Bunny-and-friends.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
