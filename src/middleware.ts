import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let needsRedirect = false;
  const url = request.nextUrl.clone();

  // www normalization is handled by Vercel (301 at domain level).
  // Middleware is responsible for i18n routing only.

  // 1. /en/* → /ro/* — intentional 302 (temporary), NOT 301.
  // English locale is planned but not yet live; using 302 preserves crawl budget
  // for /en/* when it eventually launches. Do NOT change to 301.
  if (pathname.startsWith("/en/") || pathname === "/en") {
    url.pathname = "/ro" + pathname.slice(3);
    needsRedirect = true;
  }
  // 2. Missing locale prefix → add default
  else {
    const pathnameHasLocale = i18n.locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    if (!pathnameHasLocale) {
      url.pathname = `/${i18n.defaultLocale}${pathname}`;
      needsRedirect = true;
    }
  }

  if (needsRedirect) {
    const isEnLocaleRedirect = pathname.startsWith("/en/") || pathname === "/en";
    return NextResponse.redirect(url, isEnLocaleRedirect ? 302 : 301);
  }
}

export const config = {
  matcher: [
    // Skip internal paths (_next), static files, and API routes
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
