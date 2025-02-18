import { Providers } from "@/app/providers";
import { Provider } from "@/components/ui/provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Initialize the fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "900"], // Choose the weights you need
  variable: "--font-playfair", // Optional: for CSS variable usage
});

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"], // Choose the weights you need
  variable: "--font-lato", // Optional: for CSS variable usage
});

const archer = localFont({
  src: [
    {
      path: "../../public/fonts/Archer-Bold.otf",
      weight: "800",
      style: "normal",
    },
    //     {
    //       path: '../../public/fonts/Archer-BoldItal.otf',
    //       weight: '800',
    //       style: 'italic',
    //     },
    {
      path: "../../public/fonts/Archer-Book.otf",
      weight: "500",
      style: "normal",
    },
    //     {
    //       path: '../../public/fonts/Archer-BookItal.otf',
    //       weight: '500',
    //       style: 'italic',
    //     },
    {
      path: "../../public/fonts/Archer-Light.otf",
      weight: "300",
      style: "normal",
    },
    //     {
    //       path: '/fonts/Archer-LightItal.otf',
    //       weight: '300',
    //       style: 'italic',
    //     },
    {
      path: "../../public/fonts/Archer-Medium.otf",
      weight: "600",
      style: "normal",
    },
    //     {
    //       path: '../public/fonts/Archer-MediumItal.otf',
    //       weight: '600',
    //       style: 'italic',
    //     },
    {
      path: "../../public/fonts/Archer-Semibold.otf",
      weight: "700",
      style: "normal",
    },
    //     {
    //       path: '../public/fonts/Archer-SemibdItal.otf',
    //       weight: '700',
    //       style: 'italic',
    //     },
  ],
  variable: "--font-archer",
});

const gotham = localFont({
  src: [
    {
      path: "../../public/fonts/Gotham-Bold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gotham-Book.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gotham-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gotham-Medium.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-gotham",
});

const parisish = localFont({
  src: [
    {
      path: "../../public/fonts/Parisish.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-parisish",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "902",
  description: "Hyperlocal cocktails",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lato.variable} ${parisish.variable} ${archer.variable} ${gotham.variable}`}
      >
        <Providers>
          <Provider>{children}</Provider>
        </Providers>
      </body>
    </html>
  );
}
