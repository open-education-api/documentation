#!/usr/bin/env bash
#lychee --include-fragments -p ./lychee-preprocess.sh documentation
sed -E 's/#_([0-9])/#\1/g; s/#start//g' "$1"
