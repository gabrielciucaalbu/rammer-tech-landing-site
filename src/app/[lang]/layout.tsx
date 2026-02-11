import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Rammer Tech | Solutii Digitale pentru Afaceri",
    template: "%s | Rammer Tech",
  },
  description:
    "Dezvoltam aplicatii web si mobile, sisteme enterprise si solutii software personalizate. Partenerul tau de incredere in transformarea digitala.",
  appleWebApp: {
    title: "Rammer Tech",
  },
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

  if (!i18n.locales.includes(lang as Locale)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Header lang={lang} dict={dict} />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer lang={lang} dict={dict} />
        <CookieBanner lang={lang} dict={dict} />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
