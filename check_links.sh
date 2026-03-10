#!/usr/bin/env bash
set -euo pipefail

DOC_ROOT="${1:-documentation}"

find "$DOC_ROOT" -type f -name "*.md" | sort > /tmp/all_files.txt

grep -RhoE '\[[^]]+\]\([^)]+\)' "$DOC_ROOT" \
| sed -E 's/.*\(([^)]+)\).*/\1/' \
| sed 's/[#?].*$//' \
| grep -vE '^(https?://|mailto:)' \
| sed 's|^\./||' \
| sed 's|^/||' \
| sed 's|//|/|g' \
| sed -E 's|/$|/README.md|' \
| sed -E '/\.md$/!s|$|.md|' \
| awk -v r="$DOC_ROOT" '{print (index($0, r"/")==1) ? $0 : r"/"$0}' \
| sort -u > /tmp/linked_files.txt

comm -23 /tmp/all_files.txt /tmp/linked_files.txt
