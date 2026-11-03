#!/usr/bin/env bash

# Example lychee command using this preprocess script:
# lychee --include-fragments -p ./lychee-preprocess.sh documentation

# Convert "#_1" → "#1" and remove "#start" markers
sed -E 's/#_([0-9])/#\1/g; s/#start//g' "$1" |
# Remove "#" from Docsify tile links in home.md
sed -E '/href="#\//s|href="#/|href="/|g' |
# Add "/" from Docsify img links
sed -E "s@((^|[[:space:]])src[[:space:]]*=[[:space:]]*['\"])_media/@\1/_media/@g"
