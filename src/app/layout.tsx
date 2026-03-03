import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rohitmahar.vercel.app"),
  title: "Rohit Mahar | Front-End Developer Portfolio",
  description:
    "Front-End Developer specializing in React.js, Next.js, and modern JavaScript. Building scalable, high-performance web applications with clean architecture and premium UI/UX.",
  keywords: ["Front-End Developer", "React Developer", "Next.js", "Portfolio", "Software Engineer", "Web Development", "UI/UX"],
  authors: [{ name: "Rohit Mahar" }],
  openGraph: {
    title: "Rohit Mahar | Front-End Developer Portfolio",
    description: "Front-End Developer specializing in React.js and modern JavaScript. Explore my selected works and professional experience.",
    url: "https://rohitmahar.vercel.app",
    siteName: "Rohit Mahar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rohit Mahar Front-End Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Mahar | Front-End Developer Portfolio",
    description: "Front-End Developer specializing in React.js and modern JavaScript. Explore my selected works and professional experience.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceGrotesk.variable} font-display antialiased`}>
        <ThemeProvider>
          <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="flex h-full grow flex-col">
              <Navbar />
              <div className="px-4 sm:px-10 lg:px-40 flex flex-1 justify-center py-5">
                <div className="flex flex-col w-full max-w-[1200px] flex-1">
                  {children}
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
