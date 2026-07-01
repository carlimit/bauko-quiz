# BauKo II · Lernquiz

Ein Quiz + Lernkarten-Web-App zur **Baukonstruktion II** (DHBW Mosbach, Prof. Dr.-Ing. Reiner Hofmann), erzeugt aus den Vorlesungs- und Übungsskripten.

- **233 Quizfragen** (Single-Choice, mit Sofort-Feedback & Erklärung)
- **274 Lernkarten** (umdrehen, selbst „Gewusst / Nicht gewusst" bewerten)
- Themen: Einwirkungen (Grundlagen · Schnee/Wind/Lastkombination), Holzbau & Brettsperrholz (CLT), Flachdach, Fenster & Fassaden, Verbundträger & Tragwerk
- Bilder: reale Fotos (Blockbau, Skelettbau, Fachwerk, Glasfassade) + selbst erstellte Diagramme (CLT-Aufbau, Lastarten, Pfosten-Riegel, Verbundträger, Warm-/Kaltdach)
- Läuft auf **Handy, iPad und PC**, hell/dunkel automatisch, komplett **offline**, Fortschritt wird lokal im Browser gespeichert

> **Hinweis zum Lernen:** Die Fragen sind bewusst **konzeptorientiert** – konkrete Zahlen/Normwerte muss man nicht auswendig können. Inhalte wurden automatisch aus den Skripten erzeugt; bei Zweifeln im Skript gegenprüfen.

## Sofort benutzen (lokal)

Einfach die Datei **`index.html`** im Browser öffnen (Doppelklick). Es wird kein Server benötigt.

## Auf GitHub veröffentlichen (kostenlos, als Webseite)

1. Auf [github.com](https://github.com) einloggen → **New repository** → Name z. B. `bauko-quiz` → **Create**.
2. **Add file → Upload files**: den **gesamten Inhalt dieses Ordners** hineinziehen
   (also `index.html`, die Ordner `css/`, `js/`, `img/`, sowie `.nojekyll`) → **Commit**.
3. Im Repository **Settings → Pages**:
   - *Source:* „Deploy from a branch"
   - *Branch:* `main`, Ordner `/ (root)` → **Save**.
4. Nach ~1 Minute ist das Quiz erreichbar unter:
   `https://<dein-benutzername>.github.io/bauko-quiz/`

Diesen Link kannst du auf dem Handy als Lesezeichen / zum Home-Bildschirm hinzufügen.

## Bedienung

**Start:** Modus (Quiz oder Lernkarten) wählen → Themen antippen (Mehrfachauswahl, „Alle") → Umfang (10/20/30/Alle) → *Los geht's*.

**Quiz:** Antwort antippen → sofort grün/rot + Erklärung → *Weiter*. Am PC: Tasten **1–4** für Antworten, **Enter** für Weiter. Am Ende: Auswertung pro Thema + Liste der falschen Fragen + **„Nur falsche wiederholen"**.

**Lernkarten:** Karte antippen zum Umdrehen → **Gewusst / Nicht gewusst**. Nicht gewusste Karten kommen in derselben Runde erneut. Am PC: **Leertaste** umdrehen, **J / N** (oder Pfeil rechts/links) bewerten.

## Eigene Fragen ergänzen / ändern

- **Textfragen & Lernkarten:** in `js/data.js` im Feld `quiz` bzw. `flashcards`.
  - Quiz: `{ "topic": "...", "q": "...", "options": ["…","…","…","…"], "answer": 0, "explanation": "…" }`
    (`answer` = 0-basierter Index der richtigen Option)
  - Lernkarte: `{ "topic": "...", "front": "…", "back": "…" }`
- **Fragen/Karten mit Bild** und die **Titelbilder pro Thema:** in `js/media.js`
  (Feld `image` zeigt auf eine Datei in `img/`).
- Neue Bilder einfach in `img/` ablegen und im `image`-Feld referenzieren.

`data.js` wird aus den Skripten generiert; Handänderungen dort bleiben erhalten, solange nicht neu generiert wird.

## Globale Bestenliste (Supabase)

Die Bestenliste läuft über eine kostenlose Supabase-Datenbank. Nach jedem Quiz kann man seinen Namen eintragen; die Liste ist für alle sichtbar (sortiert nach richtigen Antworten).

- Zugangsdaten stehen in **`js/config.js`** (`supabaseUrl` + `supabaseKey`). Der Key ist der öffentliche „publishable"/anon-Key – er darf im Code stehen.
- Tabelle + Sicherheitsregeln (nur Lesen & gültiges Eintragen erlaubt) wurden per SQL angelegt (siehe unten).
- **Scores zurücksetzen:** in Supabase → SQL Editor → `delete from public.scores;`
- Sind die Werte in `config.js` leer, läuft das Quiz normal weiter – nur ohne globale Liste.

<details><summary>SQL zum Anlegen der Tabelle</summary>

```sql
create table if not exists public.scores (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 24),
  correct int not null check (correct >= 0),
  total int not null check (total > 0),
  percent int not null check (percent between 0 and 100),
  created_at timestamptz not null default now()
);
alter table public.scores enable row level security;
create policy "read_all"  on public.scores for select using (true);
create policy "insert_ok" on public.scores for insert
  with check (char_length(name) between 1 and 24 and total > 0 and correct <= total);
```
</details>

## Projektstruktur

```
bauko-quiz/
├─ index.html          Oberfläche / Screens
├─ css/style.css       Styling (responsive, hell/dunkel)
├─ js/config.js        Supabase-Zugangsdaten für die Bestenliste
├─ js/data.js          generierte Fragen + Lernkarten
├─ js/media.js         Bild-Fragen/-Karten + Themenbilder
├─ js/leaderboard.js   Anbindung an die Bestenliste
├─ js/app.js           App-Logik (Quiz, Lernkarten, Fortschritt)
├─ img/                Fotos + SVG-Diagramme
├─ .nojekyll           für GitHub Pages
└─ README.md
```
