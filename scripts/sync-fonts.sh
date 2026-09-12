#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/public/fonts"
MANROPE="$ROOT/node_modules/@fontsource/manrope/files"
FRAUNCES="$ROOT/node_modules/@fontsource-variable/fraunces/files"

mkdir -p "$DEST"

cp "$MANROPE/manrope-latin-400-normal.woff2" "$DEST/manrope-latin-400.woff2"
cp "$MANROPE/manrope-latin-500-normal.woff2" "$DEST/manrope-latin-500.woff2"
cp "$MANROPE/manrope-latin-600-normal.woff2" "$DEST/manrope-latin-600.woff2"
cp "$MANROPE/manrope-latin-700-normal.woff2" "$DEST/manrope-latin-700.woff2"

cp "$FRAUNCES/fraunces-latin-wght-normal.woff2" "$DEST/fraunces-latin.woff2"
cp "$FRAUNCES/fraunces-latin-wght-italic.woff2" "$DEST/fraunces-latin-italic.woff2"

echo "Fonts copied to $DEST"
