#!/usr/bin/env bash

# Example lychee command using this preprocess script:
# lychee --include-fragments -p ./lychee-preprocess.sh documentation

# Convert "#_1" → "#1" and remove "#start" markers
sed -E 's/#_([0-9])/#\1/g; s/#start//g' "$1"