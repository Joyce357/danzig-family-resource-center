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

const SITE_URL = "https://danzig.ca";
const SITE_NAME = "Danzig Family Resource Center";
const HOME_TITLE =
  "Danzig Family Resource Center | Community Programs in Scarborough";
const HOME_DESCRIPTION =
  "Danzig Family Resource Center supports families, youth, children, and residents in the Danzig and West Hill community through youth programs, breakfast programs, recreation, community events, and family support.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/Bunny-and-friends.png",
        width: 1280,
        height: 1600,
        alt: "Danzig Family Resource Center community leaders and residents in West Hill, Scarborough",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/Bunny-and-friends.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/danzig-logo.jpeg`,
      email: "danzig.cdp@gmail.com",
      description: HOME_DESCRIPTION,
      areaServed: {
        "@type": "Place",
        name: "West Hill, Scarborough, Ontario, Canada",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
