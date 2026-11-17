import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // www normalization is handled by Vercel (301 at domain level).
  // Middleware is responsible for i18n routing only.

  const pathnameHasLocale = i18n.locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${i18n.defaultLocale}${pathname}`;
    return NextResponse.redirect(url, 301);
  }

  // Vercel potrivește fără distincție de majuscule segmentele statice ale rutei (/ro/Contact = /ro/contact, fără redirect),
  // dar nu și parametrul dinamic (slug-ul din /ro/blog/<slug> rămâne exact: cu majuscule dă 404 pe Vercel).
  // Next autohostat e case-sensitive peste tot, deci punem litere mici doar pe primele două segmente (limbă și secțiune).
  // Matcher-ul sare peste fișierele cu punct.
  const folded = pathname
    .split("/")
    .map((segment, index) => (index <= 2 ? segment.toLowerCase() : segment))
    .join("/");
  if (folded !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = folded;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    // Skip internal paths (_next), static files, and API routes
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
