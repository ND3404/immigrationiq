import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Stripe from 'stripe';

const KIT_FILES = {
  marriage: 'Marriage_Green_Card_Kit_EN.pdf',
  naturalization: 'Naturalization_Kit_EN.pdf',
  'naturalization-exam': 'Citizenship_Exam_Prep_Kit_EN.pdf',
  daca: 'DACA_Kit_EN.pdf',
  eb1: 'EB1_Visa_Kit_EN.pdf',
  eb2: 'EB2_Visa_Kit_EN.pdf',
  eb3: 'EB3_Visa_Kit_EN.pdf',
  'eb1-es': 'Kit_Visa_EB1_ES.pdf',
  'eb2-es': 'Kit_Visa_EB2_ES.pdf',
  'eb3-es': 'Kit_Visa_EB3_ES.pdf',
};

function fail(res, message) {
  return res.status(403).json({ error: message });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.error('download-kit: STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const sessionId = String(req.query.session_id || '');
  const kit = String(req.query.kit || '');

  if (!sessionId.startsWith('cs_') || !kit) {
    return fail(res, 'Invalid request');
  }

  const filename = KIT_FILES[kit];
  if (!filename) {
    return fail(res, 'Unknown kit');
  }

  const stripe = new Stripe(stripeKey);

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });
  } catch (err) {
    console.error('download-kit: stripe retrieve failed', err?.message);
    return fail(res, 'Could not verify purchase');
  }

  if (session.payment_status !== 'paid') {
    return fail(res, 'Payment not completed');
  }

  const product = session.line_items?.data?.[0]?.price?.product;
  const kitId = product?.metadata?.kit_id;
  if (!kitId || kitId !== kit) {
    return fail(res, 'Kit does not match purchase');
  }

  let pdf;
  try {
    pdf = readFileSync(join(process.cwd(), 'private-kits', filename));
  } catch (err) {
    console.error('download-kit: file read failed', filename, err?.message);
    return res.status(500).json({ error: 'File unavailable' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Cache-Control', 'private, no-store');
  return res.status(200).send(pdf);
}
