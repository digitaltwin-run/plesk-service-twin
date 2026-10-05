# Plesk Service Digital Twin — Local Environment & Preflight Suite

`plesk-service-twin` to komponent Digital Twin symulujący środowisko serwerowe Plesk (Nginx + PHP 8.3 FPM + Plesk Admin REST API Mock) dla projektów wdrożeniowych.

## Funkcje

1. **Plesk Webspace Simulation (Nginx 127.0.0.1:8791 + PHP-FPM 9000)**:
   - Zgodna z Pleskiem kolejność `DirectoryIndex index.html index.htm index.php`.
   - Symulacja domyślnych nagłówków bezpieczeństwa `X-Powered-By: PleskLin`.

2. **Plesk Admin REST API Mock (127.0.0.1:8792)**:
   - Endpointy `/healthz`, `/api/v2/server`, `/api/v2/webspaces`.
   - Dwufazowy protokół publikacji (`/api/v2/publication/plan` oraz `/api/v2/publication/apply`).

3. **Pre-deploy Validator (`src/preflight.mjs`)**:
   - Detekcja przesłaniania domyślną stroną Pleska (`plesk_default_page_shadowing`).
   - Skaner kompletności źródeł (`source_completeness`) dla zadeklarowanych `require`/`include` w plikach PHP.

4. **Bezpieczny artefakt publikacji**:
   - Do `httpdocs` trafiają wyłącznie jawnie dozwolone strony, assety, wersja polska i `.well-known`.
   - Repozytorium `.git`, pliki `.env`, dokumentacja i narzędzia developerskie nie są publikowane.
   - Poprzednia zawartość jest zachowywana poza docrootem w `.httpdocs-private-backup`.
   - Nginx niezależnie blokuje dotfiles i typowe pliki techniczne.

## Szybki start

```bash
# Uruchomienie lokalnego środowiska Plesk (Nginx + FPM + API)
make dev

# Weryfikacja stanu uslug
make health

# Uruchomienie testow
make test

# Skanowanie projektu przed publikacja
make preflight TARGET=/path/to/site

# Dwufazowy plan publikacji
make publish-dry-run TARGET=/path/to/site
```

Zastosowanie wymaga dokładnego `plan_hash` z dry-run oraz jawnego,
jednorazowego grantu. Tryb apply nie przechodzi w symulowany sukces, gdy API
administracyjne jest niedostępne:

```bash
export URIRUN_APPLY_GRANT='wartosc-z-bezpiecznego-zrodla'
node src/publish.mjs /path/to/site --apply --plan-hash '<hash-z-dry-run>'
```
