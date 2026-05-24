// TODO Session 5: Implement the PDF filler.
//
// Contract:
//   fillI130(answers) -> Promise<Uint8Array>
//     - `answers` is the object produced by the IntakeWizard, shaped
//       like { [intakeQuestionId]: value }.
//     - Returns the bytes of a filled PDF, ready to be offered as a
//       download or attached to an email.
//
// Implementation outline:
//   1. Load src/i130-engine/data/uscis-i130-form.pdf via pdf-lib or
//      pdfjs-dist (whichever proves more reliable for the USCIS hybrid
//      XFA/AcroForm). pdf-lib is preferred for writing; if it can't
//      load this file (it currently can't — see scripts/extract-i130-fields.mjs),
//      we can either:
//        (a) Use a different writer (pdfcpu / hexapdf via WASM, or a
//            tiny custom PDF object patcher), or
//        (b) Pre-process the form into a flat AcroForm version that
//            pdf-lib can write, and commit that as a sibling PDF.
//   2. Walk fieldMapping.json, evaluate `condition`, and write each
//      cell using the right primitive (text / check / uncheck).
//   3. Apply transforms (stripDashes, stripLeadingA, etc.).
//   4. Flatten the form so the output renders consistently in any PDF
//      viewer (USCIS accepts both flattened and live AcroForms but
//      flattened is safer for printing).

export async function fillI130(/* answers */) {
  throw new Error('Not implemented — Session 5');
}
