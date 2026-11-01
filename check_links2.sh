
#!/bin/bash
set -euo pipefail

cd "${1:-.}"
[[ -f index.html ]] || {
  echo 'index.html ontbreekt' >&2
  exit 2
}

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

printf '%s\n' index.html > "$tmp/queue"
: > "$tmp/seen"

# Voeg een bestaande interne verwijzing toe.
add() {
  local link="$1" base="$2" part path dir
  local -a parts stack
  stack=()

  case "$link" in
    '#/'*) link=${link#\#/}; base=. ;;
    \#*|//*|*://*|mailto:*|data:*|javascript:*|tel:*)
      return 0 ;;
  esac

  link=${link%%\#*}
  link=${link%%\?*}
  link=${link#\<}
  link=${link%\>}
  [[ -n "$link" ]] || return 0

  if [[ "$link" == /* ]]; then
    link=${link#/}
    base=.
  fi

  # Normaliseer relatieve paden.
  IFS=/ read -r -a parts <<< "$base/$link"

  for part in "${parts[@]}"; do
    case "$part" in
      ''|.) ;;
      ..)
        if ((${#stack[@]})); then
          unset 'stack[${#stack[@]}-1]'
        else
          return 0
        fi
        ;;
      *) stack[${#stack[@]}]="$part" ;;
    esac
  done

  ((${#stack[@]})) || return 0
  path=$(IFS=/; printf '%s' "${stack[*]}")

  # Sluit verborgen mappen en _-mappen uit.
  dir=${path%/*}
  [[ "$dir" == "$path" ]] && dir=''

  case "/$dir/" in
    */_*/*|*/.*/*) return 0 ;;
  esac

  # Ondersteun Docsify-routes.
  if [[ -d "$path" ]]; then
    [[ -f "$path/README.md" ]] &&
      path="$path/README.md" || return 0
  elif [[ ! -f "$path" ]]; then
    [[ -f "$path.md" ]] &&
      path="$path.md" || return 0
  fi

  # Voorkom dubbele verwerking.
  if ! grep -Fqx -- "$path" "$tmp/seen" &&
     ! grep -Fqx -- "$path" "$tmp/next"; then
    printf '%s\n' "$path" >> "$tmp/next"
  fi
}

# Doorloop de wachtrij vanaf index.html.
while [[ -s "$tmp/queue" ]]; do
  : > "$tmp/next"

  while IFS= read -r file; do
    if grep -Fqx -- "$file" "$tmp/seen"; then
      continue
    fi

    printf '%s\n' "$file" >> "$tmp/seen"

    dir=${file%/*}
    [[ "$dir" == "$file" ]] && dir=.

    # Neem Docsify-sidebars uit de map en bovenliggende mappen mee.
    parent=$dir
    while :; do
      [[ ! -f "$parent/_sidebar.md" ]] ||
        add '_sidebar.md' "$parent"

      [[ "$parent" == . ]] && break

      case "$parent" in
        */*) parent=${parent%/*} ;;
        *) parent=. ;;
      esac
    done

    case "$file" in
      *.md|*.html|*.htm|*.css|*.js) ;;
      *) continue ;;
    esac

    # Lees de Docsify-homepage uit index.html.
    if [[ "$file" == index.html ]]; then
      home=$(sed -nE "s/.*homepage[[:space:]]*:[[:space:]]*['\"]([^'\"]+)['\"].*/\1/p" "$file" | head -n 1)

      if [[ -n "$home" ]]; then
        add "$home" .
      else
        add README.md .
      fi
    fi

    # Verwerk HTML href- en src-attributen.
    grep -Eo "(href|src)[[:space:]]*=[[:space:]]*(\"[^\"]+\"|'[^']+')" \
      "$file" > "$tmp/links" || true

    while IFS= read -r token; do
      link=${token#*=}
      link=${link#\"}
      link=${link%\"}
      link=${link#\'}
      link=${link%\'}
      add "$link" "$dir"
    done < "$tmp/links"

    # Verwerk Markdown-links en afbeeldingen.
    grep -Eo '\]\([^)]*\)' \
      "$file" > "$tmp/links" || true

    while IFS= read -r token; do
      link=${token#*\(}
      link=${link%\)}
      link=${link%% *}
      add "$link" "$dir"
    done < "$tmp/links"

  done < "$tmp/queue"

  sort -u "$tmp/next" |
    grep -Fvx -f "$tmp/seen" > "$tmp/queue" || true
done

# Verzamel bestanden buiten verborgen en _-mappen.
find . -type d \( -name '_*' -o -name '.*' \) \
  ! -path . -prune -o -type f ! -name '.*' -print |
  sed 's|^./||' | sort > "$tmp/all"

# Bepaal welke bestanden niet bereikbaar zijn.
grep -Fvx -f "$tmp/seen" "$tmp/all" \
  > "$tmp/missing" || true

# Toon statistieken.
checked=$(wc -l < "$tmp/all" | tr -d ' ')
missing=$(wc -l < "$tmp/missing" | tr -d ' ')

printf 'Gecontroleerd: %s\n' "$checked"
printf 'Bereikbaar: %s\n' "$((checked-missing))"
printf 'Niet bereikbaar: %s\n' "$missing"

if ((missing)); then
  printf '\nNiet bereikbaar:\n'
  cat "$tmp/missing"
  exit 1
fi
