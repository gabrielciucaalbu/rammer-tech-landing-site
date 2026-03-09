import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old /en/* URLs to /ro/* (site is Romanian-only)
  if (pathname.startsWith("/en/") || pathname === "/en") {
    const newPath = "/ro" + pathname.slice(3);
    request.nextUrl.pathname = newPath;
    return NextResponse.redirect(request.nextUrl, 301);
  }

  // Check if the pathname already starts with a supported locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to default locale — swap with getLocale(request) when adding more locales
  request.nextUrl.pathname = `/${i18n.defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths (_next), static files, and API routes
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
