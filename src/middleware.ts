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

  // Vercel servește rutele fără distincție între majuscule și minuscule (/ro/Contact = /ro/contact, fără redirect);
  // Next autohostat e case-sensitive. Rescriem la varianta cu litere mici (matcher-ul sare peste fișierele cu punct).
  const lower = pathname.toLowerCase();
  if (lower !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    // Skip internal paths (_next), static files, and API routes
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
