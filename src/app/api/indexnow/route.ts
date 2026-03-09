import { NextRequest, NextResponse } from "next/server";

const INDEXNOW_API = "https://api.indexnow.org/indexnow";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = process.env.INDEXNOW_KEY;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rammertech.ro";

  if (!key) {
    return NextResponse.json(
      { error: "INDEXNOW_KEY not configured" },
      { status: 500 }
    );
  }

  const host = new URL(siteUrl).hostname;

  const sitemapRes = await fetch(`${siteUrl}/sitemap.xml`, {
    next: { revalidate: 0 },
  });
  if (!sitemapRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch sitemap" },
      { status: 500 }
    );
  }
  const xml = await sitemapRes.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urls.length === 0) {
    return NextResponse.json({ submitted: 0 });
  }

  const res = await fetch(INDEXNOW_API, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${siteUrl}/${key}.txt`,
      urlList: urls,
    }),
  });

  return NextResponse.json({
    submitted: urls.length,
    indexNowStatus: res.status,
  });
}
