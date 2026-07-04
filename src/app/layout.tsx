import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  Inter,
  Bebas_Neue,
  Space_Grotesk,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import "@/styles/cursor.css";
import "@/styles/animations.css";
import { Providers } from "@/contexts/Providers";

// Critical layout components — imported directly
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { SkipNav } from "@/components/ui/SkipNav";

// Non-critical global components — lazy loaded, client-only
const BackgroundEffects = dynamic(
  () =>
    import("@/components/effects/BackgroundEffects").then((m) => ({
      default: m.BackgroundEffects,
    })),
  { ssr: false }
);
const CustomCursor = dynamic(
  () => import("@/components/effects/CustomCursor"),
  { ssr: false }
);
const WingmanFAB = dynamic(
  () => import("@/components/wingman/WingmanFAB"),
  { ssr: false }
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AWS Cloud Club — Global City",
  description:
    "AWS Cloud Club – STI Global City. A special-interest, non-profit student organization empowering cloud builders at STI Academic Center, Bonifacio Global City.",
  openGraph: {
    title: "AWS Cloud Club — Global City",
    description:
      "A special-interest, non-profit student organization empowering cloud builders at STI Academic Center, Bonifacio Global City.",
    siteName: "AWS Cloud Club — Global City",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AWS Cloud Club — Global City",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  metadataBase: new URL("https://awscc-global-city.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <Providers>
          {/* Skip navigation — first focusable element */}
          <SkipNav />

          {/* Global navigation */}
          <Navigation />

          {/* Background visual effects (decorative, behind content) */}
          <BackgroundEffects />

          {/* Custom cursor (desktop only) */}
          <CustomCursor />

          {/* Page content */}
          {children}

          {/* Global footer */}
          <Footer />

          {/* AI Wingman FAB (hidden on /wingman route) */}
          <WingmanFAB />
        </Providers>
      </body>
    </html>
  );
}
