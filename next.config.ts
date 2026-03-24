import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // Bare English slugs (no locale prefix) → /en/<slug>.
      // These fire before middleware, preventing the middleware from prepending /ro
      // and producing a 404 (e.g. /services → /ro/services doesn't exist).
      { source: "/services",             destination: "/en/services",             permanent: true },
      { source: "/services/:path*",      destination: "/en/services/:path*",      permanent: true },
      { source: "/about",                destination: "/en/about",                permanent: true },
      { source: "/about/:path*",         destination: "/en/about/:path*",         permanent: true },
      { source: "/portfolio",            destination: "/en/portfolio",            permanent: true },
      { source: "/portfolio/:path*",     destination: "/en/portfolio/:path*",     permanent: true },
      { source: "/products",             destination: "/en/products",             permanent: true },
      { source: "/products/:path*",      destination: "/en/products/:path*",      permanent: true },
      { source: "/privacy-policy",       destination: "/en/privacy-policy",       permanent: true },
      { source: "/terms-and-conditions", destination: "/en/terms-and-conditions", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/en/services",              destination: "/en/servicii" },
      { source: "/en/services/:path*",       destination: "/en/servicii/:path*" },
      { source: "/en/about",                 destination: "/en/despre-noi" },
      { source: "/en/about/:path*",          destination: "/en/despre-noi/:path*" },
      { source: "/en/portfolio",             destination: "/en/portofoliu" },
      { source: "/en/portfolio/:path*",      destination: "/en/portofoliu/:path*" },
      { source: "/en/products",              destination: "/en/produse" },
      { source: "/en/products/:path*",       destination: "/en/produse/:path*" },
      { source: "/en/privacy-policy",        destination: "/en/politica-confidentialitate" },
      { source: "/en/terms-and-conditions",  destination: "/en/termeni-si-conditii" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
