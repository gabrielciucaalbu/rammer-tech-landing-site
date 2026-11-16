# rammertech.ro pe Hetzner

Next.js (`output: standalone`) într-un container, în spatele Caddy-ului comun din `/opt/edge` (TLS Let's Encrypt automat), pe serverul
`rammertech-prod-ubuntu-1` (Nürnberg, x86_64). Același model ca MicroTaxe, Scribae și refinance-calculator: imaginea ajunge ca tarball
(`docker load`), fără registry și fără build pe server.

## Deploy

```bash
ENV_FILE=/cale/rammer-tech-landing-site.env HOSTS="www.rammertech.ro" APEX="rammertech.ro" PUSH_ENV=1 deploy/hetzner/deploy.sh [tag]
```

`ENV_FILE` conține `NEXT_PUBLIC_SITE_URL`, `INDEXNOW_KEY` (necesare la build), `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CRON_SECRET`.
Nu se commit-uiește. `PUSH_ENV=1` îl copiază ca `/opt/rammertech/.env` (chmod 600) doar când se schimbă variabilele.

Scriptul construiește `linux/amd64`, trimite imaginea, pornește containerul, așteaptă `healthy` și abia apoi scrie `/opt/edge/sites/rammertech.caddy`
și face `caddy reload` (după `caddy validate`). Dacă noul tag nu devine healthy sau Caddy refuză configurația, revine singur la starea anterioară.

## Rollback manual

```bash
ssh root@2.31.87.216 "cd /opt/rammertech && sed -i 's/^RAMMERTECH_TAG=.*/RAMMERTECH_TAG=<tag-anterior>/' .env && docker compose up -d"
```

Imaginile anterioare rămân pe server (`docker images rammertech-web`). Fișierul Caddy anterior e în `/opt/edge/sites/rammertech.caddy.bak`.

## Comportament față de Vercel

* Redirect apex → `www` (301) se face în Caddy (`APEX`), cum făcea Vercel la nivel de domeniu.
* Caddy elimină `X-Powered-By` și înlocuiește `Cache-Control: s-maxage=31536000` (valoarea implicită Next pentru pagini statice) cu
  `public, max-age=0, must-revalidate`, ca pe Vercel; antetele setate explicit de aplicație rămân.
* Vercel Analytics și Speed Insights (`@vercel/analytics`, `@vercel/speed-insights`) nu produc date în afara Vercel.
* Nu există crons: ruta `/api/indexnow` (POST, protejată cu `CRON_SECRET`) se apelează din exterior, la fel ca înainte.
