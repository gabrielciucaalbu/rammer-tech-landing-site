import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;

  let needsRedirect = false;
  const url = request.nextUrl.clone();

  // 1. www normalization
  if (hostname === "rammertech.ro") {
    url.hostname = "www.rammertech.ro";
    needsRedirect = true;
  }

  // 2. Legacy /en/* → /ro/*
  if (pathname.startsWith("/en/") || pathname === "/en") {
    url.pathname = "/ro" + pathname.slice(3);
    needsRedirect = true;
  }
  // 3. Missing locale prefix → add default
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
