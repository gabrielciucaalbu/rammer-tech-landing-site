import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
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
