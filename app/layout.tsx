import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PROFILE } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.roles[0]}`,
  description: PROFILE.tagline,
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.roles[0]}`,
    description: PROFILE.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#eaf1fa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${GeistMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
