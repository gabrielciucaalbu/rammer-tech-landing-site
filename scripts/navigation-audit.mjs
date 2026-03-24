/**
 * Navigation Redirect Audit
 *
 * Crawls every navigational link on the Rammer Tech website and records
 * the full HTTP redirect chain for each link. Produces a Markdown report
 * suitable for Google redirect validation.
 *
 * Usage:
 *   node scripts/navigation-audit.mjs [--base http://localhost:4000]
 *
 * Output:
 *   docs/navigation-redirect-audit.md
 */

import http from "http";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const BASE_URL = process.argv.find((a) => a.startsWith("--base="))?.split("=")[1]
  ?? "http://localhost:4000";

const MAX_REDIRECTS = 10;

// ---------------------------------------------------------------------------
// All navigational links derived from the codebase
// ---------------------------------------------------------------------------
// Each entry: { context, from, to }
//   context  – human-readable label (where this link appears in the UI)
//   from     – the URL a visitor is *on* when they click (not checked for redirects, informational)
//   to       – the href being navigated to (this IS checked for redirects)

const NAV_LINKS = [
  // ─── Middleware / bare paths ───────────────────────────────────────────────
  { context: "Middleware – bare root",       from: "/",            to: "/" },
  { context: "Middleware – bare /servicii",  from: "/",            to: "/servicii" },
  { context: "Middleware – bare /services",  from: "/",            to: "/services" },
  { context: "Middleware – bare /about",     from: "/",            to: "/about" },
  { context: "Middleware – bare /blog",      from: "/",            to: "/blog" },
  { context: "Middleware – bare /contact",   from: "/",            to: "/contact" },
  { context: "Middleware – bare /products",  from: "/",            to: "/products" },
  { context: "Middleware – bare /portfolio", from: "/",            to: "/portfolio" },

  // ─── Header – RO locale ───────────────────────────────────────────────────
  { context: "Header RO – Logo / Home",      from: "/ro",          to: "/ro" },
  { context: "Header RO – Servicii",         from: "/ro",          to: "/ro/servicii" },
  { context: "Header RO – Despre Noi",       from: "/ro",          to: "/ro/despre-noi" },
  { context: "Header RO – Produse",          from: "/ro",          to: "/ro/produse" },
  { context: "Header RO – Blog",             from: "/ro",          to: "/ro/blog" },
  { context: "Header RO – Contact CTA",      from: "/ro",          to: "/ro/contact" },

  // ─── Header – EN locale ───────────────────────────────────────────────────
  { context: "Header EN – Logo / Home",      from: "/en",          to: "/en" },
  { context: "Header EN – Services",         from: "/en",          to: "/en/services" },
  { context: "Header EN – About",            from: "/en",          to: "/en/about" },
  { context: "Header EN – Products",         from: "/en",          to: "/en/products" },
  { context: "Header EN – Blog",             from: "/en",          to: "/en/blog" },
  { context: "Header EN – Contact CTA",      from: "/en",          to: "/en/contact" },

  // ─── Footer columns – RO locale (footer uses `/${lang}${href}`) ───────────
  { context: "Footer RO – Despre Noi",       from: "/ro",          to: "/ro/despre-noi" },
  { context: "Footer RO – Echipa anchor",    from: "/ro",          to: "/ro/despre-noi#echipa" },
  { context: "Footer RO – Cariere (stub #)", from: "/ro",          to: "#", stubOnly: true },
  { context: "Footer RO – Web & Mobile",     from: "/ro",          to: "/ro/servicii" },
  { context: "Footer RO – Solutii Enterprise", from: "/ro",        to: "/ro/servicii" },
  { context: "Footer RO – Consultanta IT",   from: "/ro",          to: "/ro/servicii" },
  { context: "Footer RO – Blog",             from: "/ro",          to: "/ro/blog" },
  { context: "Footer RO – Produse",          from: "/ro",          to: "/ro/produse" },
  { context: "Footer RO – Politica",         from: "/ro",          to: "/ro/politica-confidentialitate" },
  { context: "Footer RO – Termeni",          from: "/ro",          to: "/ro/termeni-si-conditii" },

  // ─── Footer columns – EN locale (footer uses `/${lang}${href}` with EN dict hrefs) ─
  { context: "Footer EN – About Us",         from: "/en",          to: "/en/about" },
  { context: "Footer EN – Team anchor",      from: "/en",          to: "/en/about#echipa" },
  { context: "Footer EN – Careers (stub #)", from: "/en",          to: "#", stubOnly: true },
  { context: "Footer EN – Web & Mobile",     from: "/en",          to: "/en/services" },
  { context: "Footer EN – Enterprise",       from: "/en",          to: "/en/services" },
  { context: "Footer EN – IT Consulting",    from: "/en",          to: "/en/services" },
  { context: "Footer EN – Blog",             from: "/en",          to: "/en/blog" },
  { context: "Footer EN – Products",         from: "/en",          to: "/en/products" },
  { context: "Footer EN – Privacy Policy",   from: "/en",          to: "/en/privacy-policy" },
  { context: "Footer EN – Terms",            from: "/en",          to: "/en/terms-and-conditions" },

  // ─── Home page – RO ───────────────────────────────────────────────────────
  { context: "Home RO – Hero: Discover Services", from: "/ro",     to: "/ro/servicii" },
  { context: "Home RO – Hero: Contact us",        from: "/ro",     to: "/ro/contact" },
  { context: "Home RO – Services preview cards",  from: "/ro",     to: "/ro/servicii" },
  { context: "Home RO – CTA Banner",              from: "/ro",     to: "/ro/contact" },

  // ─── Home page – EN ───────────────────────────────────────────────────────
  { context: "Home EN – Hero: Discover Services", from: "/en",     to: "/en/services" },
  { context: "Home EN – Hero: Contact us",        from: "/en",     to: "/en/contact" },
  { context: "Home EN – Services preview cards",  from: "/en",     to: "/en/services" },
  { context: "Home EN – CTA Banner",              from: "/en",     to: "/en/contact" },

  // ─── Services page – RO ───────────────────────────────────────────────────
  { context: "Services RO – FAQ link to Blog",    from: "/ro/servicii",  to: "/ro/blog" },
  { context: "Services RO – CTA Contact (web)",   from: "/ro/servicii",  to: "/ro/contact?serviciu=web-mobile" },
  { context: "Services RO – CTA Contact (enterprise)", from: "/ro/servicii", to: "/ro/contact?serviciu=enterprise" },
  { context: "Services RO – CTA Contact (consulting)", from: "/ro/servicii", to: "/ro/contact?serviciu=consultanta" },
  { context: "Services RO – CTA Banner",          from: "/ro/servicii",  to: "/ro/contact" },

  // ─── Services page – EN ───────────────────────────────────────────────────
  { context: "Services EN – FAQ link to Blog",    from: "/en/services",  to: "/en/blog" },
  { context: "Services EN – CTA Contact (web)",   from: "/en/services",  to: "/en/contact?serviciu=web-mobile" },
  { context: "Services EN – CTA Contact (enterprise)", from: "/en/services", to: "/en/contact?serviciu=enterprise" },
  { context: "Services EN – CTA Contact (consulting)", from: "/en/services", to: "/en/contact?serviciu=consultanta" },
  { context: "Services EN – CTA Banner",          from: "/en/services",  to: "/en/contact" },

  // ─── About page – RO ──────────────────────────────────────────────────────
  { context: "About RO – CTA Banner",             from: "/ro/despre-noi", to: "/ro/contact" },

  // ─── About page – EN ──────────────────────────────────────────────────────
  { context: "About EN – CTA Banner",             from: "/en/about",      to: "/en/contact" },

  // ─── Products page – RO ───────────────────────────────────────────────────
  { context: "Products RO – CTA Banner",          from: "/ro/produse",    to: "/ro/contact?serviciu=produs" },

  // ─── Products page – EN ───────────────────────────────────────────────────
  { context: "Products EN – CTA Banner",          from: "/en/products",   to: "/en/contact?serviciu=produs" },

  // ─── Blog list page ───────────────────────────────────────────────────────
  { context: "Blog RO – Article card link",       from: "/ro/blog",       to: "/ro/blog" },
  { context: "Blog EN – Article card link",       from: "/en/blog",       to: "/en/blog" },

  // ─── Blog post page ───────────────────────────────────────────────────────
  { context: "Blog post RO – Back to Blog",       from: "/ro/blog/post",  to: "/ro/blog" },
  { context: "Blog post EN – Back to Blog",       from: "/en/blog/post",  to: "/en/blog" },

  // ─── Contact page ─────────────────────────────────────────────────────────
  { context: "Contact RO – Privacy policy link",  from: "/ro/contact",    to: "/ro/politica-confidentialitate" },
  { context: "Contact EN – Privacy policy link",  from: "/en/contact",    to: "/en/privacy-policy" },

  // ─── Cookie banner ────────────────────────────────────────────────────────
  { context: "Cookie RO – Privacy policy",        from: "/ro",            to: "/ro/politica-confidentialitate" },
  { context: "Cookie EN – Privacy policy",        from: "/en",            to: "/en/privacy-policy" },

  // ─── Legal pages ──────────────────────────────────────────────────────────
  { context: "Privacy RO – page",                 from: "/ro",            to: "/ro/politica-confidentialitate" },
  { context: "Privacy EN – page",                 from: "/en",            to: "/en/privacy-policy" },
  { context: "Terms RO – page",                   from: "/ro",            to: "/ro/termeni-si-conditii" },
  { context: "Terms EN – page",                   from: "/en",            to: "/en/terms-and-conditions" },

  // ─── 404 / error pages ────────────────────────────────────────────────────
  { context: "404 – Back to Home",                from: "/nonexistent",   to: "/ro" },
  { context: "Global error – Back to Home",       from: "/",              to: "/ro" },

  // ─── Portfolio page (hidden in nav but accessible) ────────────────────────
  { context: "Portfolio RO – page",               from: "/ro",            to: "/ro/portofoliu" },
  { context: "Portfolio EN – page",               from: "/en",            to: "/en/portfolio" },

  // ─── next.config.ts rewrites – EN slug aliases ────────────────────────────
  { context: "Rewrite EN /en/services → /en/servicii",             from: "/en", to: "/en/services" },
  { context: "Rewrite EN /en/about → /en/despre-noi",              from: "/en", to: "/en/about" },
  { context: "Rewrite EN /en/portfolio → /en/portofoliu",          from: "/en", to: "/en/portfolio" },
  { context: "Rewrite EN /en/products → /en/produse",              from: "/en", to: "/en/products" },
  { context: "Rewrite EN /en/privacy-policy",                       from: "/en", to: "/en/privacy-policy" },
  { context: "Rewrite EN /en/terms-and-conditions",                 from: "/en", to: "/en/terms-and-conditions" },

  // ─── Blog post in content: hardcoded /ro/... links inside Markdown ────────
  { context: "Blog content (hardcoded) – /ro/servicii",  from: "/ro/blog/post", to: "/ro/servicii" },
  { context: "Blog content (hardcoded) – /ro/contact",   from: "/ro/blog/post", to: "/ro/contact" },
];

// ---------------------------------------------------------------------------
// HTTP redirect follower
// ---------------------------------------------------------------------------

/**
 * Follow HTTP redirects and record every hop.
 * @param {string} url - Absolute URL to fetch
 * @param {number} depth - recursion depth guard
 * @returns {Promise<{chain: Array<{url, status}>, finalStatus: number, error?: string}>}
 */
async function followRedirects(url, depth = 0) {
  if (depth > MAX_REDIRECTS) {
    return { chain: [], finalStatus: 0, error: "Redirect loop / too many redirects" };
  }

  return new Promise((resolve) => {
    const parsed = new URL(url);
    const lib = parsed.protocol === "https:" ? https : http;

    const req = lib.request(
      url,
      { method: "HEAD", timeout: 8000 },
      (res) => {
        const { statusCode, headers } = res;
        res.resume(); // consume body

        if (statusCode >= 300 && statusCode < 400 && headers.location) {
          const nextUrl = new URL(headers.location, url).toString();
          followRedirects(nextUrl, depth + 1).then((inner) => {
            resolve({
              chain: [{ url, status: statusCode }, ...inner.chain],
              finalStatus: inner.finalStatus,
              error: inner.error,
            });
          });
        } else {
          resolve({ chain: [{ url, status: statusCode }], finalStatus: statusCode });
        }
      }
    );
    req.on("timeout", () => {
      req.destroy();
      resolve({ chain: [{ url, status: 0 }], finalStatus: 0, error: "Timeout" });
    });
    req.on("error", (err) => {
      resolve({ chain: [{ url, status: 0 }], finalStatus: 0, error: err.message });
    });
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Deduplication helper – only check each target URL once
// ---------------------------------------------------------------------------

const resultCache = new Map();

async function checkUrl(relPath) {
  if (resultCache.has(relPath)) return resultCache.get(relPath);
  // Strip fragment from URL (HTTP doesn't send them to server)
  const urlNoHash = relPath.replace(/#.*$/, "");
  const fullUrl = `${BASE_URL}${urlNoHash}`;
  const result = await followRedirects(fullUrl);
  resultCache.set(relPath, result);
  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`\nNavigation Redirect Audit — ${BASE_URL}`);
  console.log("=".repeat(60));

  const rows = [];
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;

  for (const link of NAV_LINKS) {
    // Stub/fragment-only links (href="#") never fire HTTP requests in browsers.
    if (link.stubOnly) {
      rows.push({
        context: link.context,
        from: link.from,
        to: link.to,
        chain: [{ url: "#", status: "N/A" }],
        finalStatus: "N/A",
        status: "STUB",
        redirectCount: 0,
        error: undefined,
      });
      const icon = "🔗";
      console.log(`${icon} [STUB    ] ${link.context} (href="#", no HTTP request)`);
      passCount++;
      continue;
    }

    const result = await checkUrl(link.to);
    const { chain, finalStatus, error } = result;

    const redirectCount = chain.length - 1;
    const finalUrl = chain[chain.length - 1]?.url ?? `${BASE_URL}${link.to}`;

    let status;
    if (error) {
      status = "ERROR";
      failCount++;
    } else if (finalStatus >= 400) {
      status = "FAIL";
      failCount++;
    } else if (redirectCount > 1) {
      // More than 1 hop is a performance concern for Google
      status = "WARN";
      warnCount++;
    } else if (redirectCount === 1) {
      status = "REDIRECT";
      warnCount++;
    } else {
      status = "OK";
      passCount++;
    }

    rows.push({
      context: link.context,
      from: link.from,
      to: link.to,
      chain,
      finalStatus,
      status,
      redirectCount,
      error,
    });

    const icon = status === "OK" ? "✅" : status === "REDIRECT" ? "↪️ " : status === "WARN" ? "⚠️ " : "❌";
    console.log(`${icon} [${status.padEnd(8)}] ${link.context}`);
    if (chain.length > 1) {
      chain.forEach((hop, i) => {
        console.log(`   ${"→ ".repeat(i)}${hop.status} ${hop.url}`);
      });
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`Results: ✅ ${passCount} OK  ↪️  ${warnCount} redirect/warn  ❌ ${failCount} fail/error`);

  // ─── Generate Markdown report ──────────────────────────────────────────────

  const now = new Date().toISOString();

  const md = [
    `# Navigation Redirect Audit`,
    ``,
    `> Generated: ${now}  `,
    `> Base URL: \`${BASE_URL}\`  `,
    `> Total links audited: **${NAV_LINKS.length}** (unique URLs cached)`,
    ``,
    `## Summary`,
    ``,
    `| Status | Count |`,
    `|--------|-------|`,
    `| ✅ OK (no redirect) | ${rows.filter(r => r.status === "OK").length} |`,
    `| ↪️ Single redirect | ${rows.filter(r => r.status === "REDIRECT").length} |`,
    `| ⚠️ Multiple redirects | ${rows.filter(r => r.status === "WARN").length} |`,
    `| 🔗 Stub / fragment-only | ${rows.filter(r => r.status === "STUB").length} |`,
    `| ❌ HTTP error | ${rows.filter(r => r.status === "FAIL").length} |`,
    `| ❌ Network error | ${rows.filter(r => r.status === "ERROR").length} |`,
    ``,
    `## Google SEO Notes`,
    ``,
    `- **OK**: Link resolves in a single request — ideal for Google.`,
    `- **Single redirect**: One hop (e.g. locale prefix, rewrite). Google follows it but `,
    `  a 301 passes ~99% link equity. Acceptable but prefer direct URLs where possible.`,
    `- **Multiple redirects**: Two or more hops. Google crawl budget is wasted; fix these.`,
    `- **HTTP 4xx/5xx or error**: Page is broken — must fix.`,
    ``,
    `## Redirect Chains`,
    ``,
    `> Each row shows the UI source → navigation target → full HTTP hop chain → final status.`,
    ``,
  ];

  // Group by status for readability
  const grouped = {
    OK: rows.filter(r => r.status === "OK"),
    REDIRECT: rows.filter(r => r.status === "REDIRECT"),
    WARN: rows.filter(r => r.status === "WARN"),
    STUB: rows.filter(r => r.status === "STUB"),
    FAIL: rows.filter(r => r.status === "FAIL"),
    ERROR: rows.filter(r => r.status === "ERROR"),
  };

  const statusLabel = {
    OK: "✅ OK — No Redirect",
    REDIRECT: "↪️ Single Redirect",
    WARN: "⚠️ Multiple Redirects",
    STUB: "🔗 Stub / Fragment-only (href=\"#\")",
    FAIL: "❌ HTTP Error",
    ERROR: "❌ Network / Timeout Error",
  };

  for (const [key, group] of Object.entries(grouped)) {
    if (group.length === 0) continue;
    md.push(`### ${statusLabel[key]}`, ``);
    if (key === "STUB") {
      md.push(
        `| UI Location | From Page | Note |`,
        `|-------------|-----------|------|`,
      );
      for (const r of group) {
        md.push(`| ${r.context} | \`${r.from}\` | Placeholder link — no HTTP request, not crawled by Google |`);
      }
    } else {
      md.push(
        `| UI Location | From Page | Target URL | Hop Chain | Final Status |`,
        `|-------------|-----------|------------|-----------|--------------|`,
      );
      for (const r of group) {
        const chainStr = r.chain
          .map((h, i) => `${i > 0 ? " → " : ""}**${h.status}** \`${h.url.replace(BASE_URL, "")}\``)
          .join("");
        const errorNote = r.error ? ` *(${r.error})*` : "";
        md.push(
          `| ${r.context} | \`${r.from}\` | \`${r.to}\` | ${chainStr}${errorNote} | **${r.finalStatus}** |`,
        );
      }
    }
    md.push(``);
  }

  md.push(
    `---`,
    ``,
    `## All Links — Flat Table`,
    ``,
    `Complete list in discovery order:`,
    ``,
    `| # | Status | UI Location | From | Target | Final URL | Hops | HTTP |`,
    `|---|--------|-------------|------|--------|-----------|------|------|`,
  );

  rows.forEach((r, idx) => {
    const finalUrl = r.status === "STUB" ? "N/A" : (r.chain[r.chain.length - 1]?.url?.replace(BASE_URL, "") ?? r.to);
    const icon = { OK: "✅", REDIRECT: "↪️", WARN: "⚠️", STUB: "🔗", FAIL: "❌", ERROR: "❌" }[r.status];
    md.push(
      `| ${idx + 1} | ${icon} ${r.status} | ${r.context} | \`${r.from}\` | \`${r.to}\` | \`${finalUrl}\` | ${r.redirectCount} | ${r.finalStatus} |`,
    );
  });

  md.push(``);

  const outDir = path.join(ROOT, "docs");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "navigation-redirect-audit.md");
  fs.writeFileSync(outPath, md.join("\n"), "utf8");

  console.log(`\nReport written to: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
