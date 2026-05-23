# I-130 Engine

The interactive Form I-130 drafter. The goal is for a U.S. citizen or LPR to answer plain-English (or plain-Spanish) questions and walk away with:

1. A filled official USCIS Form I-130 PDF (edition 04/01/24, OMB 1615-0012).
2. A petitioner-specific cover letter.
3. A petitioner-specific evidence checklist.

> **Status — Session 1 of ~10 — architecture only.**
> Nothing here is wired into the public site yet. The production `/i-130` route still renders the Coming Soon page (`src/pages/I130ComingSoon.jsx`); we will swap it in only once the engine ships end-to-end.

## Architecture — three thin layers

```
┌──────────────────┐    ┌────────────────────┐    ┌──────────────────────┐
│  intake          │ ─▶ │  mapping           │ ─▶ │  output              │
│  (what to ask)   │    │  (Q → USCIS field) │    │  (filled PDF + AI    │
│                  │    │                    │    │   cover + evidence)  │
└──────────────────┘    └────────────────────┘    └──────────────────────┘
   intakeSchema.js         fieldMapping.json         pdfFiller.js
   IntakeWizard.jsx        mappingNotes.md           coverLetterPrompt.js
   steps/                                            evidenceChecklistPrompt.js
```

Each layer can be developed and tested in isolation:

- **Intake** is pure data. The wizard reads it; the wizard does not own it.
- **Mapping** is pure JSON. Diffs cleanly when USCIS updates the form.
- **Output** turns answers into deliverables.

## Folder map

```
src/i130-engine/
├── README.md                         (this file)
├── intake/
│   ├── intakeSchema.js               Steps 1-3 fully fleshed, 4-10 scaffolded
│   ├── IntakeWizard.jsx              Stub — Session 2
│   └── steps/                        Individual step components — Session 2
├── mapping/
│   ├── fieldMapping.json             Steps 1-3 mapped, rest are __TODO_ entries
│   └── mappingNotes.md               Human-readable companion to the JSON
├── output/
│   ├── pdfFiller.js                  Stub — Session 5
│   ├── coverLetterPrompt.js          Stub — Session 6
│   └── evidenceChecklistPrompt.js    Stub — Session 6
└── data/
    ├── uscis-i130-form.pdf           Official USCIS PDF (edition 04/01/24)
    ├── fields.raw.json               Generated — 450 form fields w/ types
    ├── fieldAnalysis.md              Human-readable field reference (generated)
    └── pages.text.txt                Generated — extracted PDF text for grep
```

The two `scripts/extract-i130-*.mjs` files in the repo root regenerate `fields.raw.json` and `pages.text.txt`; `scripts/build-field-analysis.mjs` rebuilds `fieldAnalysis.md`.

## Session roadmap

| # | Goal | Touches |
|---|------|---------|
| **1** ✅ | Architecture + field analysis + intake schema (Steps 1-3) + skeleton mapping | this folder + `scripts/` |
| 2 | `IntakeWizard.jsx` shell, persistence, validation, render Steps 1-3 | `intake/` |
| 3 | Flesh out intake schema for Steps 4-6 (petitioner address, employment, beneficiary identity) + matching mapping entries | `intake/`, `mapping/` |
| 4 | Steps 7-9 (beneficiary status, relationship details, beneficiary family). Conditional branching by relationship type fully implemented. | `intake/`, `mapping/` |
| 5 | `pdfFiller.js` — fill the USCIS PDF using `fieldMapping.json`. Decide pdf-lib vs alternative writer for the XFA-hybrid PDF. | `output/`, `scripts/` |
| 6 | `coverLetterPrompt.js` + `evidenceChecklistPrompt.js` — Claude prompts and end-to-end generation. | `output/` |
| 7 | Review step UI + diff view + download bundle (PDF + cover + checklist) | `intake/`, `output/` |
| 8 | Integrate auth + payment gate (Stripe is already in deps) | new files at top of `src/` |
| 9 | Wire route — replace `/i-130` Coming Soon page with the engine for paid users | `src/App.jsx`, `src/pages/` |
| 10 | Polish, accessibility, bilingual QA, analytics, ship | everything |

## Running / testing the engine (as of Session 1)

The engine has no public route yet. To exercise the intake schema and mapping locally:

```sh
# Regenerate the field dump from the PDF
node scripts/extract-i130-fields.mjs

# Rebuild the human-readable field analysis
node scripts/build-field-analysis.mjs

# Sanity-check that the schema and mapping parse
node -e "import('./src/i130-engine/intake/intakeSchema.js').then(m => console.log('Steps:', m.default.steps.length))"
node -e "console.log(Object.keys(require('./src/i130-engine/mapping/fieldMapping.json').mappings).length, 'mapping entries')"

# Verify every PDF field reference in the mapping resolves uniquely
node scripts/validate-mapping.mjs

# Make sure the production build still passes
npm run build
```

## Conventions

- **Bilingual.** Every user-visible string lives as `{ en, es }`. No exceptions.
- **Schema is data; UI is code.** Anything content-shaped goes into the schema or mapping. Anything behavior-shaped goes into a React component.
- **No silent assumptions about the PDF.** Every `field`/`check` reference in the mapping must trace back to `data/fields.raw.json`. A future `scripts/validate-mapping.mjs` will enforce that automatically.
- **Don't touch `/i-130`.** Until Session 9, the production route renders the Coming Soon page. The engine is invisible to end users.

## Known issues / decisions deferred to later sessions

- **PDF writer:** `pdf-lib` fails to *load* this PDF because the USCIS form is an Adobe LiveCycle XFA-hybrid. We can *read* fields fine via `pdfjs-dist`, but writing is unresolved — Session 5 must pick a path. Options: convert the PDF to a flat AcroForm with `qpdf --replace-input --object-streams=disable`, use a wasm-based writer like `pdfcpu`, or hand-write a small PDF object patcher targeting just the widget annotations we need.
- **Other-name overflow:** Pt2 Line 5 has only one row of name fields. Petitioners with multiple prior names must spill to Part 9. Session 7 will design the continuation-page generator.
- **Country lookup:** Country fields are free text on the PDF, but we should validate against a State Department enum to avoid typos. Add `src/i130-engine/data/countries.js` in Session 2.
- **Form edition watch:** Edition is hard-coded as `04/01/24`. Add a startup check that compares the PDF's stamped edition against `intakeSchema.meta.formEdition` and refuses to render the wizard on mismatch (Session 9).
