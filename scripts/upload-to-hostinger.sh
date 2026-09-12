#!/usr/bin/env bash
# Upload Gladhat assets to Hostinger via TUS (requires HOSTINGER_API_TOKEN).
# Usage: HOSTINGER_API_TOKEN=your_token ./scripts/upload-to-hostinger.sh

set -euo pipefail

DOMAIN="${HOSTINGER_DOMAIN:-chocolate-lemur-135747.hostingersite.com}"
API="${HOSTINGER_API:-https://developers.hostinger.com}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if [[ -z "${HOSTINGER_API_TOKEN:-}" ]]; then
  echo "Error: set HOSTINGER_API_TOKEN (hPanel → Profile → API Tokens)"
  exit 1
fi

echo "Fetching hosting account for ${DOMAIN}..."
SITES=$(curl -sf -H "Authorization: Bearer ${HOSTINGER_API_TOKEN}" \
  "${API}/api/hosting/v1/websites?domain=${DOMAIN}")
USERNAME=$(echo "$SITES" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['username'] if d else '')" 2>/dev/null || true)
if [[ -z "$USERNAME" ]]; then
  echo "Could not resolve username. Response: $SITES"
  exit 1
fi
echo "Username: $USERNAME"

echo "Requesting upload URL..."
UPLOAD=$(curl -sf -X POST -H "Authorization: Bearer ${HOSTINGER_API_TOKEN}" \
  -H "Content-Type: application/json" \
  "${API}/api/hosting/v1/websites/${USERNAME}/file-browser/upload-url" \
  -d "{\"domain\":\"${DOMAIN}\"}")
URL=$(echo "$UPLOAD" | python3 -c "import sys,json; print(json.load(sys.stdin).get('url',''))")
AUTH=$(echo "$UPLOAD" | python3 -c "import sys,json; print(json.load(sys.stdin).get('auth_key',''))")
REST=$(echo "$UPLOAD" | python3 -c "import sys,json; print(json.load(sys.stdin).get('rest_auth_key',''))")
if [[ -z "$URL" || -z "$AUTH" ]]; then
  echo "Upload URL failed: $UPLOAD"
  exit 1
fi

tus_upload() {
  local file="$1"
  local dest="$2"
  local size
  size=$(stat -c%s "$file")
  echo "Uploading $(basename "$file") → public_html/${dest} (${size} bytes)..."
  curl -sf -X POST "${URL}/${dest}?override=true" \
    -H "X-Auth: ${AUTH}" \
    -H "X-Auth-Rest: ${REST}" \
    -H "Tus-Resumable: 1.0.0" \
    -H "Upload-Length: ${size}" \
    -H "Upload-Offset: 0" >/dev/null
  curl -sf -X PATCH "${URL}/${dest}?override=true" \
    -H "X-Auth: ${AUTH}" \
    -H "X-Auth-Rest: ${REST}" \
    -H "Tus-Resumable: 1.0.0" \
    -H "Content-Type: application/offset+octet-stream" \
    -H "Upload-Offset: 0" \
    --data-binary "@${file}" >/dev/null
  echo "  OK"
}

# Theme images + video (fixes broken images on current WP theme)
tus_upload "${ROOT}/wordpress-theme/gladhat-theme-images.zip" "wp-content/themes/gladhat/assets/gladhat-theme-images.zip"

echo ""
echo "Done. In hPanel File Manager:"
echo "  1. Go to public_html/wp-content/themes/gladhat/assets/"
echo "  2. Extract gladhat-theme-images.zip here"
echo "  3. Clear cache and hard-refresh the site"
echo ""
echo "Verify:"
echo "  https://${DOMAIN}/wp-content/themes/gladhat/assets/images/logo_3d_header.png"
