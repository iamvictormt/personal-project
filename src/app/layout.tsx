import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f5f3ed",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victortorres.dev";
const title = "Victor Torres | Desenvolvedor Full Stack para produtos digitais";
const description =
  "Desenvolvedor full stack e engenheiro de software para criação de sites, landing pages, SaaS, sistemas web, back-end, APIs e infraestrutura escalável.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Victor Torres",
  },
  description,
  applicationName: "Victor Torres Design Studio",
  authors: [{ name: "Victor Torres" }],
  creator: "Victor Torres",
  publisher: "Victor Torres",
  category: "technology",
  keywords: [
    "desenvolvedor full stack",
    "engenheiro de software",
    "criação de sites",
    "desenvolvimento web",
    "landing page",
    "sites profissionais",
    "sistemas web",
    "Next.js",
    "React",
    "Node.js",
    "SaaS",
    "API",
    "automação",
    "infraestrutura cloud",
    "desenvolvedor freelancer",
    "consultoria em tecnologia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Victor Torres Design Studio",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Victor Torres - Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
