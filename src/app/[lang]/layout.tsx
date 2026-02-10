import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { i18n, type Locale } from "@/i18n-config";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Rammer Tech | Solutii Digitale & Achizitii Publice SEAP",
  description:
    "Dezvoltam aplicatii web si mobile, sisteme enterprise si solutii SEAP/SICAP. Partenerul tau de incredere in transformarea digitala.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  // Validate the locale — return 404 for unsupported values
  if (!i18n.locales.includes(lang as Locale)) {
    notFound();
  }

  return (
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
