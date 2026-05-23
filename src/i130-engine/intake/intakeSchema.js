// I-130 Intake Schema — Session 1
// ---------------------------------------------------------------------------
// What this is:
//   The declarative question flow for the I-130 drafter. PURE DATA + small
//   predicate functions. The UI layer (Session 2: IntakeWizard.jsx) reads
//   this schema and renders steps/questions. The output layer
//   (Sessions 5-6) uses `mapsTo` to fill the USCIS PDF.
//
// What this is NOT:
//   - Not a UI component.
//   - Not a validation engine. Question objects describe their validation;
//     the IntakeWizard runs it.
//   - Not the field mapping. `mapsTo` points at USCIS field names declared
//     in `src/i130-engine/data/fieldAnalysis.md` and resolved in
//     `src/i130-engine/mapping/fieldMapping.json`. The mapping file is the
//     authoritative bridge to the PDF; `mapsTo` is a convenience for the UI
//     and a sanity check at build time.
//
// Conventions:
//   - All user-facing strings are bilingual: { en, es }.
//   - Question `id` is snake_case, unique across the whole schema, and is
//     the key used by `fieldMapping.json`.
//   - `required` can be a boolean OR a predicate `(answers) => boolean`.
//   - `visible` (optional) works the same way; defaults to always visible.
//   - `type`: 'text' | 'longtext' | 'select' | 'radio' | 'checkbox' |
//             'multi-checkbox' | 'date' | 'number' | 'tel' | 'email' | 'ssn' | 'a-number'.
//   - `options` for select/radio/multi-checkbox is an array of { value, label: {en, es} }.
//   - `validation` is { pattern?: RegExp, min?, max?, minLength?, maxLength?,
//             message: {en, es} }.
//
// Session 1 scope:
//   - Steps 1-3 are FULLY fleshed (questions, bilingual copy, validation,
//     mapsTo populated).
//   - Steps 4-10 are scaffolded — titles + outline only, with TODO markers.
//     Subsequent sessions flesh them out as the UI is built around them.
// ---------------------------------------------------------------------------

export const RELATIONSHIPS = ['spouse', 'parent', 'child', 'sibling'];

// Predicate helpers — read by IntakeWizard and the mapper.
const isRelationship = (...values) => (a) => values.includes(a.relationship_type);
const equals = (key, value) => (a) => a[key] === value;
const truthy = (key) => (a) => Boolean(a[key]);

const intakeSchema = {
  meta: {
    formEdition: '04/01/24',
    omb: '1615-0012',
    ombExpires: '02/28/2027',
    schemaVersion: '0.1.0',
    pdfPath: 'src/i130-engine/data/uscis-i130-form.pdf',
    totalUscisFields: 450,
  },

  steps: [
    // -----------------------------------------------------------------------
    // STEP 1 — Relationship type
    // -----------------------------------------------------------------------
    {
      id: 'relationship',
      order: 1,
      title: {
        en: 'Who are you petitioning for?',
        es: '¿Para quién está presentando la petición?',
      },
      description: {
        en: 'Form I-130 is filed by a U.S. citizen or lawful permanent resident to establish a qualifying family relationship with a relative who wants to immigrate. The relationship you select here changes which other questions you will be asked.',
        es: 'El Formulario I-130 lo presenta un ciudadano de EE.UU. o residente permanente legal para establecer una relación familiar calificada con un pariente que desea inmigrar. La relación que seleccione aquí cambia las demás preguntas que se le harán.',
      },
      questions: [
        {
          id: 'relationship_type',
          type: 'radio',
          required: true,
          label: {
            en: 'What is your relationship to the person you are petitioning for (the beneficiary)?',
            es: '¿Cuál es su relación con la persona para quien presenta la petición (el beneficiario)?',
          },
          helpText: {
            en: 'Choose the single relationship category that best describes your tie to the beneficiary.',
            es: 'Elija la única categoría de relación que mejor describa su vínculo con el beneficiario.',
          },
          options: [
            {
              value: 'spouse',
              label: { en: 'Spouse (husband or wife)', es: 'Cónyuge (esposo o esposa)' },
            },
            {
              value: 'parent',
              label: { en: 'Parent', es: 'Padre o madre' },
            },
            {
              value: 'child',
              label: { en: 'Child (under 21, unmarried — or any age, married)', es: 'Hijo(a)' },
            },
            {
              value: 'sibling',
              label: { en: 'Brother or sister', es: 'Hermano(a)' },
            },
          ],
          mapsTo: [
            'Pt1Line1_Spouse[0]',
            'Pt1Line1_Parent[0]',
            'Pt1Line1_Child[0]',
            'Pt1Line1_Siblings[0]',
          ],
        },
        {
          id: 'child_sub_type',
          type: 'radio',
          required: isRelationship('child', 'parent'),
          visible: isRelationship('child', 'parent'),
          label: {
            en: 'What kind of parent/child relationship is this?',
            es: '¿Qué tipo de relación padre/hijo es esta?',
          },
          helpText: {
            en: 'USCIS distinguishes biological children born in-wedlock, biological children born out-of-wedlock, stepchildren (acquired before age 18), and adopted children (adopted before age 16).',
            es: 'USCIS distingue entre hijos biológicos nacidos dentro del matrimonio, hijos biológicos nacidos fuera del matrimonio, hijastros (adquiridos antes de los 18 años) e hijos adoptados (adoptados antes de los 16 años).',
          },
          options: [
            {
              value: 'in_wedlock',
              label: { en: 'Biological — born in wedlock', es: 'Biológico — nacido dentro del matrimonio' },
            },
            {
              value: 'out_of_wedlock',
              label: { en: 'Biological — born out of wedlock', es: 'Biológico — nacido fuera del matrimonio' },
            },
            {
              value: 'stepchild',
              label: { en: 'Stepchild / stepparent', es: 'Hijastro(a) / padrastro/madrastra' },
            },
            {
              value: 'adopted',
              label: { en: 'Adopted child', es: 'Hijo(a) adoptivo(a)' },
            },
          ],
          mapsTo: [
            'Pt1Line2_InWedlock[0]',
            'Pt1Line2_OutOfWedlock[0]',
            'Pt1Line2_Stepchild[0]',
            'Pt1Line2_AdoptedChild[0]',
          ],
        },
        {
          id: 'gained_status_via_adoption',
          type: 'radio',
          required: isRelationship('child', 'sibling'),
          visible: isRelationship('child', 'sibling'),
          label: {
            en: 'Are you a U.S. citizen or LPR who gained that status through adoption?',
            es: '¿Es usted un ciudadano de EE.UU. o residente permanente legal que obtuvo ese estatus mediante adopción?',
          },
          helpText: {
            en: 'USCIS asks this on Form I-130 Part 1 Item 3 — it affects eligibility for child/sibling petitions.',
            es: 'USCIS hace esta pregunta en la Parte 1, Ítem 3 — afecta la elegibilidad para peticiones de hijo o hermano.',
          },
          options: [
            { value: 'yes', label: { en: 'Yes', es: 'Sí' } },
            { value: 'no', label: { en: 'No', es: 'No' } },
          ],
          mapsTo: [
            'Pt1Line3_Yes[0]',
            'Pt1Line3_No[0]',
          ],
        },
        {
          id: 'lpr_via_adoption',
          type: 'radio',
          required: (a) =>
            a.petitioner_status === 'lpr' && a.gained_status_via_adoption === 'yes',
          visible: (a) =>
            a.petitioner_status === 'lpr' && a.gained_status_via_adoption === 'yes',
          label: {
            en: 'Did you gain lawful permanent resident status through adoption?',
            es: '¿Obtuvo el estatus de residente permanente legal mediante adopción?',
          },
          helpText: {
            en: 'Part 1 Item 4 — applies only to LPR petitioners whose status was acquired through adoption.',
            es: 'Parte 1, Ítem 4 — aplica solo a peticionarios LPR cuyo estatus fue adquirido mediante adopción.',
          },
          options: [
            { value: 'yes', label: { en: 'Yes', es: 'Sí' } },
            { value: 'no', label: { en: 'No', es: 'No' } },
          ],
          mapsTo: [
            'Pt1Line4_Yes[0]',
            'Pt1Line4_No[0]',
          ],
        },
      ],
    },

    // -----------------------------------------------------------------------
    // STEP 2 — Petitioner identity
    // -----------------------------------------------------------------------
    {
      id: 'petitioner_identity',
      order: 2,
      title: {
        en: 'About you (the Petitioner)',
        es: 'Acerca de usted (el Peticionario)',
      },
      description: {
        en: 'These are the core identity fields the USCIS needs about YOU — the U.S. citizen or LPR filing this petition. Use the spelling exactly as it appears on your government-issued ID.',
        es: 'Estos son los datos de identidad básicos que USCIS necesita sobre USTED — el ciudadano o residente permanente que presenta la petición. Use la ortografía exactamente como aparece en su identificación.',
      },
      questions: [
        {
          id: 'petitioner_family_name',
          type: 'text',
          required: true,
          label: { en: 'Your family name (last name)', es: 'Su apellido' },
          helpText: {
            en: 'Use the legal spelling exactly as it appears on your passport, certificate of naturalization, or green card.',
            es: 'Use la ortografía legal exactamente como aparece en su pasaporte, certificado de naturalización o tarjeta verde.',
          },
          validation: {
            maxLength: 50,
            message: { en: 'Required, up to 50 characters.', es: 'Obligatorio, hasta 50 caracteres.' },
          },
          mapsTo: ['Pt2Line4a_FamilyName[0]'],
        },
        {
          id: 'petitioner_given_name',
          type: 'text',
          required: true,
          label: { en: 'Your given name (first name)', es: 'Su nombre de pila' },
          validation: {
            maxLength: 50,
            message: { en: 'Required.', es: 'Obligatorio.' },
          },
          mapsTo: ['Pt2Line4b_GivenName[0]'],
        },
        {
          id: 'petitioner_middle_name',
          type: 'text',
          required: false,
          label: { en: 'Your middle name (if any)', es: 'Su segundo nombre (si tiene)' },
          mapsTo: ['Pt2Line4c_MiddleName[0]'],
        },
        {
          id: 'petitioner_other_names_used',
          type: 'longtext',
          required: false,
          label: {
            en: 'Other names you have used (maiden, aliases, prior legal names)',
            es: 'Otros nombres que ha usado (de soltera, alias, nombres legales anteriores)',
          },
          helpText: {
            en: 'List every name you have used. USCIS will check these against background databases.',
            es: 'Liste todos los nombres que ha usado. USCIS los verificará en bases de datos.',
          },
          mapsTo: [
            'Pt2Line5a_FamilyName[0]',
            'Pt2Line5b_GivenName[0]',
            'Pt2Line5c_MiddleName[0]',
          ],
        },
        {
          id: 'petitioner_city_of_birth',
          type: 'text',
          required: true,
          label: { en: 'City or town where you were born', es: 'Ciudad o pueblo donde nació' },
          mapsTo: ['Pt2Line6_CityTownOfBirth[0]'],
        },
        {
          id: 'petitioner_country_of_birth',
          type: 'text',
          required: true,
          label: { en: 'Country where you were born', es: 'País donde nació' },
          helpText: {
            en: 'Use the name of the country as it exists today — even if the country was named differently at the time of your birth.',
            es: 'Use el nombre del país tal como existe hoy, aunque el país tuviera un nombre diferente en su nacimiento.',
          },
          mapsTo: ['Pt2Line7_CountryofBirth[0]'],
        },
        {
          id: 'petitioner_dob',
          type: 'date',
          required: true,
          label: { en: 'Your date of birth', es: 'Su fecha de nacimiento' },
          validation: {
            message: { en: 'MM/DD/YYYY required.', es: 'Se requiere MM/DD/AAAA.' },
          },
          mapsTo: ['Pt2Line8_DateofBirth[0]'],
        },
        {
          id: 'petitioner_sex',
          type: 'radio',
          required: true,
          label: { en: 'Sex (as shown on your government ID)', es: 'Sexo (como aparece en su identificación)' },
          options: [
            { value: 'male', label: { en: 'Male', es: 'Masculino' } },
            { value: 'female', label: { en: 'Female', es: 'Femenino' } },
          ],
          mapsTo: [
            'Pt2Line9_Male[0]',
            'Pt2Line9_Female[0]',
          ],
        },
        {
          id: 'petitioner_ssn',
          type: 'ssn',
          required: false,
          label: { en: 'U.S. Social Security Number (if you have one)', es: 'Número de Seguro Social (si tiene)' },
          helpText: {
            en: 'Enter as 9 digits, e.g., 123-45-6789. Required if you have a U.S. SSN.',
            es: 'Ingrese 9 dígitos, por ejemplo, 123-45-6789. Obligatorio si tiene SSN.',
          },
          validation: {
            pattern: '^\\d{3}-?\\d{2}-?\\d{4}$',
            message: { en: 'Must be 9 digits.', es: 'Debe tener 9 dígitos.' },
          },
          mapsTo: ['Pt2Line11_SSN[0]'],
        },
        {
          id: 'petitioner_a_number',
          type: 'a-number',
          required: false,
          label: { en: 'A-Number / Alien Registration Number (if you have one)', es: 'Número A / Registro de Extranjero (si tiene)' },
          helpText: {
            en: '7 to 9 digits, may begin with “A”. Lawful permanent residents have one. U.S. citizens by birth do not.',
            es: '7 a 9 dígitos, puede comenzar con "A". Los residentes permanentes tienen uno. Los ciudadanos por nacimiento no.',
          },
          validation: {
            pattern: '^A?\\d{7,9}$',
            message: { en: '7-9 digits, optional leading A.', es: '7-9 dígitos, A opcional al inicio.' },
          },
          mapsTo: [
            'Pt2Line1_AlienNumber[0]',
            'Pt2Line1_AlienNumber[1]',
          ],
        },
        {
          id: 'petitioner_uscis_online_account_number',
          type: 'text',
          required: false,
          label: { en: 'USCIS Online Account Number (if you have one)', es: 'Número de Cuenta en Línea USCIS (si tiene)' },
          helpText: {
            en: 'A 12-digit number assigned when you create a USCIS online account at my.uscis.gov.',
            es: 'Número de 12 dígitos asignado al crear una cuenta en línea en my.uscis.gov.',
          },
          mapsTo: ['Pt2Line2_USCISOnlineActNumber[0]'],
        },
      ],
    },

    // -----------------------------------------------------------------------
    // STEP 3 — Petitioner status (US citizen or LPR)
    // -----------------------------------------------------------------------
    {
      id: 'petitioner_status',
      order: 3,
      title: {
        en: 'Your immigration status',
        es: 'Su estatus migratorio',
      },
      description: {
        en: 'Only U.S. citizens and lawful permanent residents (green-card holders) can file Form I-130. Your status determines which categories of relatives you can petition for and what evidence you must attach.',
        es: 'Solo ciudadanos estadounidenses y residentes permanentes legales (titulares de tarjeta verde) pueden presentar el Formulario I-130. Su estatus determina las categorías de parientes para los que puede solicitar y la evidencia que debe adjuntar.',
      },
      questions: [
        {
          id: 'petitioner_status',
          type: 'radio',
          required: true,
          label: { en: 'I am a:', es: 'Yo soy:' },
          options: [
            { value: 'usc', label: { en: 'U.S. Citizen', es: 'Ciudadano de EE.UU.' } },
            { value: 'lpr', label: { en: 'Lawful Permanent Resident (LPR)', es: 'Residente Permanente Legal' } },
          ],
          mapsTo: [
            'Pt2Line36_USCitizen[0]',
            'Pt2Line36_LPR[0]',
          ],
        },
        {
          id: 'usc_acquisition',
          type: 'radio',
          required: equals('petitioner_status', 'usc'),
          visible: equals('petitioner_status', 'usc'),
          label: { en: 'How did you become a U.S. citizen?', es: '¿Cómo se hizo ciudadano de EE.UU.?' },
          options: [
            { value: 'birth_us', label: { en: 'Birth in the United States', es: 'Nacimiento en EE.UU.' } },
            { value: 'birth_abroad', label: { en: 'Birth abroad to U.S. citizen parent(s)', es: 'Nacimiento en el extranjero de padre(s) ciudadano(s)' } },
            { value: 'naturalization', label: { en: 'Naturalization', es: 'Naturalización' } },
            { value: 'parents_naturalization', label: { en: 'My parents’ naturalization (derivation)', es: 'Naturalización de mis padres (derivación)' } },
          ],
          mapsTo: [],
        },
        {
          id: 'usc_certificate_number',
          type: 'text',
          required: (a) => a.petitioner_status === 'usc' && ['naturalization', 'parents_naturalization', 'birth_abroad'].includes(a.usc_acquisition),
          visible: (a) => a.petitioner_status === 'usc' && ['naturalization', 'parents_naturalization', 'birth_abroad'].includes(a.usc_acquisition),
          label: {
            en: 'Certificate of Naturalization / Citizenship number',
            es: 'Número del Certificado de Naturalización / Ciudadanía',
          },
          helpText: {
            en: 'Required if status was acquired through naturalization or derivation. Use the certificate number printed on the document.',
            es: 'Obligatorio si obtuvo el estatus por naturalización o derivación. Use el número del certificado.',
          },
          mapsTo: ['Pt2Line37a_CertificateNumber[0]'],
        },
        {
          id: 'usc_certificate_place',
          type: 'text',
          required: (a) => a.petitioner_status === 'usc' && ['naturalization', 'parents_naturalization', 'birth_abroad'].includes(a.usc_acquisition),
          visible: (a) => a.petitioner_status === 'usc' && ['naturalization', 'parents_naturalization', 'birth_abroad'].includes(a.usc_acquisition),
          label: { en: 'Place of issuance of the certificate', es: 'Lugar de emisión del certificado' },
          mapsTo: ['Pt2Line37b_PlaceOfIssuance[0]'],
        },
        {
          id: 'usc_certificate_date',
          type: 'date',
          required: (a) => a.petitioner_status === 'usc' && ['naturalization', 'parents_naturalization', 'birth_abroad'].includes(a.usc_acquisition),
          visible: (a) => a.petitioner_status === 'usc' && ['naturalization', 'parents_naturalization', 'birth_abroad'].includes(a.usc_acquisition),
          label: { en: 'Date of issuance of the certificate', es: 'Fecha de emisión del certificado' },
          mapsTo: ['Pt2Line37c_DateOfIssuance[0]'],
        },
        {
          id: 'lpr_class_of_admission',
          type: 'text',
          required: equals('petitioner_status', 'lpr'),
          visible: equals('petitioner_status', 'lpr'),
          label: { en: 'Class of Admission (from your green card)', es: 'Clase de Admisión (de su tarjeta verde)' },
          helpText: {
            en: 'A 2-3 character code printed on the front of your I-551 (green card), e.g., IR1, F21, CR6.',
            es: 'Código de 2-3 caracteres impreso en su tarjeta verde, por ejemplo, IR1, F21, CR6.',
          },
          mapsTo: ['Pt2Line40a_ClassOfAdmission[0]'],
        },
        {
          id: 'lpr_date_of_admission',
          type: 'date',
          required: equals('petitioner_status', 'lpr'),
          visible: equals('petitioner_status', 'lpr'),
          label: { en: 'Date you became a Permanent Resident', es: 'Fecha en que se hizo residente permanente' },
          mapsTo: ['Pt2Line40b_DateOfAdmission[0]'],
        },
        {
          id: 'lpr_place_of_admission_city',
          type: 'text',
          required: equals('petitioner_status', 'lpr'),
          visible: equals('petitioner_status', 'lpr'),
          label: { en: 'City where you became an LPR', es: 'Ciudad donde se hizo residente permanente' },
          mapsTo: ['Pt2Line40d_CityOrTown[0]'],
        },
        {
          id: 'lpr_place_of_admission_state',
          type: 'text',
          required: equals('petitioner_status', 'lpr'),
          visible: equals('petitioner_status', 'lpr'),
          label: { en: 'State where you became an LPR', es: 'Estado donde se hizo residente permanente' },
          mapsTo: ['Pt2Line40e_State[0]'],
        },
        {
          id: 'lpr_via_marriage_to_usc',
          type: 'radio',
          required: equals('petitioner_status', 'lpr'),
          visible: equals('petitioner_status', 'lpr'),
          label: {
            en: 'Did you gain LPR status through marriage to a U.S. citizen or LPR?',
            es: '¿Obtuvo su estatus LPR mediante matrimonio con un ciudadano o residente?',
          },
          options: [
            { value: 'yes', label: { en: 'Yes', es: 'Sí' } },
            { value: 'no', label: { en: 'No', es: 'No' } },
          ],
          mapsTo: [
            'Pt2Line41_Yes[0]',
            'Pt2Line41_No[0]',
          ],
        },
      ],
    },

    // -----------------------------------------------------------------------
    // STEP 4 — Petitioner address & contact history (SCAFFOLD)
    // -----------------------------------------------------------------------
    {
      id: 'petitioner_address',
      order: 4,
      title: { en: 'Your address & contact history', es: 'Su dirección e historial de contactos' },
      description: {
        en: 'USCIS asks for current physical address, mailing address (if different), and any prior physical address within the past 5 years.',
        es: 'USCIS solicita dirección física actual, dirección postal (si es diferente) y cualquier dirección física anterior en los últimos 5 años.',
      },
      // TODO Session 2: flesh out questions for Lines 10, 12 (mailing address),
      // 13a-13b (dates at current address), 14 (prior physical address),
      // 15a-15b (dates at prior address), plus phone/email/safe-mailing.
      questions: [
        // Placeholder anchor — IntakeWizard renders an "under construction"
        // notice when a step has no questions yet.
      ],
    },

    // -----------------------------------------------------------------------
    // STEP 5 — Petitioner employment history (SCAFFOLD)
    // -----------------------------------------------------------------------
    {
      id: 'petitioner_employment',
      order: 5,
      title: { en: 'Your employment history', es: 'Su historial laboral' },
      description: {
        en: 'Last two employers (or the most recent if currently or recently unemployed). Required only when you must show domicile/eligibility.',
        es: 'Últimos dos empleadores (o el más reciente si está desempleado). Obligatorio cuando deba demostrar domicilio/elegibilidad.',
      },
      // TODO Session 3: flesh out questions for Lines 40-47.
      questions: [],
    },

    // -----------------------------------------------------------------------
    // STEP 6 — Beneficiary identity (SCAFFOLD)
    // -----------------------------------------------------------------------
    {
      id: 'beneficiary_identity',
      order: 6,
      title: { en: 'About the beneficiary', es: 'Acerca del beneficiario' },
      description: {
        en: 'Core identity for the person you are petitioning for.',
        es: 'Identidad básica de la persona para quien presenta la petición.',
      },
      // TODO Session 3: mirror Step 2 against Part 4 (beneficiary).
      questions: [],
    },

    // -----------------------------------------------------------------------
    // STEP 7 — Beneficiary address & status (SCAFFOLD)
    // -----------------------------------------------------------------------
    {
      id: 'beneficiary_status',
      order: 7,
      title: { en: 'Beneficiary address & immigration status', es: 'Dirección y estatus migratorio del beneficiario' },
      description: {
        en: 'Current address, any prior U.S. addresses, current immigration status, last entry to the U.S., I-94 / passport / travel document, and any prior removal proceedings.',
        es: 'Dirección actual, direcciones anteriores en EE.UU., estatus migratorio actual, última entrada, I-94 / pasaporte / documento de viaje, y procedimientos de remoción anteriores.',
      },
      // TODO Session 4: Part 4 Lines 11-28.
      questions: [],
    },

    // -----------------------------------------------------------------------
    // STEP 8 — Relationship details (SCAFFOLD)
    // -----------------------------------------------------------------------
    {
      id: 'relationship_details',
      order: 8,
      title: { en: 'Relationship details', es: 'Detalles de la relación' },
      description: {
        en: 'Marriage date/place if spouse petition, prior-spouse history for both petitioner and beneficiary, and parent details if a parent/child petition.',
        es: 'Fecha y lugar de matrimonio si es petición por cónyuge, historial de cónyuges anteriores para ambos, y detalles de padres si es petición padre/hijo.',
      },
      // TODO Session 4: branches by relationship_type. Spouse → Pt2/Pt4 marriage history.
      // Parent/Child → Pt2 Lines 24-35 + Pt4 Lines 30-49. Sibling → both sets of parents.
      questions: [],
    },

    // -----------------------------------------------------------------------
    // STEP 9 — Beneficiary's family (SCAFFOLD)
    // -----------------------------------------------------------------------
    {
      id: 'beneficiary_family',
      order: 9,
      title: { en: "Beneficiary's spouse and children", es: 'Cónyuge e hijos del beneficiario' },
      description: {
        en: 'Lists every child of the beneficiary (Part 4 Lines 30-49). Used to identify potential derivative beneficiaries.',
        es: 'Lista cada hijo del beneficiario (Parte 4 Líneas 30-49). Se usa para identificar posibles beneficiarios derivados.',
      },
      // TODO Session 4: dynamic add-up-to-5 children block.
      questions: [],
    },

    // -----------------------------------------------------------------------
    // STEP 10 — Review (SCAFFOLD)
    // -----------------------------------------------------------------------
    {
      id: 'review',
      order: 10,
      title: { en: 'Review & generate', es: 'Revisar y generar' },
      description: {
        en: 'Final review of all answers, missing-evidence checklist, and trigger to generate the filled PDF + cover letter + evidence list.',
        es: 'Revisión final de todas las respuestas, lista de evidencia faltante, y generación del PDF + carta de presentación + lista de evidencia.',
      },
      // TODO Session 5/6: render summary; on submit call pdfFiller + AI prompts.
      questions: [],
    },
  ],
};

// Convenience: a Set of every intake question ID. Used by build-time
// sanity checks (e.g., the mapping file should not reference unknown IDs).
export const intakeQuestionIds = new Set(
  intakeSchema.steps.flatMap((s) => s.questions.map((q) => q.id))
);

export default intakeSchema;
