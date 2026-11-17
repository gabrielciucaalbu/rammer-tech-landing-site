# rammertech.ro pe Hetzner

Next.js (`output: standalone`) într-un container, în spatele Caddy-ului comun din `/opt/edge` (TLS Let's Encrypt automat), pe serverul
`rammertech-prod-ubuntu-1` (Nürnberg, x86_64). Același model ca MicroTaxe, Scribae și refinance-calculator: imaginea ajunge ca tarball
(`docker load`), fără registry și fără build pe server.

## Deploy

```bash
ENV_FILE=/cale/rammer-tech-landing-site.env HOSTS="www.rammertech.ro" APEX="rammertech.ro" PUSH_ENV=1 deploy/hetzner/deploy.sh [tag]
```

Producție (Cloudflare în față, certificat Origin CA în Caddy, host de test cu Let's Encrypt):

```bash
ENV_FILE=... HOSTS="www.rammertech.ro" APEX="rammertech.ro" TEST_HOST="rammertech-test.scribae.ro" \
  ORIGIN_CERT=~/.config/migration/certs/rammertech-origin.pem ORIGIN_KEY=~/.config/migration/certs/rammertech-origin.key \
  deploy/hetzner/deploy.sh [tag]
# doar Caddy și certificatul (fără build, fără containere): CADDY_ONLY=1 HOSTS=... APEX=... TEST_HOST=... ORIGIN_CERT=... ORIGIN_KEY=... deploy/hetzner/deploy.sh
```

Certificatul Origin CA (ECC, valabil 15 ani, `rammertech.ro` + `*.rammertech.ro`) se emite din Cloudflare (SSL/TLS > Origin Server) sau prin API
(`POST /certificates`) și se pune în `/opt/edge/sites/certs/` (în afara glob-ului `*.caddy`). Cu el, Caddy nu face ACME pentru hosturile
proxiate, deci nu există nicio fereastră fără certificat la schimbarea DNS. Cloudflare rămâne pe SSL „Full (strict)".

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
* `@vercel/analytics` și `@vercel/speed-insights` au fost scoase din layout și din dependențe: cer `/_vercel/*`, care există doar pe Vercel.
* Caddy răspunde 204 la `OPTIONS` (ca Vercel) și pune `Cache-Control` și HSTS implicite pe răspunsurile fără ele (redirecturi Next).
* `src/middleware.ts` rescrie la litere mici rutele cu majuscule (`/ro/Contact` → `/ro/contact`, 200 fără redirect), cum face Vercel.
* Caddy răspunde 204 la `OPTIONS` doar pe pagini (`/ro`, `/en`) și fișiere statice; API-ul și redirecturile rămân la aplicație. Normalizează `Cache-Control`
  (fără `s-maxage`/`stale-while-revalidate` către client, `must-revalidate` pe fișiere publice, 404 ca pe Vercel).
* Cache-ul de imagini optimizate (`/_next/image`) stă în volumul `next-cache`, deci nu se golește la deploy; fără el, primele cereri după fiecare
  repornire sunt lente (se vede în Lighthouse).
* `docs/` și `*.md` rămân în contextul de build: Tailwind le scanează (ca pe Vercel), iar CSS-ul generat are același hash ca pe Vercel.
* Diferență cunoscută: cereri cu URL peste ~16 KB nu primesc răspuns prin HTTP/2 la Caddy (12 KB merg); în producție le tratează Cloudflare în fața originii.
* Caddy răspunde 400 la căile cu segmente `..` codificate (`/%2e%2e/ro`), cum face platforma Vercel înaintea aplicației.
* Nu există crons: ruta `/api/indexnow` (POST, protejată cu `CRON_SECRET`) se apelează din exterior, la fel ca înainte.
