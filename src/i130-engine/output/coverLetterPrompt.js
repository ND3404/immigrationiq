// TODO Session 6: AI cover-letter generator.
//
// Contract:
//   buildCoverLetterPrompt(answers) -> { system: string, user: string }
//
// Notes:
//   - Uses Claude (already wired in package.json: @anthropic-ai/sdk).
//   - Output language MUST match answers.preferredLanguage (en | es).
//   - Tone: professional, plain-English, no legalese unless necessary.
//   - References USCIS terminology consistent with the field analysis.
//   - The cover letter explains:
//       who the petitioner is and their status,
//       who the beneficiary is and the qualifying relationship,
//       the evidence enclosed (cross-references the evidence checklist),
//       and a polite request for adjudication.

export const COVER_LETTER_PROMPT_TEMPLATE = `\
You are an immigration paralegal drafting a cover letter for an
I-130 petition. Use only the facts in <answers>. Do not invent details.
Match the requested language. Keep it to one page.
`;

export function buildCoverLetterPrompt(/* answers */) {
  throw new Error('Not implemented — Session 6');
}
