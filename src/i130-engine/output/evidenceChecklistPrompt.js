// TODO Session 6: AI evidence-checklist generator.
//
// Contract:
//   buildEvidenceChecklistPrompt(answers) -> { system: string, user: string }
//
// Notes:
//   - Uses Claude (@anthropic-ai/sdk).
//   - Produces a bilingual (en/es) checklist of supporting documents
//     specific to this petitioner's situation:
//       proof of petitioner status (USC: passport/cert; LPR: green card),
//       proof of the qualifying relationship (marriage cert + bona-fide
//         evidence for spouse petitions; birth cert for parent/child;
//         shared parent birth certs for sibling),
//       proof of legal termination of prior marriages,
//       passport-style photos,
//       filing fee or fee-waiver request.
//   - Each item must explain WHY it is needed, with the USCIS rule cite
//     where available.

export const EVIDENCE_CHECKLIST_PROMPT_TEMPLATE = `\
You are an immigration paralegal. Generate the I-130 evidence checklist
specific to the facts in <answers>. Group items by category and explain
why each is required. Bilingual output (en + es).
`;

export function buildEvidenceChecklistPrompt(/* answers */) {
  throw new Error('Not implemented — Session 6');
}
