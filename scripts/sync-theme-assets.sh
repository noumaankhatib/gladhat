#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
THEME="$ROOT/wordpress-theme/gladhat"
FONTS_SRC="$ROOT/public/fonts"
FONTS_DST="$THEME/assets/fonts"

mkdir -p "$FONTS_DST"

# CSS
for f in variables.css grid.css reset.css components.css layout.css refinement.css editorial.css when-talk.css; do
  cp "$ROOT/src/styles/$f" "$THEME/assets/css/$f"
done

# Fonts CSS — relative paths for theme assets/css → assets/fonts
sed 's|url('\''/fonts/|url('\''../fonts/|g; s|url("/fonts/|url("../fonts/|g' \
  "$ROOT/src/styles/fonts.css" > "$THEME/assets/css/fonts.css"

# Fonts
if [ -d "$FONTS_SRC" ]; then
  cp "$FONTS_SRC"/*.woff2 "$FONTS_DST/" 2>/dev/null || true
fi

# React islands bundle (after vite build)
if [ -f "$ROOT/dist/islands/islands.js" ]; then
  cp "$ROOT/dist/islands/islands.js" "$THEME/assets/js/islands.js"
  # Copy island chunks if any
  for chunk in "$ROOT/dist/islands/"*.js; do
    [ -f "$chunk" ] || continue
    base=$(basename "$chunk")
    [ "$base" = "islands.js" ] && continue
    cp "$chunk" "$THEME/assets/js/$base"
  done
  # Lazy-loaded island chunks (e.g. three.js)
  for chunk in "$ROOT/dist/assets/"three*.js; do
    [ -f "$chunk" ] || continue
    cp "$chunk" "$THEME/assets/js/$(basename "$chunk")"
  done
fi

echo "Theme assets synced to $THEME"
