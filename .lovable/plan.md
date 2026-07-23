# Plan: Live Web Research für Compound Prospect Research Agent

## Ziel
Die App bekommt echten Live-Web-Zugang: Nutzer gibt Firmenname/URL ein, der Agent recherchiert live im Web und generiert daraus einen strukturierten Sales-Brief für Compound Law.

## Aktueller Zustand
- `src/lib/generateBrief.ts` ist ein reiner Mock/Placeholder.
- Es gibt 4 statische Demo-Briefe in `src/data/sampleBriefs.ts`.
- Für unbekannte Eingaben wird ein generischer Fallback-Brief zurückgegeben.
- Keine externe API, keine Server-Funktion, keine Persistenz.

## Vorgeschlagene Lösung

### 1. Connector einrichten
- **Firecrawl** als Web-Data-Connector verbinden (Lovable Standard-Connector).
- Firecrawl liefert Web-Search, Website-Scraping und strukturierte Datenextraktion in einem.
- Kombination mit dem **Lovable AI Gateway** zur Synthese in das Brief-Schema.

### 2. Backend: Server-Funktionen hinzufügen
Neue Datei `src/lib/research.functions.ts` mit zwei `createServerFn`:
- `researchCompany(input)`
  - Nutzt Firecrawl `/v2/search`, um aktuelle Web-Ergebnisse zum Unternehmen zu finden.
  - Nutzt Firecrawl `/v2/scrape` auf der vermuteten Firmenwebsite (inkl. `branding`, `markdown`, `links`).
  - Kombiniert beide Quellen zu einem Roh-Recherche-String.
- `generateBriefFromResearch(research)`
  - Ruft das Lovable AI Gateway (`generateText` / `streamText` mit `Output.object`) auf.
  - Prompt ist auf Compound Law's ICP und Verkaufskontext zugeschnitten (AI Act, GDPR, Enterprise-Verträge, US-Expansion, Hiring-Signale).
  - Gibt ein valides `Brief`-Objekt zurück.

### 3. Frontend: generateBrief ersetzen
- `src/lib/generateBrief.ts` wird zu einem Client-Wrapper, der `useServerFn(researchCompany)` und `useServerFn(generateBriefFromResearch)` aufruft.
- Ergebnis wird an `BriefReport` übergeben.
- Demo-Briefe bleiben als schnelle Vorschau/Beispiele erhalten.

### 4. UX-Anpassungen
- Ladezustand in `src/routes/brief.$slug.tsx` verbessern: Schritt-fortschritt ("Suche Webquellen …", "Scrape Website …", "Synthetisiere Briefing …").
- Fehlerbehandlung für leere/unbekannte Eingaben, API-Fehler, Rate-Limits.
- "Recent"-Sidebar befüllt aus `localStorage`, nicht mehr nur aus statischen Beispielen.

### 5. Persistenz
- Generierte Briefe werden in `localStorage` unter einem `compound-recent-briefs`-Key gespeichert.
- "Saved"-View ermöglicht Markieren/Entmarkieren.

### 6. Head-Metadaten
- Jede Route behält ihren `head()`; `/brief/$slug` bekommt dynamischen Titel (`{company} — Compound Prospect Brief`).

## Technische Details
- Stack: TanStack Start + `createServerFn`.
- Firecrawl via Connector-Gateway (`https://connector-gateway.lovable.dev/firecrawl/v2`) mit `LOVABLE_API_KEY` + `FIRECRAWL_API_KEY`.
- AI Gateway via AI SDK (`@ai-sdk/react-start` bzw. `generateText`/`streamText`).
- Keine Edge Functions nötig — alles über Server Functions.
- Keine Datenbank nötig für Recent/Saved; `localStorage` reicht für ein internes Tool.

## Offene Frage an dich
Soll ich Firecrawl verwenden, oder bevorzugst du **Perplexity** als direkten AI-Search-Connector? Perplexity ist stärker bei der sofortigen Zusammenfassung, Firecrawl stärker bei gezieltem Website-Scraping + strukturierter Extraktion. Für Compound-Briefs empfehle ich Firecrawl + AI Gateway.

## Nächster Schritt
Wenn du dem Plan zustimmst, verbinde ich zuerst den Firecrawl-Connector und baue dann die Server-Funktionen.