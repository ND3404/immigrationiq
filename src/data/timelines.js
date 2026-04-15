export const timelineScenarios = [
  {
    id: 'f1-h1b-gc',
    name: 'F-1 Student → H-1B → Green Card',
    fromStatus: 'F-1 Student',
    toStatus: 'Permanent Resident',
    description: 'The classic path from international student to permanent residency through employer sponsorship.',
    phases: [
      { name: 'Complete Studies', duration: '2-4 years', milestones: ['Complete degree program', 'Apply for OPT before graduation', 'Receive EAD card for OPT'] },
      { name: 'OPT Employment', duration: '1-3 years', milestones: ['Begin employment under OPT', 'Apply for STEM OPT extension (if eligible)', 'Employer begins H-1B preparation'] },
      { name: 'H-1B Lottery & Filing', duration: '3-6 months', milestones: ['Employer registers for H-1B lottery (March)', 'Lottery selection notification', 'File I-129 H-1B petition', 'H-1B approved — begin October 1'] },
      { name: 'PERM Labor Certification', duration: '8-18 months', milestones: ['Employer begins prevailing wage request', 'Recruitment process (ads, postings)', 'File PERM application with DOL', 'PERM certified'] },
      { name: 'I-140 Petition', duration: '4-12 months', milestones: ['File I-140 immigrant petition', 'Premium processing available (15 days)', 'I-140 approved — priority date established'] },
      { name: 'Wait for Priority Date', duration: '0-10+ years', milestones: ['Monitor Visa Bulletin monthly', 'Priority date becomes current', 'May need H-1B extensions beyond 6 years'] },
      { name: 'Adjustment of Status', duration: '8-18 months', milestones: ['File I-485, I-765 (EAD), I-131 (AP)', 'Attend biometrics appointment', 'Attend green card interview', 'Green card approved!'] },
    ],
    totalRange: { optimistic: '5 years', average: '7-10 years', pessimistic: '15+ years (India/China EB-2/3)' }
  },
  {
    id: 'tourist-marriage-gc',
    name: 'Tourist → Marriage → Green Card',
    fromStatus: 'B-2 Tourist / Visa Waiver',
    toStatus: 'Permanent Resident',
    description: 'Adjustment of status through marriage to a U.S. citizen after entering as a visitor.',
    phases: [
      { name: 'Entry & Marriage', duration: '1-3 months', milestones: ['Enter U.S. on B-2 or VWP', 'Marriage to U.S. citizen', 'Obtain marriage certificate', 'Important: must not have entered with preconceived intent to marry'] },
      { name: 'Concurrent Filing', duration: '1-2 weeks', milestones: ['File I-130 (Petition for Alien Relative)', 'File I-485 (Adjustment of Status) concurrently', 'File I-765 (EAD) and I-131 (Advance Parole)', 'Pay combined filing fees (~$1,975)'] },
      { name: 'Biometrics & EAD', duration: '2-6 months', milestones: ['Attend biometrics appointment', 'Receive EAD/Advance Parole combo card', 'Can begin working and traveling'] },
      { name: 'Interview & Decision', duration: '6-18 months', milestones: ['Receive interview notice', 'Attend marriage green card interview with spouse', 'Bring extensive evidence of bona fide marriage', 'Decision (usually same day)'] },
      { name: 'Green Card Received', duration: '1-3 months', milestones: ['Receive conditional green card (2-year) in mail', 'Note I-751 deadline (90 days before expiration)'] },
    ],
    totalRange: { optimistic: '10 months', average: '14-20 months', pessimistic: '24+ months' }
  },
  {
    id: 'asylum',
    name: 'Asylum Application',
    fromStatus: 'Present in U.S.',
    toStatus: 'Asylee → Permanent Resident',
    description: 'Seeking protection from persecution through the affirmative or defensive asylum process.',
    phases: [
      { name: 'Preparation & Filing', duration: '1-6 months', milestones: ['Consult with immigration attorney', 'Gather country condition evidence', 'Prepare detailed personal declaration', 'File I-589 within 1 year of arrival'] },
      { name: 'Waiting Period', duration: '6-24 months', milestones: ['Receive receipt notice', 'Apply for EAD after 150 days (if no decision)', 'EAD approved after 180 days of pending', 'Continue gathering evidence'] },
      { name: 'Asylum Interview/Hearing', duration: '1-4+ years', milestones: ['Affirmative: interview at asylum office', 'Defensive: hearing in immigration court', 'Present testimony and evidence', 'Receive decision (may take weeks to months)'] },
      { name: 'Asylee Status', duration: '1 year minimum', milestones: ['Asylum granted — authorized to work', 'Apply for travel document (Refugee Travel Document)', 'Can petition for spouse and children', 'Wait 1 year before applying for green card'] },
      { name: 'Adjustment to LPR', duration: '1-3 years', milestones: ['File I-485 after 1 year in asylee status', 'Attend biometrics appointment', 'Green card interview (if required)', 'Receive green card — backdated to 1 year before approval'] },
    ],
    totalRange: { optimistic: '2 years', average: '3-5 years', pessimistic: '7+ years (with court backlogs)' }
  },
  {
    id: 'naturalization',
    name: 'Naturalization (Green Card → Citizenship)',
    fromStatus: 'Lawful Permanent Resident',
    toStatus: 'U.S. Citizen',
    description: 'Becoming a U.S. citizen through the naturalization process after meeting residency requirements.',
    phases: [
      { name: 'Meet Eligibility Requirements', duration: '3-5 years', milestones: ['Hold green card for 5 years (or 3 if married to USC)', 'Maintain continuous residence', 'Meet physical presence requirement (30 or 18 months)', 'Reside in state for 3+ months'] },
      { name: 'Preparation & Filing', duration: '1-4 weeks', milestones: ['Study 100 civics questions', 'Practice English reading/writing', 'Gather documents (green card, tax returns, travel records)', 'File N-400 (can file 90 days early)'] },
      { name: 'Biometrics', duration: '1-2 months', milestones: ['Receive biometrics appointment notice', 'Attend appointment for fingerprints and photo', 'Background check initiated'] },
      { name: 'Interview & Test', duration: '4-12 months', milestones: ['Receive interview notice', 'Attend naturalization interview', 'Take English test (reading, writing, speaking)', 'Take civics test (6/10 correct)', 'Receive decision (usually same day)'] },
      { name: 'Oath Ceremony', duration: '1 day - 2 months', milestones: ['Scheduled for oath ceremony', 'Take Oath of Allegiance', 'Receive Certificate of Naturalization', 'You are now a U.S. citizen!'] },
    ],
    totalRange: { optimistic: '8 months (after eligibility)', average: '10-14 months', pessimistic: '18-24 months' }
  },
  {
    id: 'eb-green-card',
    name: 'Employment-Based Green Card (EB-1/EB-2/EB-3)',
    fromStatus: 'H-1B / L-1 / O-1 Worker',
    toStatus: 'Permanent Resident',
    description: 'Employer-sponsored path to permanent residence through PERM labor certification and I-140.',
    phases: [
      { name: 'Prevailing Wage Determination', duration: '2-8 months', milestones: ['Employer requests prevailing wage from DOL', 'DOL issues prevailing wage determination', 'Employer reviews and accepts wage level'] },
      { name: 'PERM Recruitment', duration: '2-4 months', milestones: ['Employer posts job advertisements', 'SWA job order posted for 30 days', 'Sunday newspaper ads (2 consecutive weeks)', 'Three additional recruitment steps', '30-day recruitment report period'] },
      { name: 'PERM Filing & Processing', duration: '4-12 months', milestones: ['File ETA-9089 with DOL', 'DOL processes PERM application', 'Possible audit (adds 6-12 months)', 'PERM certified — 180 days to file I-140'] },
      { name: 'I-140 Petition', duration: '4-12 months', milestones: ['File I-140 immigrant petition', 'Premium processing option (15 days for $2,805)', 'I-140 approved', 'Priority date = PERM filing date'] },
      { name: 'Wait for Priority Date', duration: '0-10+ years', milestones: ['Monitor monthly Visa Bulletin', 'EB-1: often current (except India/China)', 'EB-2/3 India: significant backlog (5-15+ years)', 'EB-2/3 worldwide: usually current or short wait', 'Maintain valid work status during wait'] },
      { name: 'Adjustment of Status (I-485)', duration: '8-18 months', milestones: ['File I-485, I-765, I-131 when priority date is current', 'Attend biometrics', 'EAD received — job portability after 180 days', 'Green card interview', 'Green card approved!'] },
    ],
    totalRange: { optimistic: '1.5 years (EB-1, no backlog)', average: '3-5 years (worldwide)', pessimistic: '10-20+ years (India EB-2/3)' }
  },
  {
    id: 'k1-marriage-gc',
    name: 'K-1 Fiancé → Marriage → Green Card',
    fromStatus: 'Abroad (Fiancé of USC)',
    toStatus: 'Permanent Resident',
    description: 'Coming to the U.S. on a fiancé visa, marrying within 90 days, and adjusting to permanent resident.',
    phases: [
      { name: 'I-129F Petition', duration: '6-12 months', milestones: ['U.S. citizen files I-129F with USCIS', 'Provide evidence of relationship and in-person meeting', 'USCIS approves petition', 'Case transferred to NVC'] },
      { name: 'Consular Processing', duration: '2-4 months', milestones: ['NVC forwards case to U.S. consulate', 'Submit DS-160 visa application', 'Complete medical exam abroad', 'Attend consular interview', 'K-1 visa issued (valid 6 months)'] },
      { name: 'Entry & Marriage', duration: '1-3 months', milestones: ['Enter U.S. on K-1 visa', 'Must marry U.S. citizen within 90 days', 'Obtain marriage certificate'] },
      { name: 'Adjustment of Status', duration: '8-18 months', milestones: ['File I-485, I-765 (EAD), I-131 (AP)', 'Attend biometrics appointment', 'Receive EAD — can begin working', 'Attend green card interview', 'Receive conditional green card (2-year)'] },
      { name: 'Remove Conditions', duration: '12-24 months', milestones: ['File I-751 jointly within 90-day window', 'Provide evidence of ongoing marriage', 'Attend interview if required', 'Receive permanent 10-year green card'] },
    ],
    totalRange: { optimistic: '18 months', average: '24-36 months', pessimistic: '40+ months' }
  },
];
