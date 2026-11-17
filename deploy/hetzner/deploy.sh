#!/usr/bin/env bash
# Construiește imaginea local (linux/amd64), o trimite ca tarball pe serverul Hetzner, o pornește și verifică sănătatea.
# Dacă noua versiune nu devine healthy, revine automat la tag-ul anterior. Fără registry și fără build pe serverul de prod.
#
# Uz:   ENV_FILE=/cale/rammer-tech-landing-site.env HOSTS="www.rammertech.ro" APEX="rammertech.ro" deploy/hetzner/deploy.sh [tag]
# Env:  SERVER (implicit root@2.31.87.216), SSH_KEY (implicit ~/.ssh/hetz), HOSTS (adrese Caddy, obligatoriu),
#       APEX (opțional: gazda care redirecționează permanent spre prima din HOSTS), PUSH_ENV=1 (copiază ENV_FILE ca .env pe server),
#       TEST_HOST (opțional: gazdă suplimentară cu TLS Let's Encrypt, DNS fără proxy, pentru verificări),
#       ORIGIN_CERT + ORIGIN_KEY (opțional: certificat Cloudflare Origin CA pentru HOSTS/APEX, în loc de Let's Encrypt; se copiază în
#       /opt/edge/sites/certs/), CADDY_ONLY=1 (doar Caddy și certificatul; fără build, fără containere, fără ENV_FILE).
# ENV_FILE conține NEXT_PUBLIC_SITE_URL și INDEXNOW_KEY (necesare la build) plus secretele de rulare; nu se afișează și nu intră în git.
set -euo pipefail

TAG="${1:-$(git rev-parse --short HEAD 2>/dev/null || echo latest)}"
SERVER="${SERVER:-root@2.31.87.216}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/hetz}"
: "${HOSTS:?setează HOSTS (ex. www.rammertech.ro)}"
[ "${CADDY_ONLY:-0}" = 1 ] || : "${ENV_FILE:?setează ENV_FILE}"
DIR=/opt/rammertech
SSH=(ssh -i "$SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes "$SERVER")
val() { grep -m1 "^$1=" "$ENV_FILE" | cut -d= -f2-; }

PREV=""
if [ "${CADDY_ONLY:-0}" != 1 ]; then
	echo "==> build rammertech-web:$TAG (linux/amd64)"
	docker buildx build --platform linux/amd64 --load -t "rammertech-web:$TAG" \
	  --build-arg "NEXT_PUBLIC_SITE_URL=$(val NEXT_PUBLIC_SITE_URL)" --build-arg "INDEXNOW_KEY=$(val INDEXNOW_KEY)" .

	echo "==> trimit imaginea pe $SERVER"
	docker save "rammertech-web:$TAG" | gzip | "${SSH[@]}" 'gunzip | docker load' >/dev/null

	echo "==> pregătesc $DIR"
	"${SSH[@]}" "mkdir -p $DIR && umask 077 && touch $DIR/.env"
	scp -q -i "$SSH_KEY" -o IdentitiesOnly=yes deploy/hetzner/docker-compose.yml "$SERVER:$DIR/docker-compose.yml"
	[ "${PUSH_ENV:-0}" = 1 ] && { "${SSH[@]}" "umask 077 && cat > $DIR/.env" < "$ENV_FILE"; }

	PREV="$("${SSH[@]}" "grep -m1 '^RAMMERTECH_TAG=' $DIR/.env | cut -d= -f2- || true")"
	"${SSH[@]}" "cd $DIR && sed -i '/^RAMMERTECH_TAG=/d' .env && echo RAMMERTECH_TAG=$TAG >> .env && docker compose up -d --remove-orphans"

	echo "==> aștept starea healthy"
	ok=0
	for _ in $(seq 1 18); do
	  s="$("${SSH[@]}" "docker inspect -f '{{.State.Health.Status}}' rammertech-web-1 2>/dev/null || true")"
	  [ "$s" = healthy ] && { ok=1; break; }
	  sleep 5
	done
	if [ "$ok" != 1 ]; then
	  echo "!! $TAG nu a devenit healthy; revin la '${PREV:-<niciun tag anterior>}'" >&2
	  [ -n "$PREV" ] && "${SSH[@]}" "cd $DIR && sed -i '/^RAMMERTECH_TAG=/d' .env && echo RAMMERTECH_TAG=$PREV >> .env && docker compose up -d"
	  exit 1
	fi

fi

echo "==> actualizez Caddy ($HOSTS)"
tls=""
if [ -n "${ORIGIN_CERT:-}" ]; then
  : "${ORIGIN_KEY:?setează ORIGIN_KEY odată cu ORIGIN_CERT}"
  "${SSH[@]}" "umask 077 && mkdir -p /opt/edge/sites/certs"
  scp -q -i "$SSH_KEY" -o IdentitiesOnly=yes "$ORIGIN_CERT" "$SERVER:/opt/edge/sites/certs/rammertech-origin.pem"
  scp -q -i "$SSH_KEY" -o IdentitiesOnly=yes "$ORIGIN_KEY" "$SERVER:/opt/edge/sites/certs/rammertech-origin.key"
  "${SSH[@]}" "chmod 700 /opt/edge/sites/certs && chmod 600 /opt/edge/sites/certs/rammertech-origin.*"
  tls=$'\n\ttls /etc/caddy/sites/certs/rammertech-origin.pem /etc/caddy/sites/certs/rammertech-origin.key'
fi
"${SSH[@]}" "cd /opt/edge/sites && [ -f rammertech.caddy ] && cp rammertech.caddy rammertech.caddy.bak || true"
{
  cat deploy/hetzner/rammertech.caddy.template
  [ -n "${APEX:-}" ] && printf '%s {%s\n\tredir https://%s{uri} permanent\n}\n' "$APEX" "$tls" "${HOSTS%% *}"
  printf '%s {%s\n\timport rammertech_app\n}\n' "${HOSTS// /, }" "$tls"
  [ -n "${TEST_HOST:-}" ] && printf '%s {\n\timport rammertech_app\n}\n' "$TEST_HOST"
  true
} | "${SSH[@]}" 'cat > /opt/edge/sites/rammertech.caddy'
if "${SSH[@]}" 'docker exec edge-caddy-1 caddy validate --config /etc/caddy/Caddyfile >/dev/null && docker exec edge-caddy-1 caddy reload --config /etc/caddy/Caddyfile'; then
  echo "OK: Caddy actualizat; rammertech-web:${TAG} (anterior: ${PREV:-niciunul})"
else
  echo "!! Caddy a refuzat configurația; restaurez site-ul anterior" >&2
  "${SSH[@]}" "cd /opt/edge/sites && { [ -f rammertech.caddy.bak ] && mv rammertech.caddy.bak rammertech.caddy || rm -f rammertech.caddy; } && docker exec edge-caddy-1 caddy reload --config /etc/caddy/Caddyfile"
  exit 1
fi
