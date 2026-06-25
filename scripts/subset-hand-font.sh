#!/usr/bin/env bash
#
# Regenerate the subset of cjkFonts 手寫4 / The Peak Font Plus (隨峰體Plus)
# used for handwritten CJK glyphs on the site (the font stack falls through to
# this for CJK inside `font-caveat`; see tailwind.config.ts).
#
# Source font (SIL OFL 1.1): https://cjkfonts.io/blog/cjkfonts_handwriting4
# License + attribution: src/lib/fonts/OFL.txt
#
# The full font (~16 MB TTF) is intentionally NOT committed. Download it, then
# point this script at it. Only the tiny subset .woff2 is committed.
#
# Usage:
#   scripts/subset-hand-font.sh /path/to/ThePeakFontPlus-Regular.ttf
#
# Requires: Python 3 with `fonttools` and `brotli`
#   python3 -m venv .venv && . .venv/bin/activate && pip install fonttools brotli
#
set -euo pipefail

SRC="${1:-}"
if [[ -z "$SRC" || ! -f "$SRC" ]]; then
  echo "usage: $0 /path/to/ThePeakFontPlus-Regular.ttf" >&2
  exit 1
fi

# Every handwritten CJK glyph used on the site. Add characters here and re-run
# when you introduce new handwritten Chinese text.
GLYPHS="銘"

OUT="$(dirname "$0")/../src/lib/fonts/cjkfonts-handwriting4.woff2"

pyftsubset "$SRC" \
  --text="$GLYPHS" \
  --flavor=woff2 \
  --no-hinting \
  --output-file="$OUT"

echo "wrote $OUT ($(wc -c < "$OUT") bytes) covering: $GLYPHS"
