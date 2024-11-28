import type { Metadata } from "next";
import "./globals.css";
import { Baloo_2 } from 'next/font/google'

export const metadata: Metadata = {
  title: "Keven's Portfolio",
  description: "Keven Goulart",
};

const baloo = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-baloo',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${baloo.variable} relative min-h-[100vh]`}>
      <body>
        {children}
      </body>
    </html>
  );
}
