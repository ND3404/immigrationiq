# I-130 Field Mapping — Notes

This document is the human-readable companion to `fieldMapping.json`. It explains why the mapping is shaped the way it is, what each `kind` means, and where the conditional logic lives.

## Big picture

```
intakeSchema.js  ──answers──▶  fieldMapping.json  ──field-values──▶  pdfFiller.js  ──▶  filled I-130 PDF
     (UI)                          (this layer)                          (Session 5)
```

- **Intake** is what the human sees and answers (bilingual, friendly labels).
- **Mapping** is how each answer becomes one or more USCIS field assignments.
- **Filling** (Session 5) is mechanical: open the PDF, look up the field by name, write the value or check the box.

The mapping is intentionally **declarative JSON**, not code, so:
- It can be diffed cleanly when USCIS updates the form.
- A future re-mapper (for the next form edition) doesn't need JS knowledge.
- Tests can validate every PDF field name against `data/fields.raw.json`.

## Field reference

Source of truth for every PDF field: `src/i130-engine/data/fieldAnalysis.md`. The raw dump is at `src/i130-engine/data/fields.raw.json` (450 unique fields, edition 04/01/24).

### Leaf-name convention

The mapping references fields by their **leaf name** (e.g., `Pt2Line4a_FamilyName[0]`) rather than the full LiveCycle path (`form1[0].#subform[1].Pt2Line4a_FamilyName[0]`). Reasons:

1. **Robustness.** USCIS re-edits split a Part across multiple `#subform[N]` siblings between revisions; the leaf is stable.
2. **Verifiability.** Of the 450 fields in the PDF, 439 leaves are unique. The only duplicate is `PDF417BarCode1[0]` (the per-page barcode), which we never write.
3. **Readability.** The full path is ~12 nested tokens. The leaf is the part a human can spot in the form preview.

`output/pdfFiller.js` (Session 5) resolves each leaf back to its full path at fill time using `data/fields.raw.json` as the lookup table. `scripts/validate-mapping.mjs` guards against typos and accidental ambiguity.

## `kind` taxonomy

| kind | meaning |
| ---- | ------- |
| `text` | Plain-text field. Either `field` (one PDF field) or `fields` (write the same value to multiple — used for A-Number which appears twice on Pt2 Line 1). |
| `date` | Same shape as `text`, but the filler formats as `MM/DD/YYYY`. |
| `radio-fanout` | Intake answer is a single value; the PDF has one checkbox per option. The filler checks the matching box and leaves the others unchecked. |
| `multi-checkbox` | Intake answer is a set of values; check each corresponding PDF box. (Used in Part 3 race, where USCIS allows multiple races.) |
| `address-block` | Composite — writes a street/unit/city/state/zip group as one logical answer. (To be added in Session 2 for Step 4.) |
| `other-names-list` | Repeating row pattern. PDF only has one row of name fields on Pt2 Line 5; overflow spills to Part 9 continuation. |
| `internal` | Recorded in intake but NOT written to the PDF directly. Either drives conditional logic for other questions (e.g., `usc_acquisition`) or feeds the cover-letter/evidence prompts (Session 6). |
| `todo` | Placeholder for a future session. Keys begin with `__TODO_` so the build script can quickly count what's left. |

## `condition` syntax

```json
"condition": { "petitioner_status": "lpr" }
```
means: only fill these PDF fields when `answers.petitioner_status === 'lpr'`.

```json
"condition": { "usc_acquisition": ["naturalization", "parents_naturalization", "birth_abroad"] }
```
means: any value in that array satisfies the condition (logical OR within the key).

Multiple keys in the same `condition` object are joined with AND.

The intake layer ALSO has a `visible` and `required` predicate per question. They should agree with this mapping's `condition`. A Session 5 sanity-check test will diff them.

## Special transforms

| transform | meaning |
| --------- | ------- |
| `stripDashes` | `"123-45-6789"` → `"123456789"` before writing. SSN field on the PDF is digits only. |
| `stripLeadingA` | `"A123456789"` → `"123456789"`. USCIS prints the A on the form, so the field holds only the digits. |

These are implemented in `output/pdfFiller.js` (Session 5).

## Conditional logic — current coverage (Session 1)

Fully expressed in this mapping:

- **Relationship branch (Part 1):** `child_sub_type` only fills if `relationship_type ∈ {child, parent}`. `gained_status_via_adoption` only if `relationship_type ∈ {child, sibling}`. `lpr_via_adoption` only if both `petitioner_status === lpr` AND `gained_status_via_adoption === yes`.
- **Petitioner status branch (Part 2 Lines 36, 37, 40, 41):** USC vs LPR split. Naturalization certificate fields only fill for non-birth-in-US acquisitions. LPR admission and marriage-derived-status fields only fill for LPRs.

## Conditional logic — TODO (later sessions)

- **Address history (Pt2 Lines 12, 14):** Lines 12 (mailing address) only fill if "mailing differs from physical". Line 14 (prior address) only fills if petitioner moved within the past 5 years.
- **Marital history (Pt2 Lines 17-23):** Marital-status checkboxes always fill. Prior-spouse blocks (Lines 20-23) only fill if the petitioner has been married more than once.
- **Beneficiary marital history (Pt4 Lines 17-19):** Mirrors above for the beneficiary.
- **Beneficiary in-the-US block (Pt4 Lines 20-28):** Only fills if beneficiary is currently in the U.S. Different sub-branches by class of admission.
- **Removal proceedings (Pt4 Line 54):** Only fills if beneficiary has ever been in such proceedings.
- **Beneficiary children (Pt4 Lines 30-49):** Repeating block, up to 5 rows. Anything past 5 spills to Part 9.
- **Interpreter (Part 7) / Preparer (Part 8):** Each entire part only fills if the corresponding flag is set in Part 6.

## Validation rules to add (Session 2)

- A-Number must match `^A?\d{7,9}$`.
- SSN must match `^\d{3}-?\d{2}-?\d{4}$`.
- All dates must parse as valid Gregorian dates and not be in the future (except `lpr_date_of_admission` which can be very old).
- Country of birth: validate against an enum derived from the State Department country list. (Defer to a `data/countries.js` lookup in Session 2.)

## How the filler (Session 5) will use this file

Pseudocode for the filler:

```
for each intake question id:
  m = mappings[id]
  if condition(m) is false against answers: skip
  switch m.kind:
    case 'text' or 'date':
      pdf.setText(m.field, transform(answer))
    case 'radio-fanout':
      for [optionValue, opt] of m.options:
        if optionValue === answer: pdf.check(opt.check)
        else: pdf.uncheck(opt.check)
    case 'multi-checkbox':
      for v of answer: pdf.check(m.options[v].check)
    case 'internal' or 'todo':
      skip
```

## Sanity checks (to wire up in Session 5)

1. Every `field` / `check` referenced here exists in `data/fields.raw.json`.
2. Every intake question id from `intakeSchema.js` either has an entry here OR is explicitly listed as `internal`.
3. Every USCIS field has at most one source of truth (no two mapping entries write the same field).

These will live in `scripts/validate-mapping.mjs` (TODO Session 5).
