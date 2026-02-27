import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { i18n } from "@/i18n-config";

function getLocale(request: NextRequest): string {
  try {
    const acceptLanguage = request.headers.get("accept-language");
    if (
      acceptLanguage == null ||
      typeof acceptLanguage !== "string" ||
      acceptLanguage.trim() === ""
    ) {
      return i18n.defaultLocale;
    }

    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const languages = new Negotiator({ headers }).languages();
    return match(languages, [...i18n.locales], i18n.defaultLocale);
  } catch {
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a supported locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to the detected locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths (_next), static files, and API routes
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};
