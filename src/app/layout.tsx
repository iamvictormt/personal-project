import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f5f3ed",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eu-victor.vercel.app";
const title = "Victor Monteiro Torres | Software Developer";
const description =
  "Desenvolvedor de software formado em Engenharia de Software pela Universidade Evangélica de Goiás, com experiência em React, Next.js, Angular, Node.js, Java, Spring Boot, bancos de dados e sistemas web.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Victor Monteiro Torres",
  },
  description,
  applicationName: "Victor Monteiro Torres",
  authors: [{ name: "Victor Monteiro Torres" }],
  creator: "Victor Monteiro Torres",
  publisher: "Victor Monteiro Torres",
  category: "technology",
  keywords: [
    "desenvolvedor full stack",
    "software developer",
    "engenheiro de software",
    "criação de sites",
    "desenvolvimento web",
    "landing page",
    "sites profissionais",
    "sistemas web",
    "Next.js",
    "React",
    "Angular",
    "Node.js",
    "Java",
    "Spring Boot",
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
  manifest: "/manifest.json",
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Victor Monteiro Torres",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Victor Monteiro Torres - Software Developer",
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
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon1.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    title: "MyWebSite",
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
    <html lang="pt-BR" className={`${archivo.variable} ${ibmPlexSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
