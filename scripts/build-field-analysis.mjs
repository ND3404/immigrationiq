// Generates src/i130-engine/data/fieldAnalysis.md from fields.raw.json.
// Derives plain-language labels by parsing USCIS LiveCycle naming conventions
// like `form1[0].#subform[0].Pt2Line11_SSN[0]`.
import { readFileSync, writeFileSync } from 'node:fs';

const FORM_EDITION = '04/01/24';
const OMB = '1615-0012 (expires 02/28/2027)';
const SOURCE_URL = 'https://www.uscis.gov/sites/default/files/document/forms/i-130.pdf';

const PART_TITLES = {
  '1': 'Part 1 — Relationship (type of family relationship being petitioned)',
  '2': 'Part 2 — Information about you (the Petitioner)',
  '3': 'Part 3 — Biographic information (Petitioner)',
  '4': 'Part 4 — Information about the Beneficiary',
  '5': 'Part 5 — Other information (prior petitions, etc.)',
  '6': "Part 6 — Petitioner's statement, contact info, certification, and signature",
  '7': "Part 7 — Interpreter's contact info, certification, and signature",
  '8': "Part 8 — Contact info, declaration, and signature of person preparing this petition (if other than the petitioner)",
  '9': 'Part 9 — Additional information (continuation pages)',
  OTHER: 'Header / attorney / preparer / system fields',
};

// Token -> plain-language hint dictionary. Order matters (longest match wins).
const TOKENS = [
  ['FamilyName', 'Family Name (Last Name)'],
  ['GivenName', 'Given Name (First Name)'],
  ['MiddleName', 'Middle Name'],
  ['DateOfBirth', 'Date of Birth'],
  ['DateofBirth', 'Date of Birth'],
  ['CountryofBirth', 'Country of Birth'],
  ['CountryOfBirth', 'Country of Birth'],
  ['CityTownOfBirth', 'City/Town of Birth'],
  ['CityTownOrVillageOfResidence', 'City/Town/Village of Residence'],
  ['CountryOfResidence', 'Country of Residence'],
  ['StreetNumberName', 'Street Number and Name'],
  ['AptSteFlrNumber', 'Apt / Ste / Flr number'],
  ['CityOrTown', 'City or Town'],
  ['CityTown', 'City or Town'],
  ['PostalCode', 'Postal Code'],
  ['ZipCode', 'ZIP Code'],
  ['NumberofMarriages', 'Number of Marriages'],
  ['DateOfMarriage', 'Date of Marriage'],
  ['DateMarriageEnded', 'Date Marriage Ended'],
  ['DateofSignature', 'Date of Signature'],
  ['DateOfSignature', 'Date of Signature'],
  ['DateFrom', 'Date From'],
  ['DateTo', 'Date To'],
  ['DateOfAdmission', 'Date of Admission'],
  ['ClassOfAdmission', 'Class of Admission'],
  ['DateOfIssuance', 'Date of Issuance'],
  ['PlaceOfIssuance', 'Place of Issuance'],
  ['CertificateNumber', 'Certificate Number'],
  ['AlienNumber', 'A-Number (Alien Registration Number)'],
  ['USCISOnlineActNumber', 'USCIS Online Account Number'],
  ['USCISOnlineAcctNumber', 'USCIS Online Account Number'],
  ['DaytimePhoneNumber', 'Daytime Telephone Number'],
  ['MobilePhoneNumber', 'Mobile Telephone Number'],
  ['MobileNumber', 'Mobile Telephone Number'],
  ['EmailAddress', 'Email Address'],
  ['Email', 'Email Address'],
  ['EmployerOrCompName', 'Employer or Company Name'],
  ['EmployerOrOrgName', 'Employer or Organization Name'],
  ['BusinessName', 'Business Name'],
  ['Occupation', 'Occupation'],
  ['DateEmploymentBegan', 'Date Employment Began'],
  ['HeightFeet', 'Height (feet)'],
  ['HeightInches', 'Height (inches)'],
  ['EyeColor', 'Eye Color (option)'],
  ['HairColor', 'Hair Color (option)'],
  ['Ethnicity', 'Ethnicity (option)'],
  ['Race', 'Race (option)'],
  ['Pound1', 'Weight (lbs) digit 1'],
  ['Pound2', 'Weight (lbs) digit 2'],
  ['Pound3', 'Weight (lbs) digit 3'],
  ['MaritalStatus', 'Marital Status (option)'],
  ['Married', 'Marital Status = Married'],
  ['Single', 'Marital Status = Single'],
  ['Divorced', 'Marital Status = Divorced'],
  ['Widowed', 'Marital Status = Widowed'],
  ['Separated', 'Marital Status = Separated'],
  ['Annulled', 'Marital Status = Annulled'],
  ['Male', 'Sex = Male'],
  ['Female', 'Sex = Female'],
  ['USCitizen', 'Petitioner status = U.S. Citizen'],
  ['LPR', 'Petitioner status = Lawful Permanent Resident'],
  ['Spouse', 'Relationship = Spouse'],
  ['Parent', 'Relationship = Parent'],
  ['Child', 'Relationship = Child'],
  ['Siblings', 'Relationship = Sibling'],
  ['InWedlock', 'Child type = In Wedlock'],
  ['OutOfWedlock', 'Child type = Out of Wedlock'],
  ['Stepchild', 'Child type = Stepchild / Stepparent'],
  ['AdoptedChild', 'Child type = Adopted Child'],
  ['PassportNumber', 'Passport Number'],
  ['TravelDocNumber', 'Travel Document Number'],
  ['CountryOfIssuance', 'Country of Issuance'],
  ['ExpDate', 'Expiration Date'],
  ['DateExpired', 'Date Authorized Stay Expired'],
  ['ArrivalDeparture', 'Form I-94 Arrival/Departure Record Number'],
  ['DateOfArrival', 'Date of Arrival'],
  ['NameOfCompany', 'Name of Company / Employer'],
  ['Relationship', 'Relationship'],
  ['Result', 'Result'],
  ['DateFiled', 'Date Filed'],
  ['NameofLanguage', 'Name of Language (interpreter)'],
  ['Language', 'Language'],
  ['SSN', 'U.S. Social Security Number'],
  ['VolagNumber', 'Volag Number'],
  ['AttorneyStateBarNumber', 'Attorney State Bar Number'],
  ['PreparerFamilyName', 'Preparer Family Name'],
  ['PreparerGivenName', 'Preparer Given Name'],
  ['PreparerFaxNumber', 'Preparer Fax Number'],
  ['InterpreterFamilyName', 'Interpreter Family Name'],
  ['InterpreterGivenName', 'Interpreter Given Name'],
  ['InterpreterBusinessorOrg', 'Interpreter Business / Organization'],
  ['InterpreterDaytimeTelephone', 'Interpreter Daytime Telephone'],
  ['RepresentativeName', 'Representative Name'],
  ['Signature', 'Signature'],
  ['Province', 'Province'],
  ['Country', 'Country'],
  ['State', 'State'],
  ['Unit', 'Address unit type (Apt / Ste / Flr)'],
  ['Removal', 'Proceedings type = Removal'],
  ['Exclusion', 'Proceedings type = Exclusion / Deportation'],
  ['Rescission', 'Proceedings type = Rescission'],
  ['JudicialProceedings', 'Proceedings type = Judicial'],
  ['PageNumber', 'Page Number'],
  ['PartNumber', 'Part Number'],
  ['ItemNumber', 'Item Number'],
  ['AdditionalInfo', 'Additional Information (free text)'],
  ['Checkbox', 'Checkbox'],
  ['checkbox', 'Checkbox'],
  ['Yes', 'Answer = Yes'],
  ['No', 'Answer = No'],
  ['Unknown', 'Answer = Unknown'],
];

const PART_NOTES = {
  '1': "Single radio group decides the entire form's flow. Spouse, Parent, Child, or Sibling petitions each unlock different downstream requirements. Sub-questions cover child sub-type and whether the petitioner gained status through adoption.",
  '2': 'Largest petitioner section. Lines 13a/15a/13b/15b track address history; Lines 16-23 track marital history (prior spouses); Lines 24-35 capture parents; Lines 36-37 distinguish U.S. Citizen vs. LPR with conditional issuance details; Lines 40-47 capture employment history (last two employers).',
  '3': 'Biographic descriptors required for the petitioner (not the beneficiary on this form). Race is multi-select (up to 5 boxes). Eye/Hair color are single-select option groups.',
  '4': 'Mirrors Part 2 for the beneficiary, plus additional sections specific to the beneficiary: prior immigration status, I-94 / passport / travel doc info, removal proceedings, employment, and a roster of the beneficiary\'s spouse + up to 4 children (Lines 30-49).',
  '5': 'Have you ever filed a previous Form I-130 petition for any beneficiary? If yes, record who/where/when/result.',
  '6': "Petitioner's certification: did the petitioner read English unaided, did an interpreter help, did a preparer help. Signature + date.",
  '7': 'Filled only if an interpreter helped the petitioner. Interpreter identity, language, contact, signature.',
  '8': 'Filled only if a paid or unpaid preparer (other than the petitioner) prepared the form. Preparer identity, business, contact, attorney vs accredited rep checkbox, signature.',
  '9': 'Continuation pages for any answer that did not fit. Each entry tracks which Part / Item it expands.',
  OTHER: 'System-generated barcode fields (PDF417BarCode1 appears once per page) and the header block: attorney/representative bar number, Volag number, USCIS Online Account Number, and the G-28 checkbox.',
};

const CONDITIONAL_RULES = [
  ['Pt1Line2', "Required only if Part 1 relationship = Child / Parent (child sub-type)."],
  ['Pt1Line3', 'Required only if relationship is Child or Sibling (gained status through adoption?).'],
  ['Pt1Line4', 'Required only if petitioner is an LPR and gained status through adoption.'],
  ['Pt2Line12', 'Required only if mailing address differs from physical address (Line 10).'],
  ['Pt2Line14', "Required only if the petitioner's prior physical address (within last 5 years) differs from current."],
  ['Pt2Line17', 'Annulled / Divorced / Widowed branches require prior-spouse details on Lines 20-23.'],
  ['Pt2Line20', 'Required only if the petitioner has been married before (Line 16 > 1).'],
  ['Pt2Line36', 'Lines 37a-37c required only if Petitioner = U.S. Citizen via Naturalization or Certificate.'],
  ['Pt4Line12', 'Safe-mailing address (in-care-of) required only if different from physical address.'],
  ['Pt4Line17', "Beneficiary's prior-marriage history required only if Line 17 > 1."],
  ['Pt4Line20', 'EWI / I-94 details required only if beneficiary is currently in the U.S.'],
  ['Pt4Line30-49', 'Children of beneficiary required only if beneficiary has children (up to 5 may be listed).'],
  ['Pt4Line54', 'Removal / exclusion proceedings details required only if beneficiary has ever been in such proceedings.'],
  ['Pt6Line1b', 'Language of interpretation required only if an interpreter helped.'],
  ['Pt7', 'Entire Part 7 required only if an interpreter helped (toggled in Part 6).'],
  ['Pt8', 'Entire Part 8 required only if a preparer other than the petitioner helped.'],
];

// Match longer tokens first so "AdoptedChild" beats "Child".
TOKENS.sort((a, b) => b[0].length - a[0].length);

const dump = JSON.parse(readFileSync('src/i130-engine/data/fields.raw.json', 'utf8'));

// ---- Helpers --------------------------------------------------------------

function parseName(name) {
  // form1[0].#subform[0].Pt2Line11_SSN[0]
  const tail = name.split('.').slice(-1)[0].replace(/\[\d+\]$/, '');
  const m = tail.match(/^(?:Pt|Part)?(\d+)?_?Line(\d+[a-z]?)_?(.*)$/i) || tail.match(/^Pt(\d+)Line(\d+[a-z]?)_?(.*)$/i);
  if (m) return { part: m[1] || null, line: m[2], suffix: m[3] || '', tail };
  // alternate pattern Pt2_L1_... or P4Line5a_...
  const m2 = tail.match(/^P(\d+)Line(\d+[a-z]?)_?(.*)$/i);
  if (m2) return { part: m2[1], line: m2[2], suffix: m2[3] || '', tail };
  return { part: null, line: null, suffix: '', tail };
}

function plainLabel(suffix, tail) {
  const target = suffix || tail;
  for (const [token, label] of TOKENS) {
    if (target.includes(token)) return label;
  }
  return target ? `(${target})` : '(unnamed)';
}

function uiType(f) {
  if (f.type === 'Tx') return f.multiline ? 'multiline text' : 'text';
  if (f.type === 'Ch') return f.combo ? 'dropdown' : 'list';
  if (f.type === 'Btn') {
    if (f.checkBox) return 'checkbox';
    if (f.radioButton) return 'radio';
    return 'button';
  }
  if (f.type === 'Sig') return 'signature';
  return f.type || 'unknown';
}

function inferConditional(parsed) {
  if (!parsed.part || !parsed.line) return '';
  const lineDigits = parsed.line.replace(/[a-z]$/, '');
  const tag = `Pt${parsed.part}Line${lineDigits}`;
  for (const [match, note] of CONDITIONAL_RULES) {
    // Exact part+line match
    if (match === tag) return note;
    // Whole-part match like "Pt7" or "Pt8"
    if (match === `Pt${parsed.part}`) return note;
    // Range match like "Pt4Line30-49"
    const range = match.match(/^Pt(\d+)Line(\d+)-(\d+)$/);
    if (range && range[1] === parsed.part) {
      const n = parseInt(lineDigits, 10);
      if (n >= parseInt(range[2], 10) && n <= parseInt(range[3], 10)) return note;
    }
  }
  return '';
}

// ---- Group fields by Part -------------------------------------------------

const groups = {};
for (const f of dump) {
  const parsed = parseName(f.name);
  const partKey = parsed.part ? parsed.part : 'OTHER';
  (groups[partKey] ||= []).push({ ...f, parsed });
}

// ---- Render markdown ------------------------------------------------------

const out = [];
out.push('# USCIS Form I-130 — Field Analysis');
out.push('');
out.push(`- **Form edition:** ${FORM_EDITION}`);
out.push(`- **OMB:** ${OMB}`);
out.push(`- **Source:** ${SOURCE_URL}`);
out.push('- **Local copy:** `src/i130-engine/data/uscis-i130-form.pdf`');
out.push('- **PDF generator:** Adobe LiveCycle Designer 6.5 (XFA-hybrid AcroForm)');
out.push(`- **Pages:** 12`);
out.push(`- **Total unique form fields:** ${dump.length}`);
out.push('');
out.push('## Why this file exists');
out.push('');
out.push('This is the source of truth for what the official PDF can hold. Every intake question we design (`intake/intakeSchema.js`) must trace back to one or more of the field names listed below, and the mapping in `mapping/fieldMapping.json` is the bridge between the two.');
out.push('');
out.push('Field names follow LiveCycle convention: `form1[0].#subform[0].Pt<N>Line<X><suffix>_<FieldName>[0]`. We only need the leaf — pdf-lib lets us address fields by full name when filling.');
out.push('');
out.push('## Summary by Part');
out.push('');
out.push('| Part | Title | Field count |');
out.push('| ---- | ----- | -----------:|');
const partOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'OTHER'];
for (const p of partOrder) {
  const list = groups[p] || [];
  if (!list.length) continue;
  out.push(`| ${p} | ${PART_TITLES[p]} | ${list.length} |`);
}
out.push('');
out.push('## Field-type breakdown');
out.push('');
const typeCounts = {};
for (const f of dump) {
  const t = uiType(f);
  typeCounts[t] = (typeCounts[t] || 0) + 1;
}
out.push('| UI type | Count |');
out.push('| ------- | -----:|');
for (const [k, v] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
  out.push(`| ${k} | ${v} |`);
}
out.push('');

// Per-part sections
for (const p of partOrder) {
  const list = groups[p] || [];
  if (!list.length) continue;
  out.push(`## ${PART_TITLES[p]}`);
  out.push('');
  out.push(`*Field count:* **${list.length}**.`);
  out.push('');
  if (PART_NOTES[p]) {
    out.push(`**Notes.** ${PART_NOTES[p]}`);
    out.push('');
  }

  out.push('| Internal name (leaf) | Plain-language | UI type | Conditional? |');
  out.push('| -------------------- | -------------- | ------- | ------------ |');
  for (const f of list) {
    const leaf = f.name.split('.').slice(-1)[0];
    const label = plainLabel(f.parsed.suffix, f.parsed.tail);
    const t = uiType(f);
    const cond = inferConditional(f.parsed) || '—';
    // Escape pipes in case any sneak in
    const esc = (s) => String(s).replace(/\|/g, '\\|');
    out.push(`| \`${esc(leaf)}\` | ${esc(label)} | ${esc(t)} | ${esc(cond)} |`);
  }
  out.push('');
}

out.push('## Conditional logic — rules of thumb');
out.push('');
for (const [match, note] of CONDITIONAL_RULES) {
  out.push(`- **${match}:** ${note}`);
}
out.push('');

out.push('## Regenerating');
out.push('');
out.push('This file is generated. To rebuild after replacing the PDF:');
out.push('');
out.push('```sh');
out.push('node scripts/extract-i130-fields.mjs    # regenerates data/fields.raw.json');
out.push('node scripts/build-field-analysis.mjs   # regenerates this file');
out.push('```');
out.push('');

writeFileSync('src/i130-engine/data/fieldAnalysis.md', out.join('\n'));
console.log(`Wrote src/i130-engine/data/fieldAnalysis.md (${out.length} lines)`);
