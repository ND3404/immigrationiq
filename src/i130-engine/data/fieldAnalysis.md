# USCIS Form I-130 — Field Analysis

- **Form edition:** 04/01/24
- **OMB:** 1615-0012 (expires 02/28/2027)
- **Source:** https://www.uscis.gov/sites/default/files/document/forms/i-130.pdf
- **Local copy:** `src/i130-engine/data/uscis-i130-form.pdf`
- **PDF generator:** Adobe LiveCycle Designer 6.5 (XFA-hybrid AcroForm)
- **Pages:** 12
- **Total unique form fields:** 450

## Why this file exists

This is the source of truth for what the official PDF can hold. Every intake question we design (`intake/intakeSchema.js`) must trace back to one or more of the field names listed below, and the mapping in `mapping/fieldMapping.json` is the bridge between the two.

Field names follow LiveCycle convention: `form1[0].#subform[0].Pt<N>Line<X><suffix>_<FieldName>[0]`. We only need the leaf — pdf-lib lets us address fields by full name when filling.

## Summary by Part

| Part | Title | Field count |
| ---- | ----- | -----------:|
| 1 | Part 1 — Relationship (type of family relationship being petitioned) | 12 |
| 2 | Part 2 — Information about you (the Petitioner) | 141 |
| 3 | Part 3 — Biographic information (Petitioner) | 30 |
| 4 | Part 4 — Information about the Beneficiary | 171 |
| 5 | Part 5 — Other information (prior petitions, etc.) | 7 |
| 6 | Part 6 — Petitioner's statement, contact info, certification, and signature | 9 |
| 7 | Part 7 — Interpreter's contact info, certification, and signature | 18 |
| 8 | Part 8 — Contact info, declaration, and signature of person preparing this petition (if other than the petitioner) | 23 |
| 9 | Part 9 — Additional information (continuation pages) | 20 |
| OTHER | Header / attorney / preparer / system fields | 19 |

## Field-type breakdown

| UI type | Count |
| ------- | -----:|
| text | 285 |
| checkbox | 128 |
| dropdown | 20 |
| multiline text | 17 |

## Part 1 — Relationship (type of family relationship being petitioned)

*Field count:* **12**.

**Notes.** Single radio group decides the entire form's flow. Spouse, Parent, Child, or Sibling petitions each unlock different downstream requirements. Sub-questions cover child sub-type and whether the petitioner gained status through adoption.

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `Pt1Line1_Spouse[0]` | Relationship = Spouse | checkbox | — |
| `Pt1Line1_Siblings[0]` | Relationship = Sibling | checkbox | — |
| `Pt1Line1_Parent[0]` | Relationship = Parent | checkbox | — |
| `Pt1Line1_Child[0]` | Relationship = Child | checkbox | — |
| `Pt1Line2_InWedlock[0]` | Child type = In Wedlock | checkbox | Required only if Part 1 relationship = Child / Parent (child sub-type). |
| `Pt1Line2_AdoptedChild[0]` | Child type = Adopted Child | checkbox | Required only if Part 1 relationship = Child / Parent (child sub-type). |
| `Pt1Line2_Stepchild[0]` | Child type = Stepchild / Stepparent | checkbox | Required only if Part 1 relationship = Child / Parent (child sub-type). |
| `Pt1Line2_OutOfWedlock[0]` | Child type = Out of Wedlock | checkbox | Required only if Part 1 relationship = Child / Parent (child sub-type). |
| `Pt1Line3_Yes[0]` | Answer = Yes | checkbox | Required only if relationship is Child or Sibling (gained status through adoption?). |
| `Pt1Line4_No[0]` | Answer = No | checkbox | Required only if petitioner is an LPR and gained status through adoption. |
| `Pt1Line4_Yes[0]` | Answer = Yes | checkbox | Required only if petitioner is an LPR and gained status through adoption. |
| `Pt1Line3_No[0]` | Answer = No | checkbox | Required only if relationship is Child or Sibling (gained status through adoption?). |

## Part 2 — Information about you (the Petitioner)

*Field count:* **141**.

**Notes.** Largest petitioner section. Lines 13a/15a/13b/15b track address history; Lines 16-23 track marital history (prior spouses); Lines 24-35 capture parents; Lines 36-37 distinguish U.S. Citizen vs. LPR with conditional issuance details; Lines 40-47 capture employment history (last two employers).

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `Pt2Line11_SSN[0]` | U.S. Social Security Number | text | — |
| `Pt2Line4a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt2Line4b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt2Line4c_MiddleName[0]` | Middle Name | text | — |
| `Pt2Line1_AlienNumber[0]` | A-Number (Alien Registration Number) | text | — |
| `Pt2Line2_USCISOnlineActNumber[0]` | USCIS Online Account Number | text | — |
| `Pt2Line8_DateofBirth[0]` | Date of Birth | text | — |
| `Pt2Line9_Male[0]` | Sex = Male | checkbox | — |
| `Pt2Line9_Female[0]` | Sex = Female | checkbox | — |
| `Pt2Line7_CountryofBirth[0]` | Country of Birth | text | — |
| `Pt2Line11_Yes[0]` | Answer = Yes | checkbox | — |
| `Pt2Line11_No[0]` | Answer = No | checkbox | — |
| `Pt2Line10_StreetNumberName[0]` | Street Number and Name | text | — |
| `Pt2Line10_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt2Line10_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt2Line10_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt2Line10_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | — |
| `Pt2Line10_CityOrTown[0]` | City or Town | text | — |
| `Pt2Line10_Province[0]` | Province | text | — |
| `Pt2Line10_PostalCode[0]` | Postal Code | text | — |
| `Pt2Line10_ZipCode[0]` | ZIP Code | text | — |
| `Pt2Line10_State[0]` | State | dropdown | — |
| `Pt2Line10_Country[0]` | Country | text | — |
| `Pt2Line10_InCareofName[0]` | (InCareofName) | text | — |
| `Pt2Line14_StreetNumberName[0]` | Street Number and Name | text | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_CityOrTown[0]` | City or Town | text | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_State[0]` | State | dropdown | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_ZipCode[0]` | ZIP Code | text | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_Province[0]` | Province | text | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_Country[0]` | Country | text | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line14_PostalCode[0]` | Postal Code | text | Required only if the petitioner's prior physical address (within last 5 years) differs from current. |
| `Pt2Line13a_DateFrom[0]` | Date From | text | — |
| `Pt2Line15a_DateFrom[0]` | Date From | text | — |
| `Pt2Line15b_DateTo[0]` | Date To | text | — |
| `Pt2Line12_StreetNumberName[0]` | Street Number and Name | text | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_CityOrTown[0]` | City or Town | text | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_State[0]` | State | dropdown | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_ZipCode[0]` | ZIP Code | text | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_Province[0]` | Province | text | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_Country[0]` | Country | text | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line12_PostalCode[0]` | Postal Code | text | Required only if mailing address differs from physical address (Line 10). |
| `Pt2Line6_CityTownOfBirth[0]` | City/Town of Birth | text | — |
| `Pt2Line5a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt2Line5b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt2Line5c_MiddleName[0]` | Middle Name | text | — |
| `Pt2Line16_NumberofMarriages[0]` | Number of Marriages | text | — |
| `Pt2Line17_Widowed[0]` | Marital Status = Widowed | checkbox | Annulled / Divorced / Widowed branches require prior-spouse details on Lines 20-23. |
| `Pt2Line17_Annulled[0]` | Marital Status = Annulled | checkbox | Annulled / Divorced / Widowed branches require prior-spouse details on Lines 20-23. |
| `Pt2Line17_Separated[0]` | Marital Status = Separated | checkbox | Annulled / Divorced / Widowed branches require prior-spouse details on Lines 20-23. |
| `Pt2Line17_Single[0]` | Marital Status = Single | checkbox | Annulled / Divorced / Widowed branches require prior-spouse details on Lines 20-23. |
| `Pt2Line17_Married[0]` | Marital Status = Married | checkbox | Annulled / Divorced / Widowed branches require prior-spouse details on Lines 20-23. |
| `Pt2Line17_Divorced[0]` | Marital Status = Divorced | checkbox | Annulled / Divorced / Widowed branches require prior-spouse details on Lines 20-23. |
| `Pt2Line13b_DateTo[0]` | Date To | text | — |
| `Pt2Line20b_GivenName[0]` | Given Name (First Name) | text | Required only if the petitioner has been married before (Line 16 > 1). |
| `Pt2Line20c_MiddleName[0]` | Middle Name | text | Required only if the petitioner has been married before (Line 16 > 1). |
| `Pt2Line23_DateMarriageEnded[0]` | Date Marriage Ended | text | — |
| `Pt2Line22c_MiddleName[0]` | Middle Name | text | — |
| `Pt2Line22b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt2Line22a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt2Line21_DateMarriageEnded[0]` | Date Marriage Ended | text | — |
| `Pt2Line18_DateOfMarriage[0]` | Date of Marriage | text | — |
| `Pt2Line24_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt2Line24_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt2Line24_MiddleName[0]` | Middle Name | text | — |
| `Pt2Line25_DateofBirth[0]` | Date of Birth | text | — |
| `Pt2Line28_CityTownOrVillageOfResidence[0]` | City/Town/Village of Residence | text | — |
| `Pt2Line29_CountryOfResidence[0]` | Country of Residence | text | — |
| `Pt2Line27_CountryofBirth[0]` | Country of Birth | text | — |
| `Pt2Line30b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt2Line30c_MiddleName[0]` | Middle Name | text | — |
| `Pt2Line30a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt2Line31_DateofBirth[0]` | Date of Birth | text | — |
| `Pt2Line34_CityTownOrVillageOfResidence[0]` | City/Town/Village of Residence | text | — |
| `Pt2Line35_CountryOfResidence[0]` | Country of Residence | text | — |
| `Pt2Line33_CountryofBirth[0]` | Country of Birth | text | — |
| `Pt2Line36_USCitizen[0]` | Petitioner status = U.S. Citizen | checkbox | Lines 37a-37c required only if Petitioner = U.S. Citizen via Naturalization or Certificate. |
| `Pt2Line36_LPR[0]` | Petitioner status = Lawful Permanent Resident | checkbox | Lines 37a-37c required only if Petitioner = U.S. Citizen via Naturalization or Certificate. |
| `Pt2Line23a_checkbox[0]` | Checkbox | checkbox | — |
| `Pt2Line23b_checkbox[0]` | Checkbox | checkbox | — |
| `Pt2Line23c_checkbox[0]` | Checkbox | checkbox | — |
| `Pt2Line37a_CertificateNumber[0]` | Certificate Number | text | — |
| `Pt2Line36_Yes[0]` | Answer = Yes | checkbox | Lines 37a-37c required only if Petitioner = U.S. Citizen via Naturalization or Certificate. |
| `Pt2Line36_No[0]` | Answer = No | checkbox | Lines 37a-37c required only if Petitioner = U.S. Citizen via Naturalization or Certificate. |
| `Pt2Line37c_DateOfIssuance[0]` | Date of Issuance | text | — |
| `Pt2Line37b_PlaceOfIssuance[0]` | Place of Issuance | text | — |
| `Pt2Line26_Male[0]` | Sex = Male | checkbox | — |
| `Pt2Line26_Female[0]` | Sex = Female | checkbox | — |
| `Pt2Line32_Male[0]` | Sex = Male | checkbox | — |
| `Pt2Line32_Female[0]` | Sex = Female | checkbox | — |
| `Pt2Line19a_CityTown[0]` | City or Town | text | — |
| `Pt2Line19b_State[0]` | State | dropdown | — |
| `Pt2Line19c_Province[0]` | Province | text | — |
| `Pt2Line19d_Country[0]` | Country | text | — |
| `Pt2Line40a_ClassOfAdmission[0]` | Class of Admission | text | — |
| `Pt2Line40b_DateOfAdmission[0]` | Date of Admission | text | — |
| `Pt2Line40d_CityOrTown[0]` | City or Town | text | — |
| `Pt2Line41_No[0]` | Answer = No | checkbox | — |
| `Pt2Line41_Yes[0]` | Answer = Yes | checkbox | — |
| `Pt2Line41_StreetNumberName[0]` | Street Number and Name | text | — |
| `Pt2Line41_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt2Line41_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt2Line41_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt2Line41_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | — |
| `Pt2Line41_CityOrTown[0]` | City or Town | text | — |
| `Pt2Line41_Province[0]` | Province | text | — |
| `Pt2Line41_PostalCode[0]` | Postal Code | text | — |
| `Pt2Line41_ZipCode[0]` | ZIP Code | text | — |
| `Pt2Line41_State[0]` | State | dropdown | — |
| `Pt2Line41_Country[0]` | Country | text | — |
| `Pt2Line40_EmployerOrCompName[0]` | Employer or Company Name | text | — |
| `Pt2Line45_StreetNumberName[0]` | Street Number and Name | text | — |
| `Pt2Line45_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt2Line45_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt2Line45_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt2Line45_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | — |
| `Pt2Line45_CityOrTown[0]` | City or Town | text | — |
| `Pt2Line45_Province[0]` | Province | text | — |
| `Pt2Line45_PostalCode[0]` | Postal Code | text | — |
| `Pt2Line45_ZipCode[0]` | ZIP Code | text | — |
| `Pt2Line45_State[0]` | State | dropdown | — |
| `Pt2Line45_Country[0]` | Country | text | — |
| `Pt2Line46_Occupation[0]` | Occupation | text | — |
| `Pt2Line47a_DateFrom[0]` | Date From | text | — |
| `Pt2Line47b_DateTo[0]` | Date To | text | — |
| `Pt2Line44_EmployerOrOrgName[0]` | Employer or Organization Name | text | — |
| `Pt2Line42_Occupation[0]` | Occupation | text | — |
| `Pt2Line43a_DateFrom[0]` | Date From | text | — |
| `Pt2Line43b_DateTo[0]` | Date To | text | — |
| `Pt2Line40e_State[0]` | State | dropdown | — |
| `Pt2Line1_AlienNumber[1]` | A-Number (Alien Registration Number) | text | — |
| `Pt2Line4a_FamilyName[1]` | Family Name (Last Name) | text | — |
| `Pt2Line4b_GivenName[1]` | Given Name (First Name) | text | — |
| `Pt2Line4c_MiddleName[1]` | Middle Name | text | — |

## Part 3 — Biographic information (Petitioner)

*Field count:* **30**.

**Notes.** Biographic descriptors required for the petitioner (not the beneficiary on this form). Race is multi-select (up to 5 boxes). Eye/Hair color are single-select option groups.

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `Pt3Line1_Ethnicity[0]` | Ethnicity (option) | checkbox | — |
| `Pt3Line1_Ethnicity[1]` | Ethnicity (option) | checkbox | — |
| `Pt3Line2_Race_Black[0]` | Race (option) | checkbox | — |
| `Pt3Line2_Race_AmericanIndianAlaskaNative[0]` | Race (option) | checkbox | — |
| `Pt3Line2_Race_White[0]` | Race (option) | checkbox | — |
| `Pt3Line2_Race_Asian[0]` | Race (option) | checkbox | — |
| `Pt3Line2_Race_NativeHawaiianOtherPacificIslander[0]` | Race (option) | checkbox | — |
| `Pt3Line3_HeightFeet[0]` | Height (feet) | dropdown | — |
| `Pt3Line3_HeightInches[0]` | Height (inches) | dropdown | — |
| `Pt3Line4_Pound1[0]` | Weight (lbs) digit 1 | text | — |
| `Pt3Line4_Pound2[0]` | Weight (lbs) digit 2 | text | — |
| `Pt3Line4_Pound3[0]` | Weight (lbs) digit 3 | text | — |
| `Pt3Line5_EyeColor[0]` | Eye Color (option) | checkbox | — |
| `Pt3Line5_EyeColor[1]` | Eye Color (option) | checkbox | — |
| `Pt3Line5_EyeColor[2]` | Eye Color (option) | checkbox | — |
| `Pt3Line5_EyeColor[3]` | Eye Color (option) | checkbox | — |
| `Pt3Line5_EyeColor[4]` | Eye Color (option) | checkbox | — |
| `Pt3Line5_EyeColor[5]` | Eye Color (option) | checkbox | — |
| `Pt3Line5_EyeColor[6]` | Eye Color (option) | checkbox | — |
| `Pt3Line5_EyeColor[7]` | Eye Color (option) | checkbox | — |
| `Pt3Line5_EyeColor[8]` | Eye Color (option) | checkbox | — |
| `Pt3Line6_HairColor[0]` | Hair Color (option) | checkbox | — |
| `Pt3Line6_HairColor[1]` | Hair Color (option) | checkbox | — |
| `Pt3Line6_HairColor[2]` | Hair Color (option) | checkbox | — |
| `Pt3Line6_HairColor[3]` | Hair Color (option) | checkbox | — |
| `Pt3Line6_HairColor[4]` | Hair Color (option) | checkbox | — |
| `Pt3Line6_HairColor[5]` | Hair Color (option) | checkbox | — |
| `Pt3Line6_HairColor[6]` | Hair Color (option) | checkbox | — |
| `Pt3Line6_HairColor[7]` | Hair Color (option) | checkbox | — |
| `Pt3Line6_HairColor[8]` | Hair Color (option) | checkbox | — |

## Part 4 — Information about the Beneficiary

*Field count:* **171**.

**Notes.** Mirrors Part 2 for the beneficiary, plus additional sections specific to the beneficiary: prior immigration status, I-94 / passport / travel doc info, removal proceedings, employment, and a roster of the beneficiary's spouse + up to 4 children (Lines 30-49).

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `Pt4Line1_AlienNumber[0]` | A-Number (Alien Registration Number) | text | — |
| `Pt4Line2_USCISOnlineActNumber[0]` | USCIS Online Account Number | text | — |
| `Pt4Line4a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt4Line4b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt4Line4c_MiddleName[0]` | Middle Name | text | — |
| `P4Line5a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt4Line5b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt4Line5c_MiddleName[0]` | Middle Name | text | — |
| `Pt4Line7_CityTownOfBirth[0]` | City/Town of Birth | text | — |
| `Pt4Line8_CountryOfBirth[0]` | Country of Birth | text | — |
| `Pt4Line11_Province[0]` | Province | text | — |
| `Pt4Line11_PostalCode[0]` | Postal Code | text | — |
| `Pt4Line11_Country[0]` | Country | text | — |
| `Pt4Line12a_StreetNumberName[0]` | Street Number and Name | text | Safe-mailing address (in-care-of) required only if different from physical address. |
| `Pt4Line12b_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | Safe-mailing address (in-care-of) required only if different from physical address. |
| `Pt4Line12b_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | Safe-mailing address (in-care-of) required only if different from physical address. |
| `Pt4Line12b_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | Safe-mailing address (in-care-of) required only if different from physical address. |
| `Pt4Line12b_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | Safe-mailing address (in-care-of) required only if different from physical address. |
| `Pt4Line12c_CityOrTown[0]` | City or Town | text | Safe-mailing address (in-care-of) required only if different from physical address. |
| `Pt4Line12e_ZipCode[0]` | ZIP Code | text | Safe-mailing address (in-care-of) required only if different from physical address. |
| `Pt4Line12d_State[0]` | State | dropdown | Safe-mailing address (in-care-of) required only if different from physical address. |
| `Pt4Line13_PostalCode[0]` | Postal Code | text | — |
| `Pt4Line13_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | — |
| `Pt4Line13_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line13_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line13_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line13_StreetNumberName[0]` | Street Number and Name | text | — |
| `Pt4Line13_CityOrTown[0]` | City or Town | text | — |
| `Pt4Line13_Country[0]` | Country | text | — |
| `Pt4Line13_Province[0]` | Province | text | — |
| `Pt4Line11_StreetNumberName[0]` | Street Number and Name | text | — |
| `Pt4Line11_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line11_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line11_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line11_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | — |
| `Pt4Line11_CityOrTown[0]` | City or Town | text | — |
| `Pt4Line11_ZipCode[0]` | ZIP Code | text | — |
| `Pt4Line11_State[0]` | State | dropdown | — |
| `Pt4Line9_DateOfBirth[0]` | Date of Birth | text | — |
| `Pt4Line9_Male[0]` | Sex = Male | checkbox | — |
| `Pt4Line9_Female[0]` | Sex = Female | checkbox | — |
| `Pt4Line10_Yes[0]` | Answer = Yes | checkbox | — |
| `Pt4Line10_No[0]` | Answer = No | checkbox | — |
| `Pt4Line10_Unknown[0]` | Answer = Unknown | checkbox | — |
| `Pt4Line14_DaytimePhoneNumber[0]` | Daytime Telephone Number | text | — |
| `Pt4Line3_SSN[0]` | U.S. Social Security Number | text | — |
| `Pt4Line20c_Province[0]` | Province | text | EWI / I-94 details required only if beneficiary is currently in the U.S. |
| `Pt4Line17_NumberofMarriages[0]` | Number of Marriages | text | Beneficiary's prior-marriage history required only if Line 17 > 1. |
| `Pt4Line18_MaritalStatus[0]` | Marital Status (option) | checkbox | — |
| `Pt4Line18_MaritalStatus[1]` | Marital Status (option) | checkbox | — |
| `Pt4Line18_MaritalStatus[2]` | Marital Status (option) | checkbox | — |
| `Pt4Line18_MaritalStatus[3]` | Marital Status (option) | checkbox | — |
| `Pt4Line18_MaritalStatus[4]` | Marital Status (option) | checkbox | — |
| `Pt4Line18_MaritalStatus[5]` | Marital Status (option) | checkbox | — |
| `Pt4Line15_MobilePhoneNumber[0]` | Mobile Telephone Number | text | — |
| `Pt4Line16_EmailAddress[0]` | Email Address | text | — |
| `Pt4Line19_DateOfMarriage[0]` | Date of Marriage | text | — |
| `Pt4Line18a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt4Line18b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt4Line18c_MiddleName[0]` | Middle Name | text | — |
| `Pt4Line16a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt4Line16b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt4Line16c_MiddleName[0]` | Middle Name | text | — |
| `Pt4Line17_DateMarriageEnded[0]` | Date Marriage Ended | text | Beneficiary's prior-marriage history required only if Line 17 > 1. |
| `Pt4Line17_DateMarriageEnded[1]` | Date Marriage Ended | text | Beneficiary's prior-marriage history required only if Line 17 > 1. |
| `Pt4Line31_Relationship[0]` | Relationship | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line30a_FamilyName[0]` | Family Name (Last Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line30b_GivenName[0]` | Given Name (First Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line30c_MiddleName[0]` | Middle Name | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line32_DateOfBirth[0]` | Date of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line49_CountryOfBirth[0]` | Country of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line35_Relationship[0]` | Relationship | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line36_DateOfBirth[0]` | Date of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line37_CountryOfBirth[0]` | Country of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line34a_FamilyName[0]` | Family Name (Last Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line34b_GivenName[0]` | Given Name (First Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line34c_MiddleName[0]` | Middle Name | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line38b_GivenName[0]` | Given Name (First Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line38c_MiddleName[0]` | Middle Name | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line38a_FamilyName[0]` | Family Name (Last Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line41_CountryOfBirth[0]` | Country of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line40_DateOfBirth[0]` | Date of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line39_Relationship[0]` | Relationship | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line20a_CityTown[0]` | City or Town | text | EWI / I-94 details required only if beneficiary is currently in the U.S. |
| `Pt4Line20b_State[0]` | State | dropdown | EWI / I-94 details required only if beneficiary is currently in the U.S. |
| `Pt4Line20d_Country[0]` | Country | text | EWI / I-94 details required only if beneficiary is currently in the U.S. |
| `Pt4Line42c_MiddleName[0]` | Middle Name | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line42b_GivenName[0]` | Given Name (First Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line42a_FamilyName[0]` | Family Name (Last Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line45_CountryOfBirth[0]` | Country of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line44_DateOfBirth[0]` | Date of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line43_Relationship[0]` | Relationship | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line46a_FamilyName[0]` | Family Name (Last Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line46b_GivenName[0]` | Given Name (First Name) | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line46c_MiddleName[0]` | Middle Name | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line47_Relationship[0]` | Relationship | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line49_CountryOfBirth[1]` | Country of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line48_DateOfBirth[0]` | Date of Birth | text | Children of beneficiary required only if beneficiary has children (up to 5 may be listed). |
| `Pt4Line20_Yes[0]` | Answer = Yes | checkbox | EWI / I-94 details required only if beneficiary is currently in the U.S. |
| `Pt4Line20_No[0]` | Answer = No | checkbox | EWI / I-94 details required only if beneficiary is currently in the U.S. |
| `Pt4Line21d_DateExpired[0]` | Date Authorized Stay Expired | text | — |
| `Pt4Line21a_ClassOfAdmission[0]` | Class of Admission | dropdown | — |
| `Pt4Line21c_DateOfArrival[0]` | Date of Arrival | text | — |
| `Pt4Line22_PassportNumber[0]` | Passport Number | text | — |
| `Pt4Line23_TravelDocNumber[0]` | Travel Document Number | text | — |
| `Pt4Line24_CountryOfIssuance[0]` | Country of Issuance | text | — |
| `Pt4Line25_ExpDate[0]` | Expiration Date | text | — |
| `Pt4Line26_NameOfCompany[0]` | Name of Company / Employer | text | — |
| `Pt4Line26_StreetNumberName[0]` | Street Number and Name | text | — |
| `Pt4Line26_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line26_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line26_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line26_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | — |
| `Pt4Line26_CityOrTown[0]` | City or Town | text | — |
| `Pt4Line26_State[0]` | State | dropdown | — |
| `Pt4Line26_ZipCode[0]` | ZIP Code | text | — |
| `Pt4Line26_Province[0]` | Province | text | — |
| `Pt4Line27_DateEmploymentBegan[0]` | Date Employment Began | text | — |
| `Pt4Line28_No[0]` | Answer = No | checkbox | — |
| `Pt4Line28_Yes[0]` | Answer = Yes | checkbox | — |
| `Pt4Line54_Removal[0]` | Proceedings type = Removal | checkbox | Removal / exclusion proceedings details required only if beneficiary has ever been in such proceedings. |
| `Pt4Line54_Exclusion[0]` | Proceedings type = Exclusion / Deportation | checkbox | Removal / exclusion proceedings details required only if beneficiary has ever been in such proceedings. |
| `Pt4Line54_Rescission[0]` | Proceedings type = Rescission | checkbox | Removal / exclusion proceedings details required only if beneficiary has ever been in such proceedings. |
| `Pt4Line54_JudicialProceedings[0]` | Proceedings type = Judicial | checkbox | Removal / exclusion proceedings details required only if beneficiary has ever been in such proceedings. |
| `Pt4Line55a_CityOrTown[0]` | City or Town | text | — |
| `Pt4Line26_PostalCode[0]` | Postal Code | text | — |
| `Pt4Line26_Country[0]` | Country | text | — |
| `Pt4Line55b_State[0]` | State | dropdown | — |
| `Pt4Line56_Date[0]` | (Date) | text | — |
| `Pt4Line21b_ArrivalDeparture[0]` | Form I-94 Arrival/Departure Record Number | text | — |
| `Pt4Line55c_MiddleName[0]` | Middle Name | text | — |
| `Pt4Line55a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt4Line55b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt4Line56_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line56_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line56_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line56_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | — |
| `Pt4Line56_CityOrTown[0]` | City or Town | text | — |
| `Pt4Line56_Province[0]` | Province | text | — |
| `Pt4Line56_Country[0]` | Country | text | — |
| `Pt4Line56_PostalCode[0]` | Postal Code | text | — |
| `Pt4Line56_StreetNumberName[0]` | Street Number and Name | text | — |
| `Pt4Line57_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line57_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line57_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | — |
| `Pt4Line57_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | — |
| `Pt4Line57_StreetNumberName[0]` | Street Number and Name | text | — |
| `Pt4Line57_CityOrTown[0]` | City or Town | text | — |
| `Pt4Line57_ZipCode[0]` | ZIP Code | text | — |
| `Pt4Line57_State[0]` | State | dropdown | — |
| `Pt4Line58a_DateFrom[0]` | Date From | text | — |
| `Pt4Line58b_DateTo[0]` | Date To | text | — |
| `Pt4Line57_Province[0]` | Province | text | — |
| `Pt4Line57_Country[0]` | Country | text | — |
| `Pt4Line57_PostalCode[0]` | Postal Code | text | — |
| `Pt4Line61a_CityOrTown[0]` | City or Town | text | — |
| `Pt4Line61b_Province[0]` | Province | text | — |
| `Pt4Line61c_Country[0]` | Country | text | — |
| `Part4Line1_Yes[0]` | Answer = Yes | checkbox | — |
| `Part4Line1_No[0]` | Answer = No | checkbox | — |
| `Pt4Line60a_CityOrTown[0]` | City or Town | text | — |
| `Pt4Line60b_State[0]` | State | dropdown | — |
| `Pt4Line7_Relationship[0]` | Relationship | text | — |
| `Pt4Line6a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt4Line6b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt4Line6c_MiddleName[0]` | Middle Name | text | — |
| `Pt4Line8c_MiddleName[0]` | Middle Name | text | — |
| `Pt4Line8b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt4Line8a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt4Line9_Relationship[0]` | Relationship | text | — |
| `Pt4Line53_DaytimePhoneNumber[0]` | Daytime Telephone Number | text | — |

## Part 5 — Other information (prior petitions, etc.)

*Field count:* **7**.

**Notes.** Have you ever filed a previous Form I-130 petition for any beneficiary? If yes, record who/where/when/result.

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `Pt5Line2a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `Pt5Line2b_GivenName[0]` | Given Name (First Name) | text | — |
| `Pt5Line2c_MiddleName[0]` | Middle Name | text | — |
| `Pt5Line5_Result[0]` | Result | text | — |
| `Pt5Line4_DateFiled[0]` | Date Filed | text | — |
| `Pt5Line3a_CityOrTown[0]` | City or Town | text | — |
| `Pt5Line3b_State[0]` | State | dropdown | — |

## Part 6 — Petitioner's statement, contact info, certification, and signature

*Field count:* **9**.

**Notes.** Petitioner's certification: did the petitioner read English unaided, did an interpreter help, did a preparer help. Signature + date.

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `Pt6Line3_DaytimePhoneNumber[0]` | Daytime Telephone Number | text | — |
| `Pt6Line5_Email[0]` | Email Address | text | — |
| `Pt6Line4_MobileNumber[0]` | Mobile Telephone Number | text | — |
| `Pt6Line1Checkbox[0]` | (heckbox) | checkbox | — |
| `Pt6Line1Checkbox[1]` | (heckbox) | checkbox | — |
| `Pt6Line1b_Language[0]` | Language | text | — |
| `Pt6Line2_Checkbox[0]` | Checkbox | checkbox | — |
| `Pt6Line2_RepresentativeName[0]` | Representative Name | text | — |
| `Pt6Line6b_DateofSignature[0]` | Date of Signature | text | — |

## Part 7 — Interpreter's contact info, certification, and signature

*Field count:* **18**.

**Notes.** Filled only if an interpreter helped the petitioner. Interpreter identity, language, contact, signature.

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `Pt7Line1b_InterpreterGivenName[0]` | Interpreter Given Name | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line1a_InterpreterFamilyName[0]` | Interpreter Family Name | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line2_InterpreterBusinessorOrg[0]` | Interpreter Business / Organization | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_CityOrTown[0]` | City or Town | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_StreetNumberName[0]` | Street Number and Name | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_PostalCode[0]` | Postal Code | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_ZipCode[0]` | ZIP Code | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_State[0]` | State | dropdown | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_Country[0]` | Country | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line3_Province[0]` | Province | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line7b_DateofSignature[0]` | Date of Signature | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line7a_Signature[0]` | Signature | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line4_InterpreterDaytimeTelephone[0]` | Interpreter Daytime Telephone | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |
| `Pt7Line5_Email[0]` | Email Address | text | Entire Part 7 required only if an interpreter helped (toggled in Part 6). |

## Part 8 — Contact info, declaration, and signature of person preparing this petition (if other than the petitioner)

*Field count:* **23**.

**Notes.** Filled only if a paid or unpaid preparer (other than the petitioner) prepared the form. Preparer identity, business, contact, attorney vs accredited rep checkbox, signature.

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `Pt8Line1b_PreparerGivenName[0]` | Preparer Given Name | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line2_BusinessName[0]` | Business Name | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line1a_PreparerFamilyName[0]` | Preparer Family Name | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_CityOrTown[0]` | City or Town | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_StreetNumberName[0]` | Street Number and Name | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_Unit[0]` | Address unit type (Apt / Ste / Flr) | checkbox | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_Unit[1]` | Address unit type (Apt / Ste / Flr) | checkbox | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_Unit[2]` | Address unit type (Apt / Ste / Flr) | checkbox | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_AptSteFlrNumber[0]` | Apt / Ste / Flr number | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_PostalCode[0]` | Postal Code | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_ZipCode[0]` | ZIP Code | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_State[0]` | State | dropdown | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_Country[0]` | Country | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line3_Province[0]` | Province | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line5_PreparerFaxNumber[0]` | Preparer Fax Number | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line4_DaytimePhoneNumber[0]` | Daytime Telephone Number | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line6_Email[0]` | Email Address | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line7_Checkbox[0]` | Checkbox | checkbox | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line7_Checkbox[1]` | Checkbox | checkbox | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line7b_Checkbox[0]` | Checkbox | checkbox | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line7b_Checkbox[1]` | Checkbox | checkbox | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line8a_Signature[0]` | Signature | text | Entire Part 8 required only if a preparer other than the petitioner helped. |
| `Pt8Line8b_DateofSignature[0]` | Date of Signature | text | Entire Part 8 required only if a preparer other than the petitioner helped. |

## Part 9 — Additional information (continuation pages)

*Field count:* **20**.

**Notes.** Continuation pages for any answer that did not fit. Each entry tracks which Part / Item it expands.

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `Pt9Line3a_PageNumber[0]` | Page Number | text | — |
| `Pt9Line3b_PartNumber[0]` | Part Number | text | — |
| `Pt9Line3c_ItemNumber[0]` | Item Number | text | — |
| `Pt9Line3d_AdditionalInfo[0]` | Additional Information (free text) | multiline text | — |
| `Pt9Line4a_PageNumber[0]` | Page Number | text | — |
| `Pt9Line4b_PartNumber[0]` | Part Number | text | — |
| `Pt9Line4c_ItemNumber[0]` | Item Number | text | — |
| `Pt9Line4d_AdditionalInfo[0]` | Additional Information (free text) | multiline text | — |
| `Pt9Line5a_PageNumber[0]` | Page Number | text | — |
| `Pt9Line5b_PartNumber[0]` | Part Number | text | — |
| `Pt9Line5c_ItemNumber[0]` | Item Number | text | — |
| `Pt9Line6a_PageNumber[0]` | Page Number | text | — |
| `Pt9Line6b_PartNumber[0]` | Part Number | text | — |
| `Pt9Line6c_ItemNumber[0]` | Item Number | text | — |
| `Pt9Line6d_AdditionalInfo[0]` | Additional Information (free text) | multiline text | — |
| `Pt9Line5d_AdditionalInfo[0]` | Additional Information (free text) | multiline text | — |
| `Pt9Line9a_PageNumber[0]` | Page Number | text | — |
| `Pt9Line7b_PartNumber[0]` | Part Number | text | — |
| `Pt9Line7c_ItemNumber[0]` | Item Number | text | — |
| `Pt9Line7d_AdditionalInfo[0]` | Additional Information (free text) | multiline text | — |

## Header / attorney / preparer / system fields

*Field count:* **19**.

**Notes.** System-generated barcode fields (PDF417BarCode1 appears once per page) and the header block: attorney/representative bar number, Volag number, USCIS Online Account Number, and the G-28 checkbox.

| Internal name (leaf) | Plain-language | UI type | Conditional? |
| -------------------- | -------------- | ------- | ------------ |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `CheckBox1[0]` | (CheckBox1) | checkbox | — |
| `VolagNumber[0]` | Volag Number | text | — |
| `AttorneyStateBarNumber[0]` | Attorney State Bar Number | text | — |
| `USCISOnlineAcctNumber[0]` | USCIS Online Account Number | text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `PtLine20a_FamilyName[0]` | Family Name (Last Name) | text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `P5_Line6a_SignatureofApplicant[0]` | Signature | text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `Pt7_NameofLanguage[0]` | Name of Language (interpreter) | text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |
| `PDF417BarCode1[0]` | (PDF417BarCode1) | multiline text | — |

## Conditional logic — rules of thumb

- **Pt1Line2:** Required only if Part 1 relationship = Child / Parent (child sub-type).
- **Pt1Line3:** Required only if relationship is Child or Sibling (gained status through adoption?).
- **Pt1Line4:** Required only if petitioner is an LPR and gained status through adoption.
- **Pt2Line12:** Required only if mailing address differs from physical address (Line 10).
- **Pt2Line14:** Required only if the petitioner's prior physical address (within last 5 years) differs from current.
- **Pt2Line17:** Annulled / Divorced / Widowed branches require prior-spouse details on Lines 20-23.
- **Pt2Line20:** Required only if the petitioner has been married before (Line 16 > 1).
- **Pt2Line36:** Lines 37a-37c required only if Petitioner = U.S. Citizen via Naturalization or Certificate.
- **Pt4Line12:** Safe-mailing address (in-care-of) required only if different from physical address.
- **Pt4Line17:** Beneficiary's prior-marriage history required only if Line 17 > 1.
- **Pt4Line20:** EWI / I-94 details required only if beneficiary is currently in the U.S.
- **Pt4Line30-49:** Children of beneficiary required only if beneficiary has children (up to 5 may be listed).
- **Pt4Line54:** Removal / exclusion proceedings details required only if beneficiary has ever been in such proceedings.
- **Pt6Line1b:** Language of interpretation required only if an interpreter helped.
- **Pt7:** Entire Part 7 required only if an interpreter helped (toggled in Part 6).
- **Pt8:** Entire Part 8 required only if a preparer other than the petitioner helped.

## Regenerating

This file is generated. To rebuild after replacing the PDF:

```sh
node scripts/extract-i130-fields.mjs    # regenerates data/fields.raw.json
node scripts/build-field-analysis.mjs   # regenerates this file
```
