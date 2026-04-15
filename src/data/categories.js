export const categories = [
  // ============ NONIMMIGRANT VISAS ============
  {
    id: 'b1-b2',
    name: 'B-1/B-2 Tourist & Business Visa',
    shortName: 'B-1/B-2',
    type: 'nonimmigrant',
    description: 'Temporary visa for tourism, medical treatment, or short-term business activities in the United States.',
    difficulty: 'Easy',
    processingTime: '2-6 months',
    icon: 'Plane',
    overview: 'The B-1/B-2 visa is the most common nonimmigrant visa for visitors to the United States. The B-1 is designated for business visitors, while the B-2 is for tourists and those seeking medical treatment.\n\nB-1 activities include attending business meetings, conferences, negotiating contracts, and consulting with business associates. B-2 activities include tourism, visiting family or friends, medical treatment, and participating in social events.\n\nThese visas are typically granted for up to 6 months, with the possibility of extension. Citizens of certain countries may be eligible for the Visa Waiver Program (VWP) and travel on an ESTA instead.',
    eligibility: [
      'Valid passport with at least 6 months validity beyond your stay',
      'Demonstrate intent to return to your home country (strong ties)',
      'Proof of sufficient funds for your trip',
      'No immigrant intent',
      'No criminal inadmissibility issues',
      'Clear purpose of visit (tourism, business, medical treatment)'
    ],
    steps: [
      { step: 'Complete DS-160 online application', timeline: '1-2 hours' },
      { step: 'Pay the visa application fee ($185)', timeline: 'Same day' },
      { step: 'Schedule visa interview at U.S. Embassy/Consulate', timeline: '1-3 months wait' },
      { step: 'Gather required documents', timeline: '1-2 weeks' },
      { step: 'Attend visa interview', timeline: '15-30 minutes' },
      { step: 'Wait for visa processing', timeline: '3-5 business days' },
      { step: 'Receive passport with visa', timeline: '1-2 weeks' }
    ],
    documents: [
      'Valid passport',
      'DS-160 confirmation page',
      'Visa fee payment receipt',
      'Photo meeting State Department requirements',
      'Proof of ties to home country (employment letter, property ownership, family)',
      'Bank statements (last 3-6 months)',
      'Travel itinerary',
      'Hotel reservations',
      'Invitation letter (if visiting someone)',
      'Business meeting details (for B-1)'
    ],
    forms: [
      { number: 'DS-160', name: 'Online Nonimmigrant Visa Application', fee: '$185' }
    ],
    costs: [
      { item: 'DS-160 Application Fee', amount: '$185' },
      { item: 'Visa Issuance Fee (reciprocity)', amount: 'Varies by country' }
    ],
    commonMistakes: [
      'Failing to demonstrate strong ties to home country',
      'Insufficient financial documentation',
      'Inconsistent information between DS-160 and interview answers',
      'Overstaying a previous visa (can result in 3 or 10 year bars)',
      'Applying too close to travel date',
      'Not bringing all required documents to interview'
    ],
    afterApproval: [
      'Visa is stamped in passport — valid for multiple entries (usually 10 years)',
      'Admitted for up to 6 months per entry (check I-94)',
      'Cannot work or study on B visa',
      'May extend stay by filing I-539 before I-94 expiration',
      'Maintain valid status — do not overstay'
    ],
    relatedVisas: ['f1', 'j1', 'k1']
  },
  {
    id: 'f1',
    name: 'F-1 Student Visa',
    shortName: 'F-1',
    type: 'nonimmigrant',
    description: 'For international students attending accredited U.S. colleges, universities, language training programs, or other academic institutions.',
    difficulty: 'Moderate',
    processingTime: '3-5 months',
    icon: 'GraduationCap',
    overview: 'The F-1 visa is the most common student visa for those pursuing academic studies in the United States. It allows full-time enrollment at SEVP-certified schools including universities, colleges, high schools, private elementary schools, seminaries, conservatories, and language training programs.\n\nF-1 students may work on-campus up to 20 hours/week during the academic year and full-time during breaks. Off-campus work authorization is available through CPT (Curricular Practical Training) and OPT (Optional Practical Training).\n\nSTEM graduates may be eligible for a 24-month OPT extension, giving them up to 3 years of post-graduation work authorization.',
    eligibility: [
      'Accepted by a SEVP-certified school',
      'Have a valid Form I-20 from the school',
      'Demonstrate sufficient financial support for entire program',
      'Maintain a residence abroad with no intention of abandoning',
      'Meet English proficiency requirements',
      'Have academic qualifications for the program'
    ],
    steps: [
      { step: 'Apply and get accepted to a SEVP-certified school', timeline: '2-6 months' },
      { step: 'Receive Form I-20 from the school', timeline: '1-4 weeks' },
      { step: 'Pay SEVIS I-901 fee ($350)', timeline: 'Same day' },
      { step: 'Complete DS-160 application', timeline: '1-2 hours' },
      { step: 'Pay visa application fee ($185)', timeline: 'Same day' },
      { step: 'Schedule and attend visa interview', timeline: '1-3 months' },
      { step: 'Receive visa and travel to U.S.', timeline: '1-2 weeks' },
      { step: 'Report to school DSO upon arrival', timeline: 'Before classes start' }
    ],
    documents: [
      'Valid passport',
      'Form I-20 signed by you and DSO',
      'SEVIS fee payment receipt (I-901)',
      'DS-160 confirmation page',
      'Financial documents proving ability to pay tuition and living expenses',
      'Acceptance letter from school',
      'Transcripts and diplomas from previous education',
      'Standardized test scores (TOEFL, GRE, etc.)',
      'Proof of ties to home country'
    ],
    forms: [
      { number: 'DS-160', name: 'Online Nonimmigrant Visa Application', fee: '$185' },
      { number: 'I-901', name: 'SEVIS Fee Payment', fee: '$350' },
      { number: 'I-20', name: 'Certificate of Eligibility (from school)', fee: 'N/A' }
    ],
    costs: [
      { item: 'DS-160 Application Fee', amount: '$185' },
      { item: 'SEVIS I-901 Fee', amount: '$350' },
      { item: 'Tuition and fees', amount: 'Varies by school' },
      { item: 'Health insurance', amount: 'Usually required' }
    ],
    commonMistakes: [
      'Not maintaining full course load (minimum 12 credits for undergrad)',
      'Working off-campus without authorization',
      'Failing to report address changes to DSO within 10 days',
      'Not applying for OPT within deadline',
      'Letting I-20 expire without extending',
      'Failing to maintain valid passport'
    ],
    afterApproval: [
      'Can enter U.S. up to 30 days before program start date',
      'Must register for full course load each semester',
      'Eligible for on-campus employment (20 hrs/week during school)',
      'Apply for CPT or OPT for work experience',
      'STEM OPT extension available (additional 24 months)',
      'Can transfer to another SEVP school with proper procedures'
    ],
    relatedVisas: ['m1', 'j1', 'h1b']
  },
  {
    id: 'm1',
    name: 'M-1 Vocational Student Visa',
    shortName: 'M-1',
    type: 'nonimmigrant',
    description: 'For students attending vocational or other nonacademic programs in the United States.',
    difficulty: 'Moderate',
    processingTime: '3-5 months',
    icon: 'GraduationCap',
    overview: 'The M-1 visa is for students enrolled in vocational or nonacademic programs, other than language training. This includes technical schools, trade schools, and other recognized nonacademic institutions.\n\nUnlike F-1 students, M-1 students have more limited work authorization options and cannot change to F-1 status. M-1 students may only engage in practical training after completing their program.\n\nThe M-1 visa is initially granted for the duration of the program, up to one year, and can be extended.',
    eligibility: [
      'Accepted by a SEVP-certified vocational institution',
      'Have a valid Form I-20 from the school',
      'Demonstrate sufficient funds for the entire program',
      'Maintain residence abroad with intent to return',
      'Meet any program-specific requirements'
    ],
    steps: [
      { step: 'Apply and get accepted to a vocational program', timeline: '1-3 months' },
      { step: 'Receive Form I-20', timeline: '1-2 weeks' },
      { step: 'Pay SEVIS I-901 fee ($350)', timeline: 'Same day' },
      { step: 'Complete DS-160 and pay fee', timeline: '1-2 hours' },
      { step: 'Schedule and attend visa interview', timeline: '1-3 months' },
      { step: 'Receive visa and travel to U.S.', timeline: '1-2 weeks' }
    ],
    documents: [
      'Valid passport',
      'Form I-20',
      'SEVIS fee receipt',
      'DS-160 confirmation',
      'Financial documents',
      'Acceptance letter',
      'Proof of ties to home country'
    ],
    forms: [
      { number: 'DS-160', name: 'Online Nonimmigrant Visa Application', fee: '$185' },
      { number: 'I-901', name: 'SEVIS Fee Payment', fee: '$350' }
    ],
    costs: [
      { item: 'DS-160 Application Fee', amount: '$185' },
      { item: 'SEVIS Fee', amount: '$350' }
    ],
    commonMistakes: [
      'Attempting to change to F-1 status (not allowed)',
      'Working without authorization',
      'Not completing program within allowed time'
    ],
    afterApproval: [
      'Can enter U.S. up to 30 days before program start',
      'Must attend full course of study',
      'Practical training available after program completion',
      'Must depart within 30 days of program completion'
    ],
    relatedVisas: ['f1', 'j1']
  },
  {
    id: 'j1',
    name: 'J-1 Exchange Visitor Visa',
    shortName: 'J-1',
    type: 'nonimmigrant',
    description: 'For approved exchange visitor programs including scholars, professors, au pairs, summer work travel, and medical residents.',
    difficulty: 'Moderate',
    processingTime: '3-5 months',
    icon: 'Globe',
    overview: 'The J-1 visa is for individuals approved to participate in exchange visitor programs in the United States. These programs are designed to promote cultural exchange and are administered by designated sponsor organizations.\n\nJ-1 categories include: au pair, camp counselor, college/university student, government visitor, intern, international visitor, physician, professor/research scholar, short-term scholar, specialist, summer work travel, teacher, and trainee.\n\nSome J-1 visa holders are subject to the two-year home residency requirement (Section 212(e)), which requires them to return to their home country for two years before they can apply for certain visa types or a green card.',
    eligibility: [
      'Accepted into a designated exchange visitor program',
      'Have a valid Form DS-2019 from program sponsor',
      'Demonstrate sufficient funds or program funding',
      'Meet English proficiency requirements for your program',
      'Meet any program-specific qualifications',
      'Maintain residence abroad'
    ],
    steps: [
      { step: 'Apply and be accepted to a J-1 program', timeline: '1-6 months' },
      { step: 'Receive Form DS-2019 from sponsor', timeline: '2-4 weeks' },
      { step: 'Pay SEVIS I-901 fee ($220)', timeline: 'Same day' },
      { step: 'Complete DS-160 and pay visa fee', timeline: '1-2 hours' },
      { step: 'Schedule and attend visa interview', timeline: '1-3 months' },
      { step: 'Receive visa and travel', timeline: '1-2 weeks' }
    ],
    documents: [
      'Valid passport',
      'Form DS-2019',
      'SEVIS fee receipt',
      'DS-160 confirmation',
      'Proof of funding/financial support',
      'Program acceptance documentation',
      'Proof of qualifications for the program'
    ],
    forms: [
      { number: 'DS-160', name: 'Online Nonimmigrant Visa Application', fee: '$185' },
      { number: 'I-901', name: 'SEVIS Fee Payment', fee: '$220' },
      { number: 'DS-2019', name: 'Certificate of Eligibility (from sponsor)', fee: 'N/A' }
    ],
    costs: [
      { item: 'DS-160 Application Fee', amount: '$185' },
      { item: 'SEVIS Fee', amount: '$220' },
      { item: 'Program fees', amount: 'Varies by sponsor' }
    ],
    commonMistakes: [
      'Not understanding the two-year home residency requirement',
      'Working outside authorized program activities',
      'Failing to maintain program requirements',
      'Not obtaining a waiver of the two-year requirement when needed',
      'Overstaying the grace period (30 days after program end)'
    ],
    afterApproval: [
      'Must begin program within dates on DS-2019',
      'Maintain contact with program sponsor',
      'May be subject to two-year home residency requirement',
      '30-day grace period after program completion',
      'Can apply for J-1 waiver if subject to 212(e) requirement'
    ],
    relatedVisas: ['f1', 'h1b', 'b1-b2']
  },
  {
    id: 'h1b',
    name: 'H-1B Specialty Occupation Visa',
    shortName: 'H-1B',
    type: 'nonimmigrant',
    description: 'For workers in specialty occupations requiring a bachelor\'s degree or higher. Subject to annual lottery with 85,000 visa cap.',
    difficulty: 'Complex',
    processingTime: '3-6 months (8-12 with lottery)',
    icon: 'Briefcase',
    overview: 'The H-1B visa allows U.S. employers to employ foreign workers in specialty occupations that require at least a bachelor\'s degree or equivalent. It is one of the most popular work visas and is the primary pathway for skilled professionals to work in the United States.\n\nThe H-1B has an annual cap of 65,000 visas, plus an additional 20,000 for holders of U.S. master\'s degrees or higher. Because demand far exceeds supply, USCIS conducts a random lottery to select petitions for processing. Cap-exempt employers (universities, nonprofits, research organizations) are not subject to the lottery.\n\nH-1B status is initially granted for 3 years and can be extended to a maximum of 6 years. Extensions beyond 6 years are possible if an I-140 immigrant petition has been approved or if a PERM labor certification has been pending for at least 365 days.',
    eligibility: [
      'Job must qualify as a "specialty occupation" requiring a bachelor\'s or higher',
      'You must possess the required degree or equivalent experience',
      'Employer must file a Labor Condition Application (LCA) with DOL',
      'Employer must pay the prevailing wage for the position',
      'Valid employer-employee relationship must exist',
      'Employer must be willing to sponsor the visa'
    ],
    steps: [
      { step: 'Employer files Labor Condition Application (LCA) with DOL', timeline: '1-2 weeks' },
      { step: 'Employer registers for H-1B lottery (March)', timeline: 'March registration period' },
      { step: 'Wait for lottery selection results', timeline: 'March-April' },
      { step: 'If selected, employer files I-129 petition with USCIS', timeline: '1-2 weeks to prepare' },
      { step: 'USCIS processes petition', timeline: '3-6 months (15 days premium)' },
      { step: 'If abroad, apply for H-1B visa at U.S. consulate', timeline: '2-4 weeks' },
      { step: 'Enter the U.S. and begin employment', timeline: 'October 1 start date' }
    ],
    documents: [
      'Bachelor\'s degree or higher (or equivalent)',
      'Educational credential evaluation (if foreign degree)',
      'Resume/CV',
      'Passport',
      'Job offer letter detailing specialty occupation duties',
      'Employer\'s tax returns and financial documents',
      'Prevailing wage determination',
      'Previous immigration documents (I-94, prior visas)'
    ],
    forms: [
      { number: 'I-129', name: 'Petition for Nonimmigrant Worker', fee: '$460' },
      { number: 'I-907', name: 'Request for Premium Processing (optional)', fee: '$2,805' },
      { number: 'ETA-9035', name: 'Labor Condition Application', fee: 'N/A' }
    ],
    costs: [
      { item: 'I-129 Filing Fee', amount: '$460' },
      { item: 'ACWIA Training Fee', amount: '$750 or $1,500' },
      { item: 'Fraud Prevention Fee', amount: '$500' },
      { item: 'Asylum Program Fee', amount: '$600' },
      { item: 'Premium Processing (optional)', amount: '$2,805' },
      { item: 'Attorney fees', amount: '$2,000-$5,000' }
    ],
    commonMistakes: [
      'Not registering for the lottery on time',
      'Job description doesn\'t clearly show specialty occupation requirements',
      'Degree field doesn\'t match the job requirements',
      'Employer not paying prevailing wage',
      'Missing the October 1 start date',
      'Not planning for lottery uncertainty (only ~25-30% selection rate)',
      'Failing to maintain status while waiting'
    ],
    afterApproval: [
      'Valid for 3 years, extendable to 6 years total',
      'Can change employers by filing a new H-1B (portability allows starting work upon filing)',
      'Spouse/children can apply for H-4 dependent status',
      'Dual intent visa — can pursue green card simultaneously',
      'Extensions beyond 6 years possible with pending/approved I-140',
      'Must work only for the sponsoring employer (or file amendment for changes)'
    ],
    relatedVisas: ['l1', 'o1', 'tn', 'e2', 'eb2', 'eb3']
  },
  {
    id: 'h2a',
    name: 'H-2A Agricultural Worker Visa',
    shortName: 'H-2A',
    type: 'nonimmigrant',
    description: 'Temporary visa for foreign agricultural workers when there are not enough U.S. workers available.',
    difficulty: 'Moderate',
    processingTime: '2-4 months',
    icon: 'Building',
    overview: 'The H-2A program allows U.S. employers to bring foreign nationals to the U.S. to fill temporary agricultural jobs when there are not enough domestic workers available. Unlike H-2B, there is no annual cap on H-2A visas.\n\nEmployers must demonstrate that there are not enough U.S. workers who are able, willing, qualified, and available to do the temporary work. They must also show that employing H-2A workers will not adversely affect the wages and working conditions of similarly employed U.S. workers.\n\nH-2A workers are entitled to specific protections including free housing, transportation, and meals or cooking facilities.',
    eligibility: [
      'Job must be temporary or seasonal agricultural work',
      'Employer must demonstrate labor shortage',
      'Employer must provide free housing and transportation',
      'Worker must have job offer from qualifying employer',
      'Must intend to return home after temporary period',
      'Must be from a designated eligible country'
    ],
    steps: [
      { step: 'Employer files temporary labor certification with DOL', timeline: '45 days before need' },
      { step: 'Employer conducts required recruitment of U.S. workers', timeline: '2-4 weeks' },
      { step: 'DOL issues temporary labor certification', timeline: '30 days' },
      { step: 'Employer files I-129 with USCIS', timeline: '1-2 weeks' },
      { step: 'Worker applies for H-2A visa at consulate', timeline: '1-2 weeks' },
      { step: 'Worker enters U.S. and begins employment', timeline: 'Per contract dates' }
    ],
    documents: [
      'Valid passport',
      'Job offer letter',
      'Temporary labor certification',
      'DS-160 confirmation',
      'Proof of agricultural experience (if applicable)'
    ],
    forms: [
      { number: 'I-129', name: 'Petition for Nonimmigrant Worker', fee: '$460' },
      { number: 'ETA-790', name: 'Agricultural Clearance Order', fee: 'N/A' }
    ],
    costs: [
      { item: 'I-129 Filing Fee (paid by employer)', amount: '$460' },
      { item: 'Visa application fee', amount: '$185' },
      { item: 'Travel costs (paid by employer)', amount: 'Varies' }
    ],
    commonMistakes: [
      'Employer not filing early enough (45 days before need)',
      'Inadequate recruitment of U.S. workers',
      'Not providing required housing and transportation',
      'Worker performing non-agricultural duties'
    ],
    afterApproval: [
      'Stay authorized for period of employment contract',
      'Employer must provide promised wages and conditions',
      'Can extend or return in subsequent seasons',
      'Must depart when employment period ends'
    ],
    relatedVisas: ['h2b']
  },
  {
    id: 'h2b',
    name: 'H-2B Temporary Non-Agricultural Worker Visa',
    shortName: 'H-2B',
    type: 'nonimmigrant',
    description: 'For temporary non-agricultural workers in seasonal, peak load, or intermittent positions.',
    difficulty: 'Moderate',
    processingTime: '3-5 months',
    icon: 'Building',
    overview: 'The H-2B visa allows employers to bring foreign workers to the U.S. for temporary, non-agricultural jobs. Common industries include hospitality, landscaping, seafood processing, and construction.\n\nThe H-2B has an annual cap of 66,000 visas, split between the first half (October-March) and second half (April-September) of the fiscal year. Congress sometimes authorizes additional visas.\n\nThe employment must be temporary in nature — seasonal, peak load, intermittent, or a one-time occurrence.',
    eligibility: [
      'Job must be temporary and non-agricultural',
      'Employer must prove temporary need (seasonal, peak load, intermittent, or one-time)',
      'Employer must demonstrate U.S. worker shortage',
      'Must be from a designated eligible country',
      'Must intend to return home after temporary period'
    ],
    steps: [
      { step: 'Employer files temporary labor certification with DOL', timeline: '75-90 days before need' },
      { step: 'Employer conducts required recruitment', timeline: '3-4 weeks' },
      { step: 'DOL issues temporary labor certification', timeline: '30-45 days' },
      { step: 'Employer files I-129 with USCIS', timeline: '1-2 weeks' },
      { step: 'Worker applies for visa at consulate', timeline: '2-4 weeks' },
      { step: 'Worker enters U.S.', timeline: 'Per contract dates' }
    ],
    documents: [
      'Valid passport',
      'Job offer letter',
      'Temporary labor certification',
      'DS-160 confirmation',
      'Proof of qualifications'
    ],
    forms: [
      { number: 'I-129', name: 'Petition for Nonimmigrant Worker', fee: '$460' },
      { number: 'ETA-9142B', name: 'Application for Temporary Employment Certification', fee: 'N/A' }
    ],
    costs: [
      { item: 'I-129 Filing Fee', amount: '$460' },
      { item: 'Visa application fee', amount: '$185' }
    ],
    commonMistakes: [
      'Filing too late and missing the cap',
      'Not proving the temporary nature of the need',
      'Inadequate recruitment efforts',
      'Worker performing duties outside petition scope'
    ],
    afterApproval: [
      'Stay authorized for period of employment (up to 1 year)',
      'Can extend in 1-year increments, up to 3 years total',
      'Must depart after 3 years, then spend 3 months abroad before returning'
    ],
    relatedVisas: ['h2a', 'tn']
  },
  {
    id: 'l1',
    name: 'L-1 Intracompany Transferee Visa',
    shortName: 'L-1',
    type: 'nonimmigrant',
    description: 'For employees being transferred from a foreign office to a U.S. office of the same company in managerial, executive, or specialized knowledge roles.',
    difficulty: 'Complex',
    processingTime: '4-8 months',
    icon: 'Building',
    overview: 'The L-1 visa enables companies with offices in both the U.S. and abroad to transfer certain employees to their U.S. operations. There are two subcategories: L-1A for managers and executives, and L-1B for workers with specialized knowledge.\n\nL-1A is valid for up to 7 years, and L-1B for up to 5 years. The L-1A is particularly valuable because it provides a direct path to the EB-1C green card category for multinational managers and executives.\n\nThere is no annual cap on L-1 visas, and the Blanket L program allows qualifying companies with multiple offices to streamline the petition process.',
    eligibility: [
      'Employed by the company abroad for at least 1 continuous year in the past 3 years',
      'Being transferred to a parent, subsidiary, branch, or affiliate in the U.S.',
      'Transferring in a managerial/executive (L-1A) or specialized knowledge (L-1B) capacity',
      'The qualifying relationship between the U.S. and foreign entities must exist',
      'The U.S. entity must be doing business'
    ],
    steps: [
      { step: 'Employer prepares L-1 petition', timeline: '2-4 weeks' },
      { step: 'File I-129 with USCIS (or I-129S for Blanket L)', timeline: '1 week' },
      { step: 'USCIS processes petition', timeline: '4-8 months (15 days premium)' },
      { step: 'Apply for visa stamp at consulate (if abroad)', timeline: '2-4 weeks' },
      { step: 'Enter the U.S. and begin assignment', timeline: 'Upon approval' }
    ],
    documents: [
      'Passport',
      'Evidence of qualifying relationship between companies',
      'Proof of 1 year employment abroad',
      'Detailed job descriptions (foreign and U.S. positions)',
      'Evidence of managerial/executive/specialized knowledge role',
      'Company organizational charts',
      'Company financials (both entities)',
      'Business registration documents'
    ],
    forms: [
      { number: 'I-129', name: 'Petition for Nonimmigrant Worker', fee: '$460' },
      { number: 'I-129S', name: 'Nonimmigrant Petition Based on Blanket L Petition', fee: 'N/A' },
      { number: 'I-907', name: 'Premium Processing (optional)', fee: '$2,805' }
    ],
    costs: [
      { item: 'I-129 Filing Fee', amount: '$460' },
      { item: 'Fraud Prevention Fee', amount: '$500' },
      { item: 'Premium Processing (optional)', amount: '$2,805' },
      { item: 'Attorney fees', amount: '$3,000-$7,000' }
    ],
    commonMistakes: [
      'Not meeting the 1-year continuous employment abroad requirement',
      'Insufficient evidence of managerial/executive/specialized knowledge role',
      'Not demonstrating qualifying corporate relationship',
      'Inadequate company financial documentation',
      'Failing to plan for L-1 to green card transition'
    ],
    afterApproval: [
      'L-1A valid up to 7 years, L-1B up to 5 years',
      'Spouse gets L-2 status with EAD eligibility',
      'L-1A holders eligible for EB-1C green card (no labor certification needed)',
      'Can apply for green card while in L-1 status (dual intent)',
      'Must continue working for the sponsoring employer'
    ],
    relatedVisas: ['h1b', 'e1', 'e2', 'eb1']
  },
  {
    id: 'o1',
    name: 'O-1 Visa for Extraordinary Ability',
    shortName: 'O-1',
    type: 'nonimmigrant',
    description: 'For individuals with extraordinary ability or achievement in sciences, arts, education, business, athletics, or motion picture/TV industry.',
    difficulty: 'Complex',
    processingTime: '3-6 months',
    icon: 'Star',
    overview: 'The O-1 visa is for individuals who can demonstrate extraordinary ability in their field through sustained national or international acclaim. There are two subcategories: O-1A for sciences, education, business, and athletics, and O-1B for arts and motion picture/TV.\n\nUnlike the H-1B, there is no annual cap or lottery for O-1 visas. The standard of proof is higher, but the visa offers more flexibility — it is employer-specific but can be sponsored by an agent for multiple employers.\n\nO-1A applicants must meet at least 3 of 8 evidentiary criteria (or show a major award like a Nobel Prize). O-1B applicants must show distinction in the arts or extraordinary achievement in the motion picture/TV industry.',
    eligibility: [
      'Extraordinary ability demonstrated by sustained acclaim',
      'Meet at least 3 of 8 evidentiary criteria (O-1A) or equivalent (O-1B)',
      'Coming to the U.S. to work in your area of extraordinary ability',
      'U.S. employer or agent to sponsor the petition',
      'Peer group consultation (advisory opinion letter)'
    ],
    steps: [
      { step: 'Gather extensive evidence of extraordinary ability', timeline: '1-3 months' },
      { step: 'Obtain advisory opinion from peer group/labor organization', timeline: '2-4 weeks' },
      { step: 'Employer/agent files I-129 with USCIS', timeline: '1-2 weeks' },
      { step: 'USCIS processes petition', timeline: '3-6 months (15 days premium)' },
      { step: 'Apply for visa at consulate (if abroad)', timeline: '2-4 weeks' },
      { step: 'Enter U.S. and begin work', timeline: 'Upon approval' }
    ],
    documents: [
      'Evidence of awards, publications, media coverage',
      'Letters from experts in your field',
      'Evidence of high salary or remuneration',
      'Evidence of leading/critical role in organizations',
      'Published material about you in professional publications',
      'Evidence of judging the work of others',
      'Evidence of original contributions of major significance',
      'Employment contract or offer'
    ],
    forms: [
      { number: 'I-129', name: 'Petition for Nonimmigrant Worker', fee: '$460' },
      { number: 'I-907', name: 'Premium Processing (optional)', fee: '$2,805' }
    ],
    costs: [
      { item: 'I-129 Filing Fee', amount: '$460' },
      { item: 'Premium Processing (optional)', amount: '$2,805' },
      { item: 'Attorney fees', amount: '$5,000-$15,000' }
    ],
    commonMistakes: [
      'Not providing enough evidence for at least 3 criteria',
      'Weak recommendation letters (too generic)',
      'Not obtaining required advisory opinion',
      'Confusing O-1A and O-1B standards',
      'Underestimating the evidence burden'
    ],
    afterApproval: [
      'Initially valid for up to 3 years',
      'Can extend in 1-year increments with no maximum',
      'Dual intent — can pursue green card (EB-1A)',
      'O-3 dependent status for spouse and children',
      'Can work only for petitioning employer/agent'
    ],
    relatedVisas: ['h1b', 'eb1', 'l1']
  },
  {
    id: 'tn',
    name: 'TN Visa (USMCA Professional)',
    shortName: 'TN',
    type: 'nonimmigrant',
    description: 'For Canadian and Mexican citizens in specific professional occupations under the USMCA trade agreement.',
    difficulty: 'Easy',
    processingTime: '1-3 months',
    icon: 'Globe',
    overview: 'The TN visa is available to citizens of Canada and Mexico under the United States-Mexico-Canada Agreement (USMCA, formerly NAFTA). It allows qualified professionals to work in the U.S. in designated occupations listed in the agreement.\n\nCanadian citizens have a streamlined process — they can apply directly at a U.S. port of entry or airport without a prior petition. Mexican citizens must obtain a TN visa at a U.S. consulate.\n\nThe TN visa is issued for up to 3 years and can be renewed indefinitely. However, it is technically a nonimmigrant visa and extended renewals may raise questions about immigrant intent.',
    eligibility: [
      'Must be a citizen of Canada or Mexico',
      'Must have a job offer in a USMCA-listed profession',
      'Must have the required credentials for the profession',
      'Position must be temporary (though renewable)',
      'Common professions: engineers, accountants, scientists, economists, management consultants, etc.'
    ],
    steps: [
      { step: 'Obtain job offer from U.S. employer in qualifying profession', timeline: '1-4 weeks' },
      { step: 'Gather credentials and supporting documents', timeline: '1-2 weeks' },
      { step: 'Canadians: Apply at U.S. port of entry', timeline: 'Same day' },
      { step: 'Mexicans: Apply at U.S. consulate', timeline: '2-4 weeks' },
      { step: 'Enter U.S. and begin employment', timeline: 'Immediately' }
    ],
    documents: [
      'Proof of Canadian or Mexican citizenship',
      'Job offer letter specifying TN profession and duties',
      'Evidence of professional credentials (degree, license)',
      'Resume/CV',
      'Employer support letter'
    ],
    forms: [
      { number: 'I-129', name: 'Petition for Nonimmigrant Worker (if filing by mail)', fee: '$460' },
      { number: 'I-94', name: 'Arrival/Departure Record', fee: '$6 at border' }
    ],
    costs: [
      { item: 'I-94 fee (Canadians at border)', amount: '$6' },
      { item: 'DS-160 + visa fee (Mexicans)', amount: '$185' },
      { item: 'I-129 filing (if mailed)', amount: '$460' }
    ],
    commonMistakes: [
      'Job duties not matching a USMCA-listed profession',
      'Insufficient evidence of professional credentials',
      'Not bringing all documents to the port of entry (Canadians)',
      'Excessive renewals raising immigrant intent concerns',
      'Working for an employer not listed on the TN'
    ],
    afterApproval: [
      'Valid for up to 3 years',
      'Renewable indefinitely',
      'TD status available for spouse and children',
      'Can only work for the petitioning employer',
      'Changing to H-1B or green card requires careful planning due to intent issues'
    ],
    relatedVisas: ['h1b', 'l1', 'e1']
  },
  {
    id: 'e1',
    name: 'E-1 Treaty Trader Visa',
    shortName: 'E-1',
    type: 'nonimmigrant',
    description: 'For nationals of treaty countries carrying on substantial trade between the U.S. and their home country.',
    difficulty: 'Complex',
    processingTime: '2-5 months',
    icon: 'Landmark',
    overview: 'The E-1 Treaty Trader visa is available to nationals of countries with which the U.S. has a treaty of commerce and navigation. The applicant must be engaged in substantial trade between the U.S. and the treaty country.\n\nTrade must be "substantial" — meaning continuous and of significant volume. Over 50% of the trade must be between the U.S. and the treaty country. Trade includes goods, services, banking, insurance, transportation, tourism, and technology transfer.\n\nE-1 visas are typically granted for 2 years at a time and can be extended indefinitely as long as the qualifying trade continues.',
    eligibility: [
      'National of a country with a qualifying U.S. trade treaty',
      'Carrying on substantial trade between the U.S. and treaty country',
      'Over 50% of trade must be with the treaty country',
      'Trade must be continuous and of significant volume',
      'Coming to the U.S. to develop and direct trade operations'
    ],
    steps: [
      { step: 'Determine treaty country eligibility', timeline: '1 day' },
      { step: 'Compile evidence of substantial trade', timeline: '2-4 weeks' },
      { step: 'Apply at U.S. consulate (DS-160 + DS-156E)', timeline: '2-4 weeks' },
      { step: 'Attend consular interview', timeline: '1-2 months wait' },
      { step: 'Receive visa and enter U.S.', timeline: '1-2 weeks' }
    ],
    documents: [
      'Passport from treaty country',
      'Evidence of substantial trade (invoices, contracts, bills of lading)',
      'Business financial statements',
      'Tax returns showing trade volume',
      'Business plan',
      'Evidence of over 50% trade with treaty country'
    ],
    forms: [
      { number: 'DS-160', name: 'Online Nonimmigrant Visa Application', fee: '$185' }
    ],
    costs: [
      { item: 'DS-160 Application Fee', amount: '$185' },
      { item: 'Attorney fees', amount: '$3,000-$6,000' }
    ],
    commonMistakes: [
      'Trade volume not substantial enough',
      'Less than 50% of trade with the treaty country',
      'Failing to show continuous trade activity',
      'Not demonstrating you direct or develop the trade'
    ],
    afterApproval: [
      'Valid for 2 years, renewable indefinitely',
      'Spouse eligible for E-1 dependent status with work authorization',
      'Must continue qualifying trade activities',
      'Can include key employees of the same nationality'
    ],
    relatedVisas: ['e2', 'l1', 'b1-b2']
  },
  {
    id: 'e2',
    name: 'E-2 Treaty Investor Visa',
    shortName: 'E-2',
    type: 'nonimmigrant',
    description: 'For nationals of treaty countries investing a substantial amount of capital in a U.S. business.',
    difficulty: 'Complex',
    processingTime: '2-5 months',
    icon: 'Landmark',
    overview: 'The E-2 Treaty Investor visa allows nationals of treaty countries to enter the U.S. to develop and direct a business in which they have invested, or are actively investing, a substantial amount of capital.\n\nThere is no minimum investment amount specified by law, but the investment must be "substantial" in relation to the total cost of the business. Investments of $100,000 or more are generally considered more favorably. The investment must be at risk and committed to the enterprise.\n\nE-2 visas are typically granted for 2-5 years and can be renewed indefinitely. The visa allows the investor\'s spouse to work in the U.S. with an EAD.',
    eligibility: [
      'National of a country with a qualifying investment treaty with the U.S.',
      'Have invested or be actively investing a substantial amount of capital',
      'Investment must be in a real, operating commercial enterprise',
      'Must be coming to develop and direct the investment enterprise',
      'Investment must be at risk (not speculative)',
      'Enterprise cannot be "marginal" — must generate more than enough to support investor'
    ],
    steps: [
      { step: 'Develop business plan and make investment', timeline: '1-6 months' },
      { step: 'Compile evidence of investment and business operations', timeline: '2-4 weeks' },
      { step: 'Apply at U.S. consulate', timeline: '2-4 weeks' },
      { step: 'Attend consular interview', timeline: '1-3 months wait' },
      { step: 'Receive visa and enter U.S.', timeline: '1-2 weeks' }
    ],
    documents: [
      'Passport from treaty country',
      'Evidence of investment (wire transfers, bank statements)',
      'Business plan with financial projections',
      'Business registration documents',
      'Lease agreements, contracts',
      'Evidence the investment is at risk',
      'Source of investment funds documentation',
      'Tax returns',
      'Employee records (if applicable)'
    ],
    forms: [
      { number: 'DS-160', name: 'Online Nonimmigrant Visa Application', fee: '$185' }
    ],
    costs: [
      { item: 'DS-160 Application Fee', amount: '$185' },
      { item: 'Investment capital', amount: '$100,000+ recommended' },
      { item: 'Attorney fees', amount: '$4,000-$10,000' }
    ],
    commonMistakes: [
      'Investment not considered "substantial" enough',
      'Funds not clearly at risk or not yet committed',
      'Business plan not showing viability beyond marginal support',
      'Unclear source of investment funds',
      'Not demonstrating directing/developing role in the business'
    ],
    afterApproval: [
      'Valid for 2-5 years, renewable indefinitely',
      'Spouse eligible for EAD (work authorization)',
      'Must continue to direct and develop the enterprise',
      'No direct path to green card (but EB-5 is an alternative)',
      'Key employees of same nationality can also get E-2 status'
    ],
    relatedVisas: ['e1', 'eb5', 'l1']
  },
  {
    id: 'k1',
    name: 'K-1 Fiancé(e) Visa',
    shortName: 'K-1',
    type: 'nonimmigrant',
    description: 'For foreign-citizen fiancé(e)s of U.S. citizens to enter the U.S. and marry within 90 days of arrival.',
    difficulty: 'Complex',
    processingTime: '8-14 months',
    icon: 'Heart',
    overview: 'The K-1 visa allows the foreign fiancé(e) of a U.S. citizen to enter the United States for the purpose of getting married. The couple must marry within 90 days of the fiancé(e)\'s arrival in the U.S.\n\nThe U.S. citizen petitioner must file Form I-129F with USCIS. After approval, the case is transferred to the National Visa Center (NVC) and then to the U.S. consulate in the beneficiary\'s home country for visa processing.\n\nAfter marriage, the foreign spouse can apply for Adjustment of Status (green card) without leaving the U.S. The couple must have met in person at least once within the two years before filing the petition.',
    eligibility: [
      'Petitioner must be a U.S. citizen (not LPR)',
      'Both parties must be legally free to marry',
      'Must have met in person within the past 2 years',
      'Must intend to marry within 90 days of K-1 holder\'s arrival',
      'Must meet income requirements (125% of poverty guidelines)',
      'Petitioner must not have certain criminal history (IMBRA)'
    ],
    steps: [
      { step: 'U.S. citizen files I-129F petition with USCIS', timeline: '1-2 weeks to prepare' },
      { step: 'USCIS processes petition', timeline: '6-10 months' },
      { step: 'Case transferred to NVC and then consulate', timeline: '1-2 months' },
      { step: 'Fiancé(e) attends consular interview', timeline: '1-2 months' },
      { step: 'Fiancé(e) enters U.S. on K-1 visa', timeline: '6 months from issuance' },
      { step: 'Couple marries within 90 days', timeline: 'Within 90 days' },
      { step: 'File I-485 for Adjustment of Status', timeline: 'After marriage' }
    ],
    documents: [
      'I-129F petition form',
      'Proof of U.S. citizenship (passport, birth certificate)',
      'Evidence of meeting in person (photos, travel records)',
      'Evidence of genuine relationship (communications, visits)',
      'Passport-style photos of both parties',
      'Divorce/death certificates (if previously married)',
      'Police clearances',
      'Medical exam results (for consular processing)',
      'Affidavit of Support (I-134)'
    ],
    forms: [
      { number: 'I-129F', name: 'Petition for Alien Fiancé(e)', fee: '$535' },
      { number: 'DS-160', name: 'Online Nonimmigrant Visa Application', fee: '$265' },
      { number: 'I-485', name: 'Adjustment of Status (after marriage)', fee: '$1,440' },
      { number: 'I-134', name: 'Affidavit of Support', fee: 'N/A' }
    ],
    costs: [
      { item: 'I-129F Filing Fee', amount: '$535' },
      { item: 'DS-160 K Visa Fee', amount: '$265' },
      { item: 'Medical Exam', amount: '$200-$500' },
      { item: 'I-485 (after marriage)', amount: '$1,440' },
      { item: 'Attorney fees', amount: '$2,000-$5,000' }
    ],
    commonMistakes: [
      'Not meeting the in-person meeting requirement',
      'Insufficient evidence of genuine relationship',
      'Not marrying within the 90-day window',
      'Filing I-129F when should have filed I-130 (already married)',
      'Not filing Adjustment of Status promptly after marriage'
    ],
    afterApproval: [
      'Must marry U.S. citizen within 90 days of arrival',
      'After marriage, file I-485 for green card (conditional 2-year)',
      'File I-751 to remove conditions before 2-year anniversary',
      'Can apply for EAD and Advance Parole while I-485 is pending',
      'Children can accompany on K-2 visa'
    ],
    relatedVisas: ['marriage-green-card', 'family-based']
  },
  {
    id: 'u-visa',
    name: 'U Visa for Crime Victims',
    shortName: 'U Visa',
    type: 'nonimmigrant',
    description: 'For victims of certain crimes who have suffered mental or physical abuse and are helpful to law enforcement.',
    difficulty: 'Complex',
    processingTime: '4-5+ years',
    icon: 'Shield',
    overview: 'The U visa provides immigration benefits to victims of certain qualifying crimes who assist law enforcement in the investigation or prosecution of criminal activity. It was created by the Victims of Trafficking and Violence Protection Act of 2000.\n\nThere is an annual cap of 10,000 U visas, and the backlog is significant — processing times can exceed 5 years. However, applicants receive a bona fide determination and work authorization while waiting.\n\nQualifying crimes include domestic violence, sexual assault, trafficking, kidnapping, fraud in foreign labor contracting, and other serious offenses. After 3 years in U status, holders may apply for a green card.',
    eligibility: [
      'Victim of a qualifying crime in the U.S.',
      'Suffered substantial physical or mental abuse',
      'Have information about the criminal activity',
      'Helpful to law enforcement (or were/will be helpful)',
      'Crime occurred in the U.S. or violated U.S. laws',
      'Admissible to the U.S. (or obtain waiver)'
    ],
    steps: [
      { step: 'Report crime to law enforcement', timeline: 'As needed' },
      { step: 'Obtain law enforcement certification (Form I-918B)', timeline: '1-6 months' },
      { step: 'File I-918 petition with USCIS', timeline: '2-4 weeks to prepare' },
      { step: 'USCIS reviews for bona fide determination', timeline: '1-2 years' },
      { step: 'Receive work authorization (upon BFD)', timeline: 'After BFD' },
      { step: 'Wait for U visa number availability', timeline: '3-5+ years' },
      { step: 'U visa approved — 4 years of status', timeline: 'When number available' }
    ],
    documents: [
      'Form I-918',
      'Supplement B (law enforcement certification)',
      'Personal statement describing the crime and abuse',
      'Evidence of the crime (police reports, court records)',
      'Medical/psychological records',
      'Any evidence of helpfulness to law enforcement',
      'Waiver application I-192 (if inadmissible)'
    ],
    forms: [
      { number: 'I-918', name: 'Petition for U Nonimmigrant Status', fee: 'No fee' },
      { number: 'I-918B', name: 'U Nonimmigrant Status Certification', fee: 'No fee' },
      { number: 'I-192', name: 'Application for Advance Permission (waiver)', fee: 'No fee for U' }
    ],
    costs: [
      { item: 'Filing fees', amount: 'None' },
      { item: 'Attorney fees', amount: '$3,000-$8,000 (often pro bono available)' }
    ],
    commonMistakes: [
      'Not obtaining law enforcement certification',
      'Insufficient evidence of substantial abuse',
      'Not applying for derivative family members',
      'Missing the green card application window (before U status expires)'
    ],
    afterApproval: [
      'U visa valid for 4 years',
      'Work authorization included',
      'Can apply for green card after 3 years in U status',
      'Derivative status available for qualifying family members',
      'May be eligible for fee waivers on future applications'
    ],
    relatedVisas: ['t-visa', 'special-immigrant']
  },
  {
    id: 't-visa',
    name: 'T Visa for Trafficking Victims',
    shortName: 'T Visa',
    type: 'nonimmigrant',
    description: 'For victims of severe forms of human trafficking who assist law enforcement in investigating trafficking.',
    difficulty: 'Complex',
    processingTime: '1-3 years',
    icon: 'Shield',
    overview: 'The T visa was created to protect victims of severe forms of trafficking in persons and allow them to remain in the United States to assist federal authorities in the investigation and prosecution of human trafficking cases.\n\nThere is an annual cap of 5,000 T visas. Victims of trafficking are not required to assist law enforcement if they are under 18 or have experienced trauma. After 3 years in T status (or once the investigation is complete), T visa holders may apply for a green card.\n\nT visa holders receive work authorization, access to federal and state benefits, and protection from removal.',
    eligibility: [
      'Victim of a severe form of trafficking in persons',
      'Physically present in the U.S. on account of the trafficking',
      'Comply with reasonable requests from law enforcement (or qualify for exemption)',
      'Would suffer extreme hardship if removed from the U.S.',
      'Admissible to the U.S. (or obtain waiver)'
    ],
    steps: [
      { step: 'Contact law enforcement or service providers', timeline: 'Immediately' },
      { step: 'Gather evidence of trafficking', timeline: '2-8 weeks' },
      { step: 'File I-914 with USCIS', timeline: '2-4 weeks to prepare' },
      { step: 'USCIS processes application', timeline: '1-3 years' },
      { step: 'Receive T visa and work authorization', timeline: 'Upon approval' }
    ],
    documents: [
      'Form I-914',
      'Personal statement about trafficking experience',
      'Law enforcement declaration (if available)',
      'Evidence of trafficking (any documentation)',
      'Evidence of physical presence due to trafficking',
      'Evidence of extreme hardship if removed'
    ],
    forms: [
      { number: 'I-914', name: 'Application for T Nonimmigrant Status', fee: 'No fee' },
      { number: 'I-914B', name: 'Declaration of Law Enforcement Officer', fee: 'No fee' },
      { number: 'I-192', name: 'Advance Permission (waiver)', fee: 'No fee for T' }
    ],
    costs: [
      { item: 'Filing fees', amount: 'None' },
      { item: 'Attorney fees', amount: 'Often pro bono available' }
    ],
    commonMistakes: [
      'Not understanding that cooperation with law enforcement may not be required for minors',
      'Insufficient documentation of trafficking',
      'Not applying for derivative family members',
      'Missing green card eligibility window'
    ],
    afterApproval: [
      'T visa valid for 4 years',
      'Immediate work authorization',
      'Access to federal and state benefits',
      'Can apply for green card after 3 years',
      'Derivative status for certain family members'
    ],
    relatedVisas: ['u-visa', 'special-immigrant']
  },
  // ============ IMMIGRANT VISAS / GREEN CARD PATHS ============
  {
    id: 'family-based',
    name: 'Family-Based Green Card',
    shortName: 'Family-Based',
    type: 'immigrant',
    description: 'Green card through family sponsorship including immediate relatives (IR-1 through IR-5), preference categories (F1-F4), and special family visas (K-1, K-3, V).',
    difficulty: 'Moderate',
    processingTime: '1-20+ years (varies by category)',
    icon: 'Users',
    overview: 'Family-based immigration is the most common pathway to a green card in the United States. U.S. citizens and lawful permanent residents can petition for certain family members to receive permanent residence.\n\nImmediate relatives of U.S. citizens (spouses, unmarried children under 21, and parents) have no annual numerical limits and generally process faster. Preference categories (F1-F4) are subject to annual limits and may have significant backlogs depending on the beneficiary\'s country of birth.\n\nImmediate Relative categories: IR-1 (spouses), IR-2 (unmarried children under 21), IR-3/IR-4 (orphans adopted abroad or to be adopted), IR-5 (parents of adult U.S. citizens). Preference categories: F1 (unmarried adult children of U.S. citizens), F2A (spouses and minor children of LPRs), F2B (unmarried adult children of LPRs), F3 (married adult children of U.S. citizens), F4 (siblings of adult U.S. citizens). Special family visas include K-1 (fiancé/fiancée), K-3 (spouse married abroad), and V (waiting family members of green card holders).',
    eligibility: [
      'Have a qualifying family relationship with a U.S. citizen or LPR',
      'Petitioner meets income requirements (125% of poverty guidelines)',
      'Beneficiary is admissible to the U.S. (or qualifies for waiver)',
      'Genuine family relationship (not for immigration purposes only)',
      'Petitioner is at least 21 years old (for some categories)'
    ],
    steps: [
      { step: 'U.S. citizen or LPR files I-130 petition', timeline: '1-2 weeks to prepare' },
      { step: 'USCIS processes I-130', timeline: '6-24 months' },
      { step: 'Wait for priority date to become current (preference categories)', timeline: '0-20+ years' },
      { step: 'File I-485 (Adjustment of Status) or go through consular processing (DS-260)', timeline: '1-2 months to prepare' },
      { step: 'Attend biometrics appointment', timeline: '1-2 months after filing' },
      { step: 'Attend interview', timeline: '6-18 months after filing I-485' },
      { step: 'Receive green card', timeline: '1-3 months after interview' }
    ],
    documents: [
      'Form I-130 with evidence of relationship',
      'Petitioner\'s proof of status (citizenship certificate, green card, passport)',
      'Birth certificates proving relationship',
      'Marriage certificate (if applicable)',
      'Affidavit of Support (I-864)',
      'Beneficiary\'s passport, birth certificate, police clearances',
      'Medical exam results (I-693)',
      'Photos',
      'Financial documents (tax returns, pay stubs, employment letter)'
    ],
    forms: [
      { number: 'I-130', name: 'Petition for Alien Relative', fee: '$535' },
      { number: 'I-485', name: 'Adjustment of Status', fee: '$1,440' },
      { number: 'I-864', name: 'Affidavit of Support', fee: 'N/A' },
      { number: 'I-693', name: 'Medical Examination', fee: 'N/A (doctor fee varies)' },
      { number: 'I-765', name: 'Employment Authorization (included with I-485)', fee: 'Included' },
      { number: 'I-131', name: 'Advance Parole (included with I-485)', fee: 'Included' }
    ],
    costs: [
      { item: 'I-130 Filing Fee', amount: '$535' },
      { item: 'I-485 Filing Fee', amount: '$1,440' },
      { item: 'Medical Exam', amount: '$200-$500' },
      { item: 'Consular Processing Fee (if applicable)', amount: '$325' },
      { item: 'Attorney fees', amount: '$2,000-$6,000' }
    ],
    commonMistakes: [
      'Not filing I-130 and I-485 concurrently when eligible',
      'Insufficient evidence of genuine relationship',
      'Failing to maintain valid status while waiting',
      'Not responding to RFEs (Requests for Evidence) timely',
      'Public charge inadmissibility issues',
      'Not updating address with USCIS'
    ],
    afterApproval: [
      'Receive conditional or unconditional green card',
      'If through marriage less than 2 years: conditional 2-year green card',
      'File I-751 to remove conditions before 2-year anniversary',
      'Eligible for naturalization after 3 years (married to USC) or 5 years',
      'Must carry green card at all times',
      'Can travel freely and work without restrictions'
    ],
    relatedVisas: ['marriage-green-card', 'k1', 'naturalization'],
    subcategories: [
      {
        id: 'ir1',
        name: 'IR-1: Spouse of U.S. Citizen',
        whoQualifies: 'The foreign-born spouse of a U.S. citizen in a legally valid marriage that has lasted at least two years at the time the green card is issued. If married less than two years, a conditional (2-year) green card is issued. Same-sex marriages are recognized if legal where performed.',
        documents: [
          'Form I-130 (Petition for Alien Relative)',
          'Proof of U.S. citizenship (passport, naturalization certificate, birth certificate)',
          'Marriage certificate (certified copy)',
          'Proof of termination of any prior marriages (divorce decrees, death certificates)',
          'Evidence of bona fide marriage (joint bank accounts, lease, photos, affidavits)',
          'Passport-style photos for both petitioner and beneficiary',
          'Form I-485 or DS-260 (depending on processing route)',
          'Affidavit of Support (I-864) with tax returns, W-2s, pay stubs',
          'Medical exam (I-693)',
          'Police clearance certificates from all countries lived in 6+ months',
          'Birth certificate of the beneficiary',
        ],
        processingTime: '12-18 months (no visa number wait — immediate relative)',
        filingFees: [
          { item: 'I-130 Filing Fee', amount: '$535' },
          { item: 'I-485 Filing Fee (Adjustment of Status)', amount: '$1,440' },
          { item: 'DS-260 Immigrant Visa Fee (Consular Processing)', amount: '$325' },
          { item: 'USCIS Immigrant Fee (green card production)', amount: '$235' },
          { item: 'Medical Exam', amount: '$200-$500' },
        ],
        steps: [
          { step: 'U.S. citizen spouse files Form I-130 with USCIS', timeline: '1-2 weeks to prepare' },
          { step: 'USCIS reviews and approves I-130', timeline: '6-12 months' },
          { step: 'File I-485 (if in U.S.) or begin consular processing with DS-260 (if abroad)', timeline: '1-2 months to prepare' },
          { step: 'Attend biometrics appointment (I-485 route)', timeline: '1-2 months after filing' },
          { step: 'Attend interview at USCIS office or U.S. consulate', timeline: '4-12 months after filing' },
          { step: 'Receive green card (conditional if married < 2 years)', timeline: '1-3 months after approval' },
        ],
        priorityDates: 'No priority date wait. Immediate relatives are not subject to annual visa number limits and do not need to wait for a date to become current in the Visa Bulletin.',
      },
      {
        id: 'ir2',
        name: 'IR-2: Unmarried Child Under 21 of U.S. Citizen',
        whoQualifies: 'The unmarried child (under 21 years of age) of a U.S. citizen. The child must remain unmarried and under 21 throughout the process. Includes biological children, stepchildren (if the marriage creating the step relationship occurred before the child turned 18), and legally adopted children.',
        documents: [
          'Form I-130 (Petition for Alien Relative)',
          'Proof of U.S. citizenship of the petitioning parent',
          'Birth certificate of the child showing parent\'s name',
          'Marriage certificate of parents (if claiming through stepparent)',
          'Adoption decree (if applicable)',
          'Proof of termination of any prior marriages of the petitioning parent',
          'Passport-style photos',
          'Form I-485 or DS-260',
          'Affidavit of Support (I-864)',
          'Medical exam (I-693)',
          'School records, vaccination records',
        ],
        processingTime: '12-18 months (no visa number wait — immediate relative)',
        filingFees: [
          { item: 'I-130 Filing Fee', amount: '$535' },
          { item: 'I-485 Filing Fee (Adjustment of Status)', amount: '$1,440' },
          { item: 'DS-260 Immigrant Visa Fee (Consular Processing)', amount: '$325' },
          { item: 'USCIS Immigrant Fee', amount: '$235' },
          { item: 'Medical Exam', amount: '$200-$500' },
        ],
        steps: [
          { step: 'U.S. citizen parent files Form I-130 for the child', timeline: '1-2 weeks to prepare' },
          { step: 'USCIS reviews and approves I-130', timeline: '6-12 months' },
          { step: 'File I-485 (if child is in U.S.) or DS-260 (if abroad)', timeline: '1-2 months' },
          { step: 'Attend biometrics appointment (if I-485)', timeline: '1-2 months after filing' },
          { step: 'Attend interview', timeline: '4-12 months after filing' },
          { step: 'Child receives green card', timeline: '1-3 months after approval' },
        ],
        priorityDates: 'No priority date wait. IR-2 is an immediate relative category with no annual visa number limits. However, the child must remain unmarried and under 21 — the Child Status Protection Act (CSPA) may help protect against aging out in some cases.',
      },
      {
        id: 'ir3-ir4',
        name: 'IR-3/IR-4: Orphan Adopted by U.S. Citizen',
        whoQualifies: 'IR-3: A child adopted abroad by a U.S. citizen and who has already obtained a full and final adoption in the foreign country. IR-4: A child coming to the U.S. to be adopted by a U.S. citizen (adoption not yet finalized abroad). The child must meet the definition of "orphan" under immigration law — generally both parents deceased, disappeared, or abandoned the child, or a sole surviving parent is unable to provide care.',
        documents: [
          'Form I-600 (Petition to Classify Orphan as Immediate Relative) or I-800 (for Hague Convention countries)',
          'Home study conducted by an authorized adoption agency',
          'Proof of U.S. citizenship of the adoptive parent(s)',
          'Marriage certificate (if married) and proof of any prior marriage termination',
          'Evidence the child qualifies as an orphan (abandonment decree, death certificates of parents, relinquishment documents)',
          'Adoption decree (IR-3) or proof of adoption proceedings (IR-4)',
          'Fingerprint clearances for all household members over 18',
          'Financial evidence showing ability to support the child',
          'Medical exam of the child (I-693)',
          'Passport-style photos of the child',
        ],
        processingTime: '2-4 years (includes home study, foreign adoption process, and USCIS adjudication)',
        filingFees: [
          { item: 'I-600 or I-800 Filing Fee', amount: '$775' },
          { item: 'I-600A/I-800A (Advance Processing)', amount: '$775' },
          { item: 'Home Study', amount: '$1,500-$3,000' },
          { item: 'Adoption Agency Fees', amount: '$15,000-$50,000 (varies by country)' },
          { item: 'DS-260 Immigrant Visa Fee', amount: '$325' },
          { item: 'USCIS Immigrant Fee', amount: '$235' },
        ],
        steps: [
          { step: 'Select an accredited adoption agency and begin home study', timeline: '2-6 months' },
          { step: 'File Form I-600A/I-800A for advance processing of orphan petition', timeline: '1-3 months for approval' },
          { step: 'Complete foreign adoption process per the country\'s requirements', timeline: '6-24 months (varies widely)' },
          { step: 'File Form I-600 or I-800 with evidence of orphan status and adoption', timeline: 'After adoption or placement' },
          { step: 'Child attends immigrant visa interview at U.S. consulate', timeline: '1-3 months' },
          { step: 'Child enters U.S. as immediate relative (IR-3 gets automatic citizenship; IR-4 must finalize adoption in U.S.)', timeline: 'Upon entry or adoption finalization' },
        ],
        priorityDates: 'No priority date wait. Orphans adopted by U.S. citizens are classified as immediate relatives. However, the overall process is lengthy due to home study requirements, foreign country adoption timelines, and inter-country coordination.',
      },
      {
        id: 'ir5',
        name: 'IR-5: Parent of U.S. Citizen (Petitioner Must Be 21+)',
        whoQualifies: 'The foreign-born parent (mother or father) of a U.S. citizen who is at least 21 years of age. Includes biological parents, stepparents (if the marriage creating the step relationship occurred before the child turned 18), and adoptive parents (if adoption occurred before the child turned 16). The petitioning U.S. citizen child must be at least 21 years old at the time of filing.',
        documents: [
          'Form I-130 (Petition for Alien Relative)',
          'Proof of U.S. citizenship of the petitioning child (passport, naturalization certificate, birth certificate)',
          'Birth certificate of the U.S. citizen showing the parent\'s name',
          'Marriage certificate of parents (if claiming stepparent relationship)',
          'Adoption decree (if applicable, must show adoption before child turned 16)',
          'Passport-style photos',
          'Form I-485 or DS-260',
          'Affidavit of Support (I-864) with financial evidence',
          'Medical exam (I-693)',
          'Police clearances from all countries lived in 6+ months',
        ],
        processingTime: '12-18 months (no visa number wait — immediate relative)',
        filingFees: [
          { item: 'I-130 Filing Fee', amount: '$535' },
          { item: 'I-485 Filing Fee (Adjustment of Status)', amount: '$1,440' },
          { item: 'DS-260 Immigrant Visa Fee (Consular Processing)', amount: '$325' },
          { item: 'USCIS Immigrant Fee', amount: '$235' },
          { item: 'Medical Exam', amount: '$200-$500' },
        ],
        steps: [
          { step: 'U.S. citizen (21+) files Form I-130 for their parent', timeline: '1-2 weeks to prepare' },
          { step: 'USCIS reviews and approves I-130', timeline: '6-12 months' },
          { step: 'File I-485 (if parent is in U.S.) or DS-260 (if abroad)', timeline: '1-2 months' },
          { step: 'Attend biometrics appointment (I-485 route)', timeline: '1-2 months after filing' },
          { step: 'Attend interview at USCIS office or U.S. consulate', timeline: '4-12 months after filing' },
          { step: 'Parent receives green card', timeline: '1-3 months after approval' },
        ],
        priorityDates: 'No priority date wait. Parents of adult U.S. citizens are immediate relatives with no annual caps. Note: Lawful permanent residents (green card holders) cannot petition for their parents — only U.S. citizens can.',
      },
      {
        id: 'f1-preference',
        name: 'F1: Unmarried Sons and Daughters of U.S. Citizens',
        whoQualifies: 'The unmarried son or daughter (21 years of age or older) of a U.S. citizen. "Unmarried" means never married or legally divorced/widowed. If the beneficiary marries during the process, they move to the F3 category (married children of U.S. citizens), which has longer wait times. This category does NOT include children under 21 (those are IR-2 immediate relatives).',
        documents: [
          'Form I-130 (Petition for Alien Relative)',
          'Proof of U.S. citizenship of the petitioning parent',
          'Birth certificate of the beneficiary showing the parent\'s name',
          'Evidence the beneficiary is unmarried (sworn affidavit, absence of marriage records)',
          'Proof of termination of any prior marriages of both petitioner and beneficiary',
          'Passport-style photos',
          'Form I-485 or DS-260 (when priority date is current)',
          'Affidavit of Support (I-864)',
          'Medical exam (I-693)',
          'Police clearance certificates',
        ],
        processingTime: '7-9 years (subject to annual visa limits and country backlogs; longer for India, Mexico, Philippines)',
        filingFees: [
          { item: 'I-130 Filing Fee', amount: '$535' },
          { item: 'I-485 Filing Fee (when priority date current)', amount: '$1,440' },
          { item: 'DS-260 Immigrant Visa Fee', amount: '$325' },
          { item: 'USCIS Immigrant Fee', amount: '$235' },
          { item: 'Medical Exam', amount: '$200-$500' },
        ],
        steps: [
          { step: 'U.S. citizen parent files Form I-130 for the unmarried adult child', timeline: '1-2 weeks to prepare' },
          { step: 'USCIS reviews and approves I-130 — establishes the priority date', timeline: '6-18 months' },
          { step: 'Wait for priority date to become current per the Visa Bulletin', timeline: '7-9+ years' },
          { step: 'File I-485 (if in U.S.) or DS-260 (if abroad) once current', timeline: '1-2 months to prepare' },
          { step: 'Attend biometrics appointment', timeline: '1-2 months after filing' },
          { step: 'Attend interview', timeline: '6-18 months after filing I-485' },
          { step: 'Receive green card', timeline: '1-3 months after approval' },
        ],
        priorityDates: 'Yes — priority dates apply. The priority date is the date USCIS receives the I-130 petition. You must wait until this date is "current" per the monthly Visa Bulletin before filing for adjustment of status or immigrant visa processing. Wait times vary significantly by country of birth: worldwide ~7 years, Mexico ~21 years, Philippines ~11 years.',
      },
      {
        id: 'f2a',
        name: 'F2A: Spouse and Children of Permanent Residents',
        whoQualifies: 'The spouse and unmarried children (under 21 years of age) of a lawful permanent resident (green card holder). This is the only family preference category available to green card holders for their immediate family. If the LPR petitioner becomes a U.S. citizen during the process, the case automatically upgrades to an immediate relative category (IR-1/IR-2) with no annual cap.',
        documents: [
          'Form I-130 (Petition for Alien Relative)',
          'Proof of lawful permanent resident status (green card, I-551 stamp)',
          'Marriage certificate (for spouse)',
          'Birth certificate of child (for children)',
          'Evidence of bona fide marriage (for spouse)',
          'Proof of termination of any prior marriages',
          'Passport-style photos',
          'Form I-485 or DS-260 (when priority date is current)',
          'Affidavit of Support (I-864)',
          'Medical exam (I-693)',
          'Police clearance certificates',
        ],
        processingTime: '2-5 years (often shorter than other preference categories; sometimes current for some countries)',
        filingFees: [
          { item: 'I-130 Filing Fee', amount: '$535' },
          { item: 'I-485 Filing Fee (when priority date current)', amount: '$1,440' },
          { item: 'DS-260 Immigrant Visa Fee', amount: '$325' },
          { item: 'USCIS Immigrant Fee', amount: '$235' },
          { item: 'Medical Exam', amount: '$200-$500' },
        ],
        steps: [
          { step: 'LPR spouse or parent files Form I-130 for the family member', timeline: '1-2 weeks to prepare' },
          { step: 'USCIS reviews and approves I-130 — establishes the priority date', timeline: '6-18 months' },
          { step: 'Wait for priority date to become current per the Visa Bulletin', timeline: '2-5 years' },
          { step: 'File I-485 (if in U.S.) or DS-260 (if abroad) once current', timeline: '1-2 months to prepare' },
          { step: 'Attend biometrics and interview', timeline: '6-18 months after filing' },
          { step: 'Receive green card', timeline: '1-3 months after approval' },
        ],
        priorityDates: 'Yes — priority dates apply. However, F2A often has shorter wait times than other preference categories. If the petitioning LPR naturalizes (becomes a U.S. citizen), the case converts to immediate relative status with no visa number wait. Check the monthly Visa Bulletin for current dates.',
      },
      {
        id: 'f2b',
        name: 'F2B: Unmarried Sons and Daughters of Permanent Residents',
        whoQualifies: 'The unmarried son or daughter (21 years of age or older) of a lawful permanent resident. Unlike F2A which covers minor children, F2B covers adult unmarried children. If the beneficiary marries, they lose eligibility entirely since LPRs cannot petition for married children. If the LPR petitioner naturalizes, the case converts to F1 (unmarried adult children of U.S. citizens).',
        documents: [
          'Form I-130 (Petition for Alien Relative)',
          'Proof of lawful permanent resident status (green card)',
          'Birth certificate of the beneficiary showing the parent\'s name',
          'Evidence the beneficiary is unmarried',
          'Proof of termination of any prior marriages',
          'Passport-style photos',
          'Form I-485 or DS-260 (when priority date is current)',
          'Affidavit of Support (I-864)',
          'Medical exam (I-693)',
          'Police clearance certificates',
        ],
        processingTime: '7-12 years (subject to annual visa limits; significantly longer for Mexico and Philippines)',
        filingFees: [
          { item: 'I-130 Filing Fee', amount: '$535' },
          { item: 'I-485 Filing Fee (when priority date current)', amount: '$1,440' },
          { item: 'DS-260 Immigrant Visa Fee', amount: '$325' },
          { item: 'USCIS Immigrant Fee', amount: '$235' },
          { item: 'Medical Exam', amount: '$200-$500' },
        ],
        steps: [
          { step: 'LPR parent files Form I-130 for the unmarried adult child', timeline: '1-2 weeks to prepare' },
          { step: 'USCIS reviews and approves I-130 — establishes the priority date', timeline: '6-18 months' },
          { step: 'Wait for priority date to become current per the Visa Bulletin', timeline: '7-12+ years' },
          { step: 'File I-485 (if in U.S.) or DS-260 (if abroad) once current', timeline: '1-2 months to prepare' },
          { step: 'Attend biometrics and interview', timeline: '6-18 months after filing' },
          { step: 'Receive green card', timeline: '1-3 months after approval' },
        ],
        priorityDates: 'Yes — priority dates apply. F2B has some of the longest wait times in the family preference system. If the petitioning LPR naturalizes, the case converts to F1 category, which may have a shorter or longer wait depending on the country. Beneficiaries must remain unmarried throughout the entire process.',
      },
      {
        id: 'f3-preference',
        name: 'F3: Married Sons and Daughters of U.S. Citizens',
        whoQualifies: 'The married son or daughter (any age) of a U.S. citizen. This category includes the beneficiary\'s spouse and minor children as derivative beneficiaries. If the principal beneficiary divorces during the process, they can transfer to the F1 category (unmarried adult children of U.S. citizens), which typically has shorter wait times.',
        documents: [
          'Form I-130 (Petition for Alien Relative)',
          'Proof of U.S. citizenship of the petitioning parent',
          'Birth certificate of the beneficiary showing the parent\'s name',
          'Marriage certificate of the beneficiary',
          'Proof of termination of any prior marriages of both petitioner and beneficiary',
          'Passport-style photos for all applicants (including spouse and children)',
          'Form I-485 or DS-260 (when priority date is current)',
          'Affidavit of Support (I-864) covering all family members',
          'Medical exam (I-693) for each applicant',
          'Police clearance certificates for all applicants over 16',
        ],
        processingTime: '12-15 years (subject to annual visa limits; up to 24 years for Mexico and Philippines)',
        filingFees: [
          { item: 'I-130 Filing Fee', amount: '$535' },
          { item: 'I-485 Filing Fee (per person, when current)', amount: '$1,440' },
          { item: 'DS-260 Fee (per person)', amount: '$325' },
          { item: 'USCIS Immigrant Fee (per person)', amount: '$235' },
          { item: 'Medical Exam (per person)', amount: '$200-$500' },
        ],
        steps: [
          { step: 'U.S. citizen parent files Form I-130 for the married child', timeline: '1-2 weeks to prepare' },
          { step: 'USCIS reviews and approves I-130 — establishes the priority date', timeline: '6-18 months' },
          { step: 'Wait for priority date to become current per the Visa Bulletin', timeline: '12-15+ years' },
          { step: 'File I-485 (if in U.S.) or DS-260 (if abroad) for all family members once current', timeline: '1-3 months to prepare' },
          { step: 'All family members attend biometrics and interviews', timeline: '6-18 months after filing' },
          { step: 'All family members receive green cards', timeline: '1-3 months after approval' },
        ],
        priorityDates: 'Yes — priority dates apply. F3 has very long wait times. The derivative spouse and minor children of the principal beneficiary can immigrate together without separate petitions. If a derivative child ages out (turns 21) or marries, they may lose eligibility — consult an attorney about CSPA protections.',
      },
      {
        id: 'f4-preference',
        name: 'F4: Brothers and Sisters of U.S. Citizens',
        whoQualifies: 'The brother or sister of a U.S. citizen, where the petitioning U.S. citizen is at least 21 years of age. Includes full siblings, half-siblings (sharing one parent), and step-siblings (if the step relationship was created before either sibling turned 18). The beneficiary\'s spouse and unmarried children under 21 are included as derivative beneficiaries.',
        documents: [
          'Form I-130 (Petition for Alien Relative)',
          'Proof of U.S. citizenship of the petitioning sibling',
          'Birth certificates of both the petitioner and beneficiary showing at least one common parent',
          'Marriage certificate of the parents (if claiming through both parents)',
          'Proof of termination of any prior marriages',
          'Passport-style photos for all applicants',
          'Form I-485 or DS-260 (when priority date is current)',
          'Affidavit of Support (I-864) covering all family members',
          'Medical exam (I-693) for each applicant',
          'Police clearance certificates for all applicants over 16',
        ],
        processingTime: '14-24+ years (the longest wait of all family categories; Philippines can exceed 24 years)',
        filingFees: [
          { item: 'I-130 Filing Fee', amount: '$535' },
          { item: 'I-485 Filing Fee (per person, when current)', amount: '$1,440' },
          { item: 'DS-260 Fee (per person)', amount: '$325' },
          { item: 'USCIS Immigrant Fee (per person)', amount: '$235' },
          { item: 'Medical Exam (per person)', amount: '$200-$500' },
        ],
        steps: [
          { step: 'U.S. citizen (21+) files Form I-130 for the sibling', timeline: '1-2 weeks to prepare' },
          { step: 'USCIS reviews and approves I-130 — establishes the priority date', timeline: '6-18 months' },
          { step: 'Wait for priority date to become current per the Visa Bulletin', timeline: '14-24+ years' },
          { step: 'File I-485 (if in U.S.) or DS-260 (if abroad) for all family members once current', timeline: '1-3 months to prepare' },
          { step: 'All family members attend biometrics and interviews', timeline: '6-18 months after filing' },
          { step: 'All family members receive green cards', timeline: '1-3 months after approval' },
        ],
        priorityDates: 'Yes — priority dates apply. F4 has the longest wait times of any family preference category. Due to extremely long backlogs, there have been legislative proposals to eliminate this category entirely. LPRs (green card holders) cannot petition for siblings — only U.S. citizens can.',
      },
      {
        id: 'k1-family',
        name: 'K-1: Fiancé(e) of U.S. Citizen',
        whoQualifies: 'The foreign-born fiancé(e) of a U.S. citizen. The couple must have met in person at least once within the two years prior to filing (with limited exceptions for extreme hardship or cultural customs). The K-1 holder must marry the U.S. citizen petitioner within 90 days of entering the U.S. Only U.S. citizens can file — LPRs cannot sponsor a fiancé(e).',
        documents: [
          'Form I-129F (Petition for Alien Fiancé/Fiancée)',
          'Proof of U.S. citizenship of the petitioner',
          'Evidence the couple has met in person within 2 years (travel records, photos, boarding passes)',
          'Proof of termination of any prior marriages for both parties',
          'Birth certificates for both parties',
          'Passport-style photos of both parties',
          'Police clearance certificates for the beneficiary',
          'Medical exam of the beneficiary',
          'DS-160 (Nonimmigrant Visa Application)',
          'Evidence of ongoing relationship (communications, visit records, photos)',
        ],
        processingTime: '8-14 months (I-129F processing + consular interview)',
        filingFees: [
          { item: 'I-129F Filing Fee', amount: '$535' },
          { item: 'DS-160 Visa Application Fee', amount: '$265' },
          { item: 'Medical Exam', amount: '$200-$500' },
          { item: 'I-485 Filing Fee (after marriage, for AOS)', amount: '$1,440' },
          { item: 'USCIS Immigrant Fee', amount: '$235' },
        ],
        steps: [
          { step: 'U.S. citizen files Form I-129F with USCIS', timeline: '1-2 weeks to prepare' },
          { step: 'USCIS processes I-129F petition', timeline: '6-10 months' },
          { step: 'Case transferred to National Visa Center (NVC) and then to U.S. consulate', timeline: '1-2 months' },
          { step: 'Fiancé(e) attends visa interview at U.S. consulate', timeline: '1-3 months' },
          { step: 'Fiancé(e) enters the U.S. on K-1 visa — must marry within 90 days', timeline: '90-day deadline' },
          { step: 'After marriage, file I-485 for Adjustment of Status', timeline: '1-2 months to prepare' },
          { step: 'Attend AOS interview and receive conditional green card', timeline: '8-14 months after I-485' },
        ],
        priorityDates: 'No priority date wait — K-1 is a nonimmigrant visa and is not subject to Visa Bulletin backlogs. However, after entry and marriage, the spouse must file I-485 to adjust status to permanent residence. That process also does not require a priority date (as the marriage creates an immediate relative relationship).',
      },
      {
        id: 'k3-family',
        name: 'K-3: Spouse of U.S. Citizen (Marriage Abroad)',
        whoQualifies: 'The foreign-born spouse of a U.S. citizen where the marriage took place outside the United States. The K-3 was created to allow spouses to enter the U.S. while the I-130 immigrant petition is still pending, reducing the time spouses spend separated. In practice, the K-3 is rarely used today because I-130 processing times have improved and many cases are approved before the K-3 would be issued.',
        documents: [
          'Form I-130 (must be filed first or concurrently)',
          'Form I-129F (Petition for K-3 — references the pending I-130)',
          'Marriage certificate (from the foreign country)',
          'Proof of U.S. citizenship of the petitioner',
          'Proof of termination of any prior marriages',
          'Passport-style photos of both parties',
          'Evidence of bona fide marriage',
          'DS-160 (Nonimmigrant Visa Application)',
          'Medical exam',
          'Police clearance certificates for the beneficiary',
        ],
        processingTime: '12-18 months (however, rarely issued in practice — most cases resolve via I-130/IR-1 path first)',
        filingFees: [
          { item: 'I-130 Filing Fee', amount: '$535' },
          { item: 'I-129F Filing Fee', amount: '$535' },
          { item: 'DS-160 Visa Application Fee', amount: '$265' },
          { item: 'I-485 Filing Fee (after entry)', amount: '$1,440' },
          { item: 'Medical Exam', amount: '$200-$500' },
        ],
        steps: [
          { step: 'U.S. citizen files Form I-130 with USCIS', timeline: '1-2 weeks to prepare' },
          { step: 'U.S. citizen files Form I-129F referencing the pending I-130', timeline: 'Filed after or concurrently with I-130' },
          { step: 'USCIS processes both petitions — if I-130 is approved first, K-3 is denied as moot', timeline: '6-12 months' },
          { step: 'If K-3 is issued: spouse enters U.S. on K-3 visa and files I-485', timeline: '1-3 months' },
          { step: 'Attend AOS interview and receive green card', timeline: '8-14 months after I-485' },
        ],
        priorityDates: 'No priority date wait. The K-3 is a nonimmigrant visa that serves as a bridge while the I-130 is pending. Since spouses of U.S. citizens are immediate relatives, neither the K-3 path nor the direct I-130/IR-1 path involves Visa Bulletin waits. Note: USCIS policy is to deny the K-3 if the I-130 is already approved.',
      },
      {
        id: 'v-visa',
        name: 'V Visa: Waiting Family Members of Green Card Holders',
        whoQualifies: 'The spouse or unmarried child (under 21) of a lawful permanent resident who has had an I-130 petition filed on their behalf on or before December 21, 2000, AND has been waiting 3 or more years for an immigrant visa. The V visa was created by the Legal Immigration Family Equity (LIFE) Act of 2000 to address long F2A backlogs. Due to the filing deadline restriction, very few new V visas are issued today, but the category remains part of immigration law.',
        documents: [
          'Form I-539 (Application to Extend/Change Nonimmigrant Status) — for those already in the U.S.',
          'Form DS-160 (for consular processing)',
          'Copy of the approved or pending I-130 petition (filed on or before 12/21/2000)',
          'Evidence of 3+ years waiting since the I-130 was filed',
          'Proof of LPR status of the petitioning spouse or parent',
          'Marriage certificate or birth certificate proving qualifying relationship',
          'Passport-style photos',
          'Medical exam',
          'Police clearance certificates',
        ],
        processingTime: 'Varies — the V visa itself can be processed relatively quickly, but eligibility is limited to petitions filed on or before 12/21/2000',
        filingFees: [
          { item: 'I-539 Filing Fee (in U.S.)', amount: '$370' },
          { item: 'DS-160 Fee (consular)', amount: '$265' },
          { item: 'Medical Exam', amount: '$200-$500' },
        ],
        steps: [
          { step: 'Verify that the I-130 was filed on or before December 21, 2000', timeline: 'Prerequisite check' },
          { step: 'Verify that 3+ years have passed since the I-130 filing', timeline: 'Prerequisite check' },
          { step: 'File I-539 (if in U.S.) or DS-160 (if abroad) for V visa status', timeline: '1-2 months to prepare' },
          { step: 'Attend interview if required', timeline: '2-6 months' },
          { step: 'Receive V visa — allows entry, work authorization, and travel while waiting for green card', timeline: '1-3 months after approval' },
          { step: 'When priority date becomes current, file I-485 or proceed with consular processing for green card', timeline: 'When Visa Bulletin date is current' },
        ],
        priorityDates: 'Yes — the underlying I-130 petition is in a preference category (F2A) that requires a priority date to become current. The V visa allows the beneficiary to live and work in the U.S. while waiting for this date. Once current, they proceed with adjustment of status. The V visa was a legislative remedy for the long F2A backlogs of the late 1990s.',
      },
    ],
  },
  {
    id: 'eb1',
    name: 'EB-1 Green Card: Extraordinary Ability',
    shortName: 'EB-1',
    type: 'immigrant',
    description: 'First-preference employment-based green card for extraordinary ability, outstanding professors/researchers, and multinational managers.',
    difficulty: 'Complex',
    processingTime: '8-18 months',
    icon: 'Award',
    overview: 'EB-1 is the first preference employment-based green card category and includes three subcategories: EB-1A (extraordinary ability), EB-1B (outstanding professors and researchers), and EB-1C (multinational managers and executives).\n\nEB-1A allows self-petitioning — no employer sponsor required. Applicants must demonstrate extraordinary ability in sciences, arts, education, business, or athletics through sustained national or international acclaim. EB-1B requires an employer sponsor and a permanent job offer. EB-1C requires the applicant to have worked for the multinational employer for 1 of the preceding 3 years.\n\nEB-1 is often the fastest employment-based green card path because it\'s rarely backlogged (except for India and China-born applicants), and EB-1A does not require labor certification (PERM).',
    eligibility: [
      'EB-1A: Extraordinary ability with national/international acclaim (meet 3 of 10 criteria)',
      'EB-1B: Outstanding professor or researcher with 3+ years of experience and permanent job offer',
      'EB-1C: Multinational manager/executive with 1 year of employment abroad in past 3 years',
      'EB-1A: No job offer required (self-petition) but must work in area of ability',
      'EB-1B/C: Require employer sponsorship and permanent job offer'
    ],
    steps: [
      { step: 'Gather evidence of extraordinary ability/outstanding work', timeline: '1-3 months' },
      { step: 'File I-140 petition (self or employer-sponsored)', timeline: '1-2 weeks' },
      { step: 'USCIS processes I-140', timeline: '6-12 months (15 days premium)' },
      { step: 'When priority date is current, file I-485', timeline: 'Varies by country' },
      { step: 'Attend biometrics and interview', timeline: '3-12 months' },
      { step: 'Receive green card', timeline: '1-3 months after interview' }
    ],
    documents: [
      'Evidence of extraordinary ability (awards, publications, media, citations)',
      'Expert recommendation letters',
      'Evidence of sustained acclaim',
      'Employment offer or intent to continue work in the field',
      'Standard green card documents (passport, birth certificate, etc.)',
      'I-140 petition',
      'For EB-1C: evidence of qualifying corporate relationship and managerial role'
    ],
    forms: [
      { number: 'I-140', name: 'Immigrant Petition for Alien Workers', fee: '$700' },
      { number: 'I-485', name: 'Adjustment of Status', fee: '$1,440' },
      { number: 'I-907', name: 'Premium Processing (optional)', fee: '$2,805' }
    ],
    costs: [
      { item: 'I-140 Filing Fee', amount: '$700' },
      { item: 'I-485 Filing Fee', amount: '$1,440' },
      { item: 'Premium Processing (optional)', amount: '$2,805' },
      { item: 'Attorney fees', amount: '$5,000-$15,000' }
    ],
    commonMistakes: [
      'EB-1A: Not providing enough evidence for at least 3 criteria',
      'Weak recommendation letters',
      'Not understanding the difference between EB-1A, 1B, and 1C',
      'EB-1C: Not proving genuine managerial/executive role',
      'Not filing I-485 concurrently when priority date is current'
    ],
    afterApproval: [
      'Receive permanent green card (10-year validity)',
      'No employment restrictions',
      'Can travel freely',
      'Eligible for naturalization after 5 years',
      'Sponsor family members'
    ],
    relatedVisas: ['o1', 'eb2', 'l1']
  },
  {
    id: 'eb2',
    name: 'EB-2 Green Card: Advanced Degree / Exceptional Ability',
    shortName: 'EB-2',
    type: 'immigrant',
    description: 'Second-preference employment-based green card for professionals with advanced degrees or exceptional ability. Includes NIW option.',
    difficulty: 'Complex',
    processingTime: '1-5+ years (varies by country)',
    icon: 'Award',
    overview: 'EB-2 is the second preference employment-based green card category for professionals holding advanced degrees (master\'s or higher) or persons with exceptional ability in sciences, arts, or business.\n\nMost EB-2 cases require PERM labor certification and an employer sponsor. However, the National Interest Waiver (NIW) allows self-petitioning without a job offer or labor certification if the applicant\'s work benefits the U.S. national interest.\n\nEB-2 NIW has become increasingly popular, especially for researchers, scientists, and entrepreneurs. The standard was established in Matter of Dhanasar (2016): the proposed endeavor must have substantial merit, the person is well-positioned to advance it, and it\'s beneficial to the U.S. to waive the job offer requirement.',
    eligibility: [
      'Advanced degree (master\'s or higher, or bachelor\'s + 5 years progressive experience)',
      'OR exceptional ability in sciences, arts, or business (meet 3 of 6 criteria)',
      'Standard EB-2: requires PERM labor certification and employer sponsorship',
      'EB-2 NIW: self-petition, no employer or PERM required',
      'Job must require an advanced degree (for non-NIW cases)'
    ],
    steps: [
      { step: 'Employer files PERM labor certification (or prepare NIW petition)', timeline: '6-18 months for PERM' },
      { step: 'File I-140 petition', timeline: '1-2 weeks' },
      { step: 'USCIS processes I-140', timeline: '6-12 months (15 days premium)' },
      { step: 'Wait for priority date to become current', timeline: 'Varies by country (0-10+ years)' },
      { step: 'File I-485 for Adjustment of Status', timeline: 'When current' },
      { step: 'Attend biometrics and interview', timeline: '6-18 months' },
      { step: 'Receive green card', timeline: '1-3 months after approval' }
    ],
    documents: [
      'Advanced degree transcripts and diploma',
      'Educational credential evaluation (if foreign degree)',
      'PERM labor certification (if not NIW)',
      'Evidence of exceptional ability',
      'For NIW: evidence of proposed endeavor, qualifications, and national interest',
      'Expert recommendation letters',
      'Employment documentation'
    ],
    forms: [
      { number: 'I-140', name: 'Immigrant Petition for Alien Workers', fee: '$700' },
      { number: 'I-485', name: 'Adjustment of Status', fee: '$1,440' },
      { number: 'ETA-9089', name: 'PERM Application (if applicable)', fee: 'N/A' }
    ],
    costs: [
      { item: 'PERM (employer cost)', amount: '$3,000-$10,000 (recruitment + attorney)' },
      { item: 'I-140 Filing Fee', amount: '$700' },
      { item: 'I-485 Filing Fee', amount: '$1,440' },
      { item: 'Attorney fees', amount: '$5,000-$12,000' }
    ],
    commonMistakes: [
      'PERM: job requirements not matching applicant\'s qualifications',
      'NIW: not clearly articulating national interest',
      'Not tracking visa bulletin for priority date currency',
      'Letting PERM expire before filing I-140 (180-day window)',
      'Not considering EB-2 to EB-3 downgrade when beneficial'
    ],
    afterApproval: [
      'Receive permanent green card',
      'No employment restrictions (after 180 days with approved I-140)',
      'Can travel freely',
      'Eligible for naturalization after 5 years'
    ],
    relatedVisas: ['eb1', 'eb3', 'h1b']
  },
  {
    id: 'eb3',
    name: 'EB-3 Green Card: Skilled Workers & Professionals',
    shortName: 'EB-3',
    type: 'immigrant',
    description: 'Third-preference employment-based green card for skilled workers, professionals with bachelor\'s degrees, and other workers.',
    difficulty: 'Complex',
    processingTime: '2-10+ years (varies by country)',
    icon: 'Award',
    overview: 'EB-3 is the third preference employment-based green card category. It includes three subcategories: skilled workers (jobs requiring 2+ years of training/experience), professionals (jobs requiring a U.S. bachelor\'s degree or equivalent), and other workers (unskilled labor requiring less than 2 years of training/experience).\n\nAll EB-3 cases require PERM labor certification and employer sponsorship. The "other workers" subcategory has a limited annual allotment of 10,000 visas and typically has the longest wait times.\n\nFor applicants from India and China, EB-3 backlogs can be extremely long (10+ years). Some applicants with approved EB-2 petitions may choose to downgrade to EB-3 if the EB-3 priority dates are more favorable.',
    eligibility: [
      'Skilled Worker: Job requires minimum 2 years training/experience',
      'Professional: Job requires a U.S. bachelor\'s degree or foreign equivalent',
      'Other Worker: Job requires less than 2 years training (unskilled)',
      'Employer must complete PERM labor certification process',
      'Must have a permanent, full-time job offer'
    ],
    steps: [
      { step: 'Employer files PERM labor certification with DOL', timeline: '6-18 months' },
      { step: 'Employer files I-140 petition', timeline: '1-2 weeks' },
      { step: 'USCIS processes I-140', timeline: '6-12 months' },
      { step: 'Wait for priority date to become current', timeline: '1-10+ years' },
      { step: 'File I-485 for Adjustment of Status', timeline: 'When current' },
      { step: 'Attend biometrics and interview', timeline: '6-18 months' },
      { step: 'Receive green card', timeline: '1-3 months' }
    ],
    documents: [
      'PERM labor certification',
      'Degree/diploma',
      'Evidence of required experience',
      'Job offer letter',
      'Standard green card documents'
    ],
    forms: [
      { number: 'ETA-9089', name: 'PERM Application', fee: 'N/A' },
      { number: 'I-140', name: 'Immigrant Petition for Alien Workers', fee: '$700' },
      { number: 'I-485', name: 'Adjustment of Status', fee: '$1,440' }
    ],
    costs: [
      { item: 'PERM costs', amount: '$3,000-$10,000' },
      { item: 'I-140 Filing Fee', amount: '$700' },
      { item: 'I-485 Filing Fee', amount: '$1,440' },
      { item: 'Attorney fees', amount: '$4,000-$10,000' }
    ],
    commonMistakes: [
      'PERM job requirements too narrowly tailored',
      'Not keeping track of changing priority dates',
      'Not considering EB-2 if qualifications permit',
      'Losing H-1B status while waiting for green card'
    ],
    afterApproval: [
      'Receive permanent green card',
      'No employment restrictions after 180 days with approved I-140',
      'Eligible for naturalization after 5 years'
    ],
    relatedVisas: ['eb2', 'eb1', 'h1b']
  },
  {
    id: 'eb4',
    name: 'EB-4 Special Immigrant Green Card',
    shortName: 'EB-4',
    type: 'immigrant',
    description: 'Fourth-preference green card for special immigrants including religious workers, broadcasters, and other special categories.',
    difficulty: 'Moderate',
    processingTime: '1-3 years',
    icon: 'FileText',
    overview: 'EB-4 covers a diverse group of "special immigrants" including religious workers, certain employees of the U.S. government abroad, broadcasters, retired NATO employees, and other specific groups defined by law.\n\nThe most common EB-4 category is religious workers (ministers and non-ministers in religious vocations). This requires 2 years of membership in a religious denomination and a qualifying job offer from a religious organization.\n\nEB-4 does not require PERM labor certification. Each subcategory has its own specific eligibility requirements and documentation.',
    eligibility: [
      'Qualify under one of the EB-4 special immigrant categories',
      'Religious workers: 2 years membership in qualifying denomination',
      'Must have a qualifying job offer (for most categories)',
      'Meet category-specific requirements',
      'Be admissible to the U.S.'
    ],
    steps: [
      { step: 'Determine qualifying EB-4 subcategory', timeline: '1 week' },
      { step: 'File I-360 petition', timeline: '2-4 weeks to prepare' },
      { step: 'USCIS processes I-360', timeline: '6-18 months' },
      { step: 'File I-485 when priority date is current', timeline: 'Varies' },
      { step: 'Attend interview and receive green card', timeline: '6-12 months' }
    ],
    documents: [
      'I-360 petition',
      'Evidence of qualifying category membership',
      'Religious workers: denominational membership proof, job offer',
      'Standard green card documents'
    ],
    forms: [
      { number: 'I-360', name: 'Petition for Amerasian, Widow(er), or Special Immigrant', fee: '$435' },
      { number: 'I-485', name: 'Adjustment of Status', fee: '$1,440' }
    ],
    costs: [
      { item: 'I-360 Filing Fee', amount: '$435' },
      { item: 'I-485 Filing Fee', amount: '$1,440' }
    ],
    commonMistakes: [
      'Not meeting the 2-year membership requirement (religious workers)',
      'Insufficient evidence of qualifying role',
      'Not understanding which EB-4 subcategory applies'
    ],
    afterApproval: [
      'Receive permanent green card',
      'No employment restrictions',
      'Eligible for naturalization after 5 years'
    ],
    relatedVisas: ['special-immigrant', 'eb3']
  },
  {
    id: 'eb5',
    name: 'EB-5 Investor Green Card',
    shortName: 'EB-5',
    type: 'immigrant',
    description: 'Green card through substantial investment ($800,000-$1,050,000) in a U.S. commercial enterprise that creates 10 full-time jobs.',
    difficulty: 'Complex',
    processingTime: '2-5 years',
    icon: 'Landmark',
    overview: 'The EB-5 Immigrant Investor Program allows foreign investors to obtain a green card by making a substantial investment in a new commercial enterprise that creates at least 10 full-time jobs for U.S. workers.\n\nThe standard investment amount is $1,050,000, reduced to $800,000 for investments in Targeted Employment Areas (TEAs) — rural areas or areas with high unemployment. Investors can invest directly in their own enterprise or through a USCIS-designated Regional Center.\n\nThe EB-5 Reform and Integrity Act of 2022 created reserved visa categories for rural areas, high unemployment areas, and infrastructure projects, with faster processing and separate visa queues.',
    eligibility: [
      'Invest $1,050,000 (or $800,000 in a TEA) in a new commercial enterprise',
      'Enterprise must create at least 10 full-time U.S. jobs',
      'Investment capital must be lawfully sourced',
      'Capital must be "at risk" in the enterprise',
      'Investor must be involved in management (at least policy-making level)'
    ],
    steps: [
      { step: 'Choose investment pathway (direct or regional center)', timeline: '1-3 months' },
      { step: 'Document source of investment funds', timeline: '1-3 months' },
      { step: 'Make the qualifying investment', timeline: 'Varies' },
      { step: 'File I-526E petition with USCIS', timeline: '2-4 weeks' },
      { step: 'USCIS processes I-526E', timeline: '1-3 years' },
      { step: 'File I-485 or go through consular processing', timeline: '6-18 months' },
      { step: 'Receive conditional green card (2 years)', timeline: 'Upon approval' },
      { step: 'File I-829 to remove conditions', timeline: 'Before 2-year expiration' }
    ],
    documents: [
      'Evidence of lawful source of funds (tax returns, business records, bank statements)',
      'Business plan showing job creation',
      'Investment documentation (wire transfers, corporate records)',
      'Evidence of new commercial enterprise',
      'TEA designation documentation (if applicable)',
      'Regional center documentation (if applicable)'
    ],
    forms: [
      { number: 'I-526E', name: 'Immigrant Petition by Regional Center Investor', fee: '$3,675' },
      { number: 'I-485', name: 'Adjustment of Status', fee: '$1,440' },
      { number: 'I-829', name: 'Petition to Remove Conditions (EB-5)', fee: '$3,750' }
    ],
    costs: [
      { item: 'Investment capital', amount: '$800,000-$1,050,000' },
      { item: 'I-526E Filing Fee', amount: '$3,675' },
      { item: 'I-485 Filing Fee', amount: '$1,440' },
      { item: 'I-829 Filing Fee', amount: '$3,750' },
      { item: 'Attorney fees', amount: '$15,000-$50,000' },
      { item: 'Regional center administrative fees', amount: '$50,000-$80,000' }
    ],
    commonMistakes: [
      'Not properly documenting the lawful source of funds',
      'Investment not genuinely at risk',
      'Business plan not showing credible job creation',
      'Choosing a fraudulent regional center',
      'Not filing I-829 on time to remove conditions'
    ],
    afterApproval: [
      'Receive conditional 2-year green card',
      'Must file I-829 before conditions expire',
      'After conditions removed: permanent green card',
      'Investment must be maintained until conditions removed',
      'Eligible for naturalization after 5 years'
    ],
    relatedVisas: ['e2', 'eb1']
  },
  {
    id: 'diversity-visa',
    name: 'Diversity Visa Lottery (DV)',
    shortName: 'DV Lottery',
    type: 'immigrant',
    description: 'Annual lottery program providing ~55,000 green cards to individuals from countries with historically low immigration rates to the U.S.',
    difficulty: 'Easy',
    processingTime: '1-2 years (if selected)',
    icon: 'Globe',
    overview: 'The Diversity Visa (DV) Lottery Program, also known as the Green Card Lottery, makes up to 55,000 immigrant visas available annually through a random selection process among entries from countries with historically low rates of immigration to the United States.\n\nRegistration is free and occurs during a limited period each fall (usually October-November). Selected individuals are notified the following May and must complete processing before the end of the fiscal year (September 30).\n\nApplicants must have at least a high school education or equivalent, or 2 years of work experience in a qualifying occupation within the past 5 years. Citizens of countries that have sent more than 50,000 immigrants in the past 5 years are not eligible.',
    eligibility: [
      'Born in an eligible country (not high-immigration countries like India, China, Mexico, etc.)',
      'Have at least a high school diploma or equivalent',
      'OR have 2 years of qualifying work experience in past 5 years',
      'Meet general admissibility requirements',
      'Registration is free — beware of scam websites'
    ],
    steps: [
      { step: 'Submit electronic DV Lottery entry during registration period', timeline: 'October-November' },
      { step: 'Check results (Entrant Status Check)', timeline: 'May of following year' },
      { step: 'If selected: complete DS-260 immigrant visa application', timeline: '1-2 months' },
      { step: 'Submit civil documents to NVC', timeline: '1-2 months' },
      { step: 'Attend consular interview', timeline: '2-6 months after selection' },
      { step: 'Enter U.S. before fiscal year ends (September 30)', timeline: 'Before deadline' }
    ],
    documents: [
      'Passport',
      'Birth certificate',
      'High school diploma or work experience evidence',
      'Police clearances',
      'Medical exam results',
      'Photos meeting specifications',
      'DS-260 application',
      'Affidavit of Support (I-134 or I-864)'
    ],
    forms: [
      { number: 'DS-260', name: 'Immigrant Visa Application', fee: '$330' },
      { number: 'E-DV', name: 'Electronic Diversity Visa Entry', fee: 'Free' }
    ],
    costs: [
      { item: 'DV Lottery registration', amount: 'Free' },
      { item: 'DS-260 Processing Fee', amount: '$330' },
      { item: 'Medical Exam', amount: '$200-$500' },
      { item: 'USCIS Immigrant Fee', amount: '$220' }
    ],
    commonMistakes: [
      'Submitting multiple entries (will disqualify you)',
      'Using fraudulent lottery websites (official site is dvprogram.state.gov)',
      'Not checking results during the check period',
      'Not completing processing before September 30 deadline',
      'Not including all family members in the application'
    ],
    afterApproval: [
      'Receive immigrant visa and enter U.S. as permanent resident',
      'Green card mailed to U.S. address',
      'Full permanent resident rights immediately',
      'Eligible for naturalization after 5 years',
      'Spouse and unmarried children under 21 may accompany'
    ],
    relatedVisas: ['family-based', 'eb3']
  },
  {
    id: 'refugee-asylum',
    name: 'Refugee & Asylum',
    shortName: 'Refugee/Asylum',
    type: 'immigrant',
    description: 'Protection for individuals who have been persecuted or fear persecution on account of race, religion, nationality, political opinion, or social group.',
    difficulty: 'Complex',
    processingTime: '6 months - 5+ years',
    icon: 'Shield',
    overview: 'Refugee status and asylum are forms of protection for individuals who have been persecuted or have a well-founded fear of persecution on account of race, religion, nationality, membership in a particular social group, or political opinion.\n\nThe key difference: refugees apply from outside the U.S. (referred by UNHCR or a U.S. embassy), while asylum seekers apply from within the U.S. or at a port of entry. Asylum can be applied for affirmatively (with USCIS) or defensively (in immigration court during removal proceedings).\n\nAffirmative asylum applications should be filed within 1 year of arrival in the U.S. After 1 year in asylee status, asylees can apply for a green card.',
    eligibility: [
      'Well-founded fear of persecution on account of a protected ground',
      'Protected grounds: race, religion, nationality, political opinion, particular social group',
      'Asylum: must be in the U.S. or at a port of entry',
      'Asylum: generally must file within 1 year of arrival',
      'Refugee: must be outside the U.S. and not firmly resettled elsewhere',
      'Not barred (serious crimes, danger to security, firm resettlement)'
    ],
    steps: [
      { step: 'Asylum: File I-589 with USCIS (affirmative) or immigration court (defensive)', timeline: 'Within 1 year of arrival' },
      { step: 'Receive receipt notice and work authorization eligibility (180 days after filing)', timeline: '2-4 weeks' },
      { step: 'Attend asylum interview (affirmative) or hearing (defensive)', timeline: '6 months - 5+ years' },
      { step: 'Receive decision', timeline: 'Weeks to months after interview' },
      { step: 'If granted: apply for green card after 1 year', timeline: '1 year after grant' },
      { step: 'File I-485 for adjustment to permanent resident', timeline: '1-2 years' }
    ],
    documents: [
      'Form I-589',
      'Detailed personal declaration describing persecution',
      'Country condition evidence (State Department reports, news, expert reports)',
      'Evidence of persecution (photos, medical records, police reports)',
      'Identity documents (passport, ID)',
      'Witness statements',
      'Expert declarations (if available)'
    ],
    forms: [
      { number: 'I-589', name: 'Application for Asylum and Withholding of Removal', fee: 'No fee' },
      { number: 'I-485', name: 'Adjustment of Status (after 1 year)', fee: '$1,440' },
      { number: 'I-765', name: 'Employment Authorization Document', fee: 'No fee for asylees' }
    ],
    costs: [
      { item: 'I-589 Filing Fee', amount: 'Free' },
      { item: 'Attorney fees', amount: '$5,000-$15,000 (pro bono often available)' },
      { item: 'I-485 Filing Fee (after grant)', amount: '$1,440' }
    ],
    commonMistakes: [
      'Missing the 1-year filing deadline',
      'Insufficient evidence of persecution or fear',
      'Not connecting persecution to a protected ground',
      'Inconsistent statements between application and interview',
      'Not applying for work authorization when eligible',
      'Not applying for green card within 1 year of asylum grant'
    ],
    afterApproval: [
      'Authorized to work immediately',
      'Apply for green card after 1 year in asylee status',
      'Can travel with refugee travel document (I-131)',
      'Eligible for certain federal benefits',
      'Can petition for spouse and children',
      'Eligible for naturalization after 4 years as LPR (5 years minus 1 year as asylee)'
    ],
    relatedVisas: ['u-visa', 't-visa', 'tps', 'special-immigrant']
  },
  {
    id: 'special-immigrant',
    name: 'Special Immigrant Visa (SIJ, Religious Workers, VAWA)',
    shortName: 'Special Immigrant',
    type: 'immigrant',
    description: 'Special immigration categories including Special Immigrant Juveniles, religious workers, and VAWA self-petitioners.',
    difficulty: 'Complex',
    processingTime: '1-5 years',
    icon: 'Shield',
    overview: 'Special Immigrant categories encompass several distinct pathways to permanent residence for specific populations:\n\nSpecial Immigrant Juvenile Status (SIJS) is for children in the U.S. who have been abused, neglected, or abandoned by a parent, and for whom returning to their home country is not in their best interest. Requires a state court order.\n\nVAWA (Violence Against Women Act) allows certain abused spouses, children, and parents of U.S. citizens and permanent residents to self-petition for immigration relief without the abuser\'s knowledge or consent.\n\nReligious workers with at least 2 years of membership in a religious denomination may qualify for the EB-4 special immigrant category.',
    eligibility: [
      'SIJS: Under 21, unmarried, declared dependent on juvenile court, abused/neglected/abandoned',
      'VAWA: Abused spouse, child, or parent of a U.S. citizen or LPR',
      'Religious Workers: 2 years of membership, qualifying religious occupation',
      'Must be admissible or qualify for waiver',
      'Each subcategory has specific additional requirements'
    ],
    steps: [
      { step: 'Obtain required predicate order or evidence', timeline: '1-6 months' },
      { step: 'File I-360 petition', timeline: '2-4 weeks to prepare' },
      { step: 'USCIS processes I-360', timeline: '6-24 months' },
      { step: 'File I-485 when eligible', timeline: 'Varies' },
      { step: 'Attend interview and receive green card', timeline: '6-18 months' }
    ],
    documents: [
      'I-360 petition',
      'SIJS: state court order, birth certificate, evidence of abuse/neglect',
      'VAWA: evidence of abuse, relationship proof, good moral character',
      'Religious workers: denominational letter, job offer, membership proof',
      'Standard green card documents'
    ],
    forms: [
      { number: 'I-360', name: 'Petition for Amerasian, Widow(er), or Special Immigrant', fee: 'No fee for SIJS/VAWA' },
      { number: 'I-485', name: 'Adjustment of Status', fee: 'No fee for SIJS/VAWA' }
    ],
    costs: [
      { item: 'Filing fees', amount: 'Often waived for SIJS and VAWA' },
      { item: 'Attorney fees', amount: '$3,000-$10,000 (pro bono often available)' }
    ],
    commonMistakes: [
      'SIJS: aging out (turning 21) before approval',
      'VAWA: insufficient evidence of abuse',
      'Not understanding confidentiality protections under VAWA',
      'Missing filing deadlines'
    ],
    afterApproval: [
      'Receive permanent green card',
      'VAWA: protected from abuser knowing about the application',
      'Eligible for naturalization after 5 years',
      'May be eligible for certain benefits'
    ],
    relatedVisas: ['u-visa', 'refugee-asylum', 'family-based']
  },
  {
    id: 'marriage-green-card',
    name: 'Green Card through Marriage',
    shortName: 'Marriage Green Card',
    type: 'immigrant',
    description: 'Obtaining permanent residence through marriage to a U.S. citizen or lawful permanent resident.',
    difficulty: 'Moderate',
    processingTime: '10-24 months',
    icon: 'Heart',
    overview: 'Marriage to a U.S. citizen or lawful permanent resident (LPR) is one of the most common paths to a green card. Spouses of U.S. citizens are classified as "immediate relatives" with no annual visa caps, resulting in faster processing.\n\nIf the marriage is less than 2 years old when the green card is approved, the spouse receives a conditional 2-year green card. They must file Form I-751 jointly to remove conditions within 90 days before the 2-year anniversary.\n\nUSCIS carefully examines marriage-based cases for fraud. The couple must provide extensive evidence that the marriage is genuine and not entered into solely for immigration benefits.',
    eligibility: [
      'Legally married to a U.S. citizen or LPR',
      'Marriage must be valid where it took place and recognized under U.S. law',
      'Must demonstrate the marriage is genuine (bona fide)',
      'Petitioner meets income requirements (125% of poverty guidelines)',
      'Beneficiary is admissible or qualifies for waiver'
    ],
    steps: [
      { step: 'File I-130 (and I-485 concurrently if in the U.S.)', timeline: '1-2 weeks to prepare' },
      { step: 'USCIS processes I-130/I-485', timeline: '8-24 months' },
      { step: 'Attend biometrics appointment', timeline: '1-2 months after filing' },
      { step: 'Receive EAD and Advance Parole (if I-485 filed)', timeline: '3-8 months' },
      { step: 'Attend marriage interview', timeline: '8-24 months after filing' },
      { step: 'Receive green card (conditional if married < 2 years)', timeline: '1-3 months after interview' },
      { step: 'File I-751 to remove conditions (90 days before expiration)', timeline: '21-24 months after green card' }
    ],
    documents: [
      'Marriage certificate',
      'Proof of bona fide marriage (joint accounts, lease, photos, correspondence)',
      'I-130 petition',
      'I-864 Affidavit of Support with financial documents',
      'Petitioner\'s citizenship/LPR proof',
      'Both parties\' passports and birth certificates',
      'Divorce/death certificates (if previously married)',
      'Medical exam (I-693)',
      'Photos together spanning the relationship',
      'Joint financial documents (taxes, bank accounts, insurance)'
    ],
    forms: [
      { number: 'I-130', name: 'Petition for Alien Relative', fee: '$535' },
      { number: 'I-485', name: 'Adjustment of Status', fee: '$1,440' },
      { number: 'I-864', name: 'Affidavit of Support', fee: 'N/A' },
      { number: 'I-751', name: 'Petition to Remove Conditions', fee: '$760' }
    ],
    costs: [
      { item: 'I-130 Filing Fee', amount: '$535' },
      { item: 'I-485 Filing Fee', amount: '$1,440' },
      { item: 'Medical Exam', amount: '$200-$500' },
      { item: 'I-751 Filing Fee', amount: '$760' },
      { item: 'Attorney fees', amount: '$2,000-$5,000' }
    ],
    commonMistakes: [
      'Insufficient evidence of genuine marriage',
      'Not filing I-751 on time (within 90-day window)',
      'Not filing I-130 and I-485 concurrently when eligible',
      'Failing Affidavit of Support income requirements',
      'Previous immigration violations creating bars to adjustment'
    ],
    afterApproval: [
      'If married 2+ years: permanent 10-year green card',
      'If married < 2 years: conditional 2-year green card',
      'Must file I-751 to remove conditions (joint filing or waiver)',
      'Eligible for naturalization after 3 years (if still married to USC)',
      'Can work and travel freely'
    ],
    relatedVisas: ['k1', 'family-based', 'i751', 'naturalization']
  },
  // ============ CITIZENSHIP & NATURALIZATION ============
  {
    id: 'naturalization',
    name: 'Naturalization (N-400)',
    shortName: 'Naturalization',
    type: 'citizenship',
    description: 'The process of becoming a U.S. citizen by filing Form N-400 after meeting residency, physical presence, and other requirements.',
    difficulty: 'Moderate',
    processingTime: '8-14 months',
    icon: 'Flag',
    overview: 'Naturalization is the process by which a foreign citizen or national becomes a U.S. citizen. To be eligible, applicants must be lawful permanent residents who have met specific requirements for continuous residence, physical presence, good moral character, English language ability, and knowledge of U.S. government and history.\n\nMost applicants must have been LPRs for 5 years (or 3 years if married to a U.S. citizen). The naturalization test covers English language (reading, writing, speaking) and civics (U.S. history and government — 100 possible questions, must answer 6/10 correctly).\n\nAfter approval, applicants take the Oath of Allegiance at a naturalization ceremony, after which they become U.S. citizens with full rights including the right to vote, hold public office, and obtain a U.S. passport.',
    eligibility: [
      'Be at least 18 years old',
      'Be a lawful permanent resident for 5 years (or 3 years if married to U.S. citizen)',
      'Continuous residence: lived in the U.S. for 5 (or 3) years with no trips over 6 months',
      'Physical presence: actually present in U.S. for at least 30 months (or 18 months)',
      'Lived in your state/district for at least 3 months before filing',
      'Good moral character',
      'Pass English and civics tests',
      'Willing to take the Oath of Allegiance'
    ],
    steps: [
      { step: 'Determine eligibility and prepare application', timeline: '1-2 weeks' },
      { step: 'File N-400 with USCIS', timeline: 'Same day' },
      { step: 'Attend biometrics appointment', timeline: '1-2 months' },
      { step: 'Study for civics and English test', timeline: '2-4 months' },
      { step: 'Attend naturalization interview and test', timeline: '6-12 months after filing' },
      { step: 'Receive decision', timeline: 'Same day or within weeks' },
      { step: 'Attend oath ceremony', timeline: 'Days to weeks after approval' }
    ],
    documents: [
      'Form N-400',
      'Green card (bring original to interview)',
      'Passport and travel records',
      'Tax returns (last 5 years)',
      'Proof of marital history',
      'Any court/arrest records (if applicable)',
      'Two passport-style photos',
      'Evidence of selective service registration (males 18-31)'
    ],
    forms: [
      { number: 'N-400', name: 'Application for Naturalization', fee: '$760' }
    ],
    costs: [
      { item: 'N-400 Filing Fee', amount: '$760' },
      { item: 'Biometrics Fee', amount: 'Included' },
      { item: 'Fee waiver available', amount: 'I-912 for low income' }
    ],
    commonMistakes: [
      'Filing too early (before meeting residence/presence requirements)',
      'Trips abroad over 6 months breaking continuous residence',
      'Not disclosing arrests or criminal history',
      'Not studying for the civics test',
      'Not being able to read/write/speak basic English',
      'Filing with incorrect name or information'
    ],
    afterApproval: [
      'Take Oath of Allegiance at ceremony',
      'Receive Certificate of Naturalization',
      'Apply for U.S. passport immediately',
      'Register to vote',
      'Full citizen rights: vote, hold public office, sponsor relatives',
      'Can petition for parents and siblings'
    ],
    relatedVisas: ['family-based', 'marriage-green-card']
  },
  {
    id: 'citizenship-birth',
    name: 'Citizenship by Birth',
    shortName: 'Birth Citizenship',
    type: 'citizenship',
    description: 'Automatic U.S. citizenship for persons born in the United States or born abroad to U.S. citizen parents.',
    difficulty: 'Easy',
    processingTime: 'Automatic / 6-12 months for documentation',
    icon: 'Flag',
    overview: 'Under the 14th Amendment, most persons born in the United States are automatically U.S. citizens at birth, regardless of their parents\' immigration status. This is known as jus soli (right of the soil).\n\nChildren born abroad to U.S. citizen parents may also acquire citizenship at birth (jus sanguinis), provided certain conditions are met regarding the parent\'s prior physical presence in the U.S. The specific requirements depend on whether one or both parents are citizens and whether the parents were married.\n\nFor children born abroad, the U.S. citizen parent should register the birth at the nearest U.S. embassy or consulate to obtain a Consular Report of Birth Abroad (CRBA), which serves as proof of citizenship.',
    eligibility: [
      'Born in the United States (including territories)',
      'OR born abroad to two U.S. citizen parents (at least one with prior U.S. residence)',
      'OR born abroad to one U.S. citizen parent who meets physical presence requirements',
      'Specific rules vary based on date of birth and parents\' marital status'
    ],
    steps: [
      { step: 'Born in U.S.: obtain birth certificate', timeline: 'At birth' },
      { step: 'Born abroad: register birth at U.S. embassy/consulate', timeline: 'As soon as possible' },
      { step: 'Apply for Consular Report of Birth Abroad (CRBA)', timeline: '1-3 months' },
      { step: 'Apply for U.S. passport as proof of citizenship', timeline: '4-8 weeks' }
    ],
    documents: [
      'Birth certificate',
      'Parents\' proof of U.S. citizenship',
      'Parents\' marriage certificate (if applicable)',
      'Evidence of parent\'s physical presence in U.S.'
    ],
    forms: [
      { number: 'DS-2029', name: 'Application for Consular Report of Birth Abroad', fee: '$100' },
      { number: 'DS-11', name: 'Application for U.S. Passport', fee: '$165' }
    ],
    costs: [
      { item: 'CRBA Application', amount: '$100' },
      { item: 'Passport Application', amount: '$165' }
    ],
    commonMistakes: [
      'Not registering birth abroad promptly',
      'Not understanding physical presence requirements for parents',
      'Assuming automatic citizenship when parent doesn\'t meet requirements'
    ],
    afterApproval: [
      'Full U.S. citizenship from birth',
      'Apply for U.S. passport',
      'All rights and responsibilities of citizenship'
    ],
    relatedVisas: ['citizenship-parents', 'certificate-citizenship']
  },
  {
    id: 'citizenship-parents',
    name: 'Citizenship through Parents',
    shortName: 'Through Parents',
    type: 'citizenship',
    description: 'Deriving or acquiring U.S. citizenship through one or both parents who are/were U.S. citizens.',
    difficulty: 'Moderate',
    processingTime: '6-12 months',
    icon: 'Users',
    overview: 'U.S. citizenship can be acquired through parents in two ways: acquisition at birth (for those born abroad to U.S. citizen parents) and derivation (for children of naturalized citizens).\n\nDerivation under the Child Citizenship Act (CCA) of 2000: A child automatically becomes a citizen if at least one parent is a U.S. citizen, the child is under 18, the child is a lawful permanent resident, and the child is in the legal and physical custody of the citizen parent.\n\nFor those born abroad, the rules for acquiring citizenship through parents depend on the date of birth, whether parents were married, and the citizen parent\'s physical presence in the U.S. prior to the child\'s birth.',
    eligibility: [
      'Derivation: At least one parent is/became a U.S. citizen',
      'Derivation: Child is under 18 and an LPR',
      'Derivation: Child resides in the U.S. in custody of citizen parent',
      'Acquisition: Born abroad to at least one U.S. citizen parent',
      'Acquisition: Citizen parent met physical presence requirements before child\'s birth'
    ],
    steps: [
      { step: 'Determine if citizenship was derived or acquired', timeline: '1 week' },
      { step: 'Gather evidence of parent\'s citizenship and relationship', timeline: '2-4 weeks' },
      { step: 'File N-600 Application for Certificate of Citizenship', timeline: '1-2 weeks' },
      { step: 'Attend biometrics and interview (if required)', timeline: '3-8 months' },
      { step: 'Receive Certificate of Citizenship', timeline: '1-3 months after approval' }
    ],
    documents: [
      'N-600 application',
      'Birth certificate showing parent relationship',
      'Parent\'s citizenship evidence',
      'Parent\'s marriage certificate',
      'Green card (for derivation cases)',
      'Evidence of custody and residence (for derivation)',
      'Parent\'s physical presence evidence (for acquisition)'
    ],
    forms: [
      { number: 'N-600', name: 'Application for Certificate of Citizenship', fee: '$1,170' }
    ],
    costs: [
      { item: 'N-600 Filing Fee', amount: '$1,170' },
      { item: 'No fee if child is under 18 filing under CCA', amount: 'N/A' }
    ],
    commonMistakes: [
      'Not understanding the difference between derivation and acquisition',
      'Assuming citizenship when parent didn\'t meet physical presence requirements',
      'Not filing N-600 to document citizenship',
      'Aging out (turning 18) before conditions are met for derivation'
    ],
    afterApproval: [
      'Receive Certificate of Citizenship (N-560A)',
      'Can apply for U.S. passport',
      'Full citizenship rights'
    ],
    relatedVisas: ['citizenship-birth', 'certificate-citizenship', 'naturalization']
  },
  {
    id: 'certificate-citizenship',
    name: 'Certificate of Citizenship',
    shortName: 'Certificate',
    type: 'citizenship',
    description: 'Official document proving U.S. citizenship for those who derived or acquired citizenship through parents.',
    difficulty: 'Easy',
    processingTime: '6-12 months',
    icon: 'FileText',
    overview: 'A Certificate of Citizenship is an official USCIS document that serves as proof of U.S. citizenship for individuals who obtained citizenship through their parents (either at birth abroad or through derivation after birth).\n\nWhile a U.S. passport also serves as proof of citizenship, the Certificate of Citizenship is a permanent document that does not expire. It is obtained by filing Form N-600 with USCIS.\n\nThe Certificate of Citizenship is different from the Certificate of Naturalization (N-550), which is issued to those who become citizens through the naturalization process.',
    eligibility: [
      'Acquired U.S. citizenship through birth abroad to U.S. citizen parent(s)',
      'OR derived U.S. citizenship through parent\'s naturalization',
      'Need to document and prove citizenship status'
    ],
    steps: [
      { step: 'Gather evidence of citizenship through parents', timeline: '2-4 weeks' },
      { step: 'File Form N-600', timeline: '1 week' },
      { step: 'Attend biometrics appointment', timeline: '1-2 months' },
      { step: 'Attend interview (if required)', timeline: '4-10 months' },
      { step: 'Receive Certificate of Citizenship', timeline: '1-3 months' }
    ],
    documents: [
      'N-600 application',
      'Birth certificate',
      'Parent\'s citizenship evidence',
      'Parent\'s marriage certificate',
      'Evidence of legal and physical custody',
      'Passport-style photos'
    ],
    forms: [
      { number: 'N-600', name: 'Application for Certificate of Citizenship', fee: '$1,170' }
    ],
    costs: [
      { item: 'N-600 Filing Fee', amount: '$1,170' }
    ],
    commonMistakes: [
      'Not providing sufficient evidence of parent\'s citizenship',
      'Confusing N-600 with N-400 (naturalization)',
      'Not understanding which law applies based on date of birth'
    ],
    afterApproval: [
      'Receive Certificate of Citizenship',
      'Use as proof of citizenship for passports, employment, etc.',
      'Document does not expire'
    ],
    relatedVisas: ['citizenship-birth', 'citizenship-parents']
  },
  // ============ OTHER PROCESSES ============
  {
    id: 'daca',
    name: 'DACA (Deferred Action for Childhood Arrivals)',
    shortName: 'DACA',
    type: 'other',
    description: 'Deferred action and work authorization for individuals who were brought to the U.S. as children and meet specific requirements.',
    difficulty: 'Moderate',
    processingTime: '3-8 months',
    icon: 'Shield',
    overview: 'DACA is a policy that allows certain individuals who were brought to the United States as children to request deferred action from deportation and obtain work authorization. DACA was established by the Obama administration in 2012 through executive action.\n\nDACA does not provide lawful immigration status or a path to citizenship. It provides temporary protection from deportation and a renewable 2-year work permit. DACA recipients are often called "Dreamers."\n\nNote: DACA has faced significant legal challenges. As of the latest updates, USCIS is only accepting renewal applications, not initial applications, due to ongoing litigation. Check uscis.gov for the most current status.',
    eligibility: [
      'Were under 31 years old as of June 15, 2012',
      'Came to the U.S. before 16th birthday',
      'Continuously resided in the U.S. since June 15, 2007',
      'Were physically present in the U.S. on June 15, 2012, and at time of filing',
      'Had no lawful immigration status on June 15, 2012',
      'Currently in school, graduated, obtained GED, or honorably discharged veteran',
      'No felony convictions, significant misdemeanors, or 3+ misdemeanors'
    ],
    steps: [
      { step: 'Determine eligibility', timeline: '1 week' },
      { step: 'Gather evidence of continuous presence and education', timeline: '2-4 weeks' },
      { step: 'File I-821D, I-765, and I-765WS together', timeline: '1-2 weeks' },
      { step: 'Attend biometrics appointment', timeline: '1-2 months' },
      { step: 'USCIS processes application', timeline: '3-8 months' },
      { step: 'Receive EAD and deferred action grant', timeline: 'Upon approval' },
      { step: 'Renew every 2 years (file 120-150 days before expiration)', timeline: 'Every 2 years' }
    ],
    documents: [
      'Proof of identity (passport, birth certificate, school ID)',
      'Proof of U.S. entry before 16th birthday',
      'Proof of continuous residence since June 15, 2007',
      'Proof of presence on June 15, 2012',
      'Proof of education (transcripts, diploma, GED)',
      'Proof of no disqualifying criminal history'
    ],
    forms: [
      { number: 'I-821D', name: 'Consideration of Deferred Action for Childhood Arrivals', fee: '$0' },
      { number: 'I-765', name: 'Application for Employment Authorization', fee: '$410' },
      { number: 'I-765WS', name: 'Worksheet', fee: 'N/A' }
    ],
    costs: [
      { item: 'I-765 Filing Fee', amount: '$410' },
      { item: 'Biometrics Fee', amount: '$85' },
      { item: 'Total', amount: '$495' }
    ],
    commonMistakes: [
      'Not filing renewal on time (file 120-150 days before expiration)',
      'Failing to document continuous presence',
      'Criminal convictions that disqualify',
      'Traveling outside U.S. without advance parole',
      'Not understanding DACA does not provide a path to citizenship'
    ],
    afterApproval: [
      'Receive EAD (work permit) valid for 2 years',
      'Protected from deportation while DACA is active',
      'Can obtain a Social Security number',
      'Can get a driver\'s license',
      'Must renew every 2 years',
      'May apply for Advance Parole for limited travel'
    ],
    relatedVisas: ['tps', 'ead', 'advance-parole']
  },
  {
    id: 'tps',
    name: 'Temporary Protected Status (TPS)',
    shortName: 'TPS',
    type: 'other',
    description: 'Temporary protection from deportation and work authorization for nationals of designated countries experiencing armed conflict, natural disaster, or extraordinary conditions.',
    difficulty: 'Moderate',
    processingTime: '3-12 months',
    icon: 'Shield',
    overview: 'TPS is a temporary immigration status granted to eligible nationals of designated countries that are experiencing ongoing armed conflict, environmental disaster, or other extraordinary and temporary conditions. TPS provides protection from deportation and eligibility for work authorization.\n\nThe Secretary of Homeland Security designates countries for TPS. As of 2025, designated countries include El Salvador, Haiti, Honduras, Nepal, Nicaragua, Somalia, South Sudan, Sudan, Syria, Venezuela, Ukraine, Yemen, and others.\n\nTPS must be renewed by the government; when a country\'s designation expires or is terminated, TPS holders must either have another immigration status or face removal. TPS does not directly lead to a green card, but TPS holders may be eligible through other pathways.',
    eligibility: [
      'National of a TPS-designated country (or stateless person who last resided there)',
      'Continuously physically present in the U.S. since the most recent designation date',
      'Continuously resided in the U.S. since the date specified for your country',
      'Not convicted of a felony or 2+ misdemeanors',
      'Not subject to any bars to TPS',
      'File during the open registration or re-registration period'
    ],
    steps: [
      { step: 'Determine if your country is designated for TPS', timeline: '1 day' },
      { step: 'File I-821 (TPS) and I-765 (EAD) during registration period', timeline: '1-2 weeks' },
      { step: 'Attend biometrics appointment', timeline: '1-2 months' },
      { step: 'USCIS processes application', timeline: '3-12 months' },
      { step: 'Receive TPS approval and EAD', timeline: 'Upon approval' },
      { step: 'Re-register during each extension period', timeline: 'Every 6-18 months' }
    ],
    documents: [
      'Proof of nationality (passport, birth certificate)',
      'Proof of continuous residence in U.S.',
      'Proof of continuous physical presence',
      'Passport-style photos',
      'Identity documents',
      'Any prior immigration documents'
    ],
    forms: [
      { number: 'I-821', name: 'Application for Temporary Protected Status', fee: '$50' },
      { number: 'I-765', name: 'Application for Employment Authorization', fee: '$410' }
    ],
    costs: [
      { item: 'I-821 Filing Fee', amount: '$50' },
      { item: 'I-765 Filing Fee', amount: '$410' },
      { item: 'Biometrics Fee', amount: '$85' }
    ],
    commonMistakes: [
      'Missing the registration or re-registration period',
      'Not maintaining continuous presence in the U.S.',
      'Criminal convictions that bar eligibility',
      'Not re-registering during each extension period',
      'Assuming TPS automatically leads to permanent residence'
    ],
    afterApproval: [
      'Protected from deportation while TPS is active',
      'Receive EAD (work permit)',
      'Can obtain travel authorization',
      'Must re-register during each extension period',
      'Does not directly lead to green card',
      'May be eligible for adjustment of status through other pathways'
    ],
    relatedVisas: ['daca', 'ead', 'refugee-asylum']
  },
  {
    id: 'advance-parole',
    name: 'Advance Parole / Travel Documents',
    shortName: 'Advance Parole',
    type: 'other',
    description: 'Authorization to return to the U.S. after traveling abroad while certain immigration applications are pending.',
    difficulty: 'Easy',
    processingTime: '3-6 months',
    icon: 'Plane',
    overview: 'Advance Parole is a travel document that allows certain foreign nationals to return to the United States after traveling abroad without abandoning their pending applications for immigration benefits.\n\nAdvance Parole is commonly needed by those with pending I-485 (Adjustment of Status) applications. Traveling without Advance Parole while an AOS application is pending can result in abandonment of the application.\n\nNote: If you have a valid H-1B or L-1 visa, you generally do not need Advance Parole to travel. However, if you travel on Advance Parole, you may re-enter as a "parolee" rather than in your visa status.',
    eligibility: [
      'Have a pending I-485 (Adjustment of Status) application',
      'OR are a DACA recipient with qualifying reasons',
      'OR have other qualifying pending applications',
      'OR need humanitarian parole',
      'Generally filed concurrently with I-485 (included in fee)'
    ],
    steps: [
      { step: 'File I-131 (often concurrently with I-485)', timeline: 'With I-485 or separately' },
      { step: 'Attend biometrics appointment', timeline: '1-2 months' },
      { step: 'USCIS processes application', timeline: '3-6 months' },
      { step: 'Receive Advance Parole document', timeline: 'Upon approval' },
      { step: 'Travel and present AP document upon return', timeline: 'Valid for 1 year typically' }
    ],
    documents: [
      'Form I-131',
      'Copy of pending application receipt',
      'Passport-style photos',
      'Copy of passport',
      'Evidence of reason for travel (if applicable)'
    ],
    forms: [
      { number: 'I-131', name: 'Application for Travel Document', fee: 'Included with I-485 or $630' }
    ],
    costs: [
      { item: 'I-131 Filing Fee (if separate)', amount: '$630' },
      { item: 'Included with I-485', amount: '$0 additional' }
    ],
    commonMistakes: [
      'Traveling before receiving the AP document',
      'Letting AP document expire while abroad',
      'Not understanding that travel on AP may affect visa status',
      'Not carrying the AP document when traveling'
    ],
    afterApproval: [
      'Can travel abroad and return without abandoning pending applications',
      'Typically valid for 1 year (or until I-485 is decided)',
      'Must have document in hand before traveling',
      'Re-enter as a parolee'
    ],
    relatedVisas: ['ead', 'i131', 'consular-vs-aos']
  },
  {
    id: 'ead',
    name: 'Employment Authorization Document (EAD)',
    shortName: 'EAD',
    type: 'other',
    description: 'Work permit issued to foreign nationals in certain immigration statuses that authorize them to work in the United States.',
    difficulty: 'Easy',
    processingTime: '3-7 months',
    icon: 'Briefcase',
    overview: 'An Employment Authorization Document (EAD), commonly known as a work permit, is issued by USCIS to eligible foreign nationals who are authorized to work in the United States. The EAD is a card that proves the holder\'s work authorization to employers.\n\nMany immigration categories provide eligibility for an EAD, including: pending I-485 applicants, asylum applicants (after 180 days), TPS holders, DACA recipients, H-4 spouses (with approved I-140), L-2 spouses, and others.\n\nThe EAD is different from employment authorization tied to a specific employer (like H-1B). An EAD generally allows the holder to work for any employer in the U.S.',
    eligibility: [
      'Have an eligible immigration status or pending application',
      'Common categories: pending I-485, asylum applicants, TPS, DACA, H-4, L-2',
      'Filed or are filing a qualifying application',
      'Not subject to any bars to employment authorization'
    ],
    steps: [
      { step: 'Determine your EAD eligibility category', timeline: '1 day' },
      { step: 'File I-765 (often included with I-485)', timeline: '1 week' },
      { step: 'Attend biometrics appointment', timeline: '1-2 months' },
      { step: 'USCIS processes application', timeline: '3-7 months' },
      { step: 'Receive EAD card', timeline: 'Upon approval' }
    ],
    documents: [
      'Form I-765',
      'Copy of pending application receipt (if applicable)',
      'Passport-style photos',
      'Copy of passport or travel document',
      'Evidence of eligible status'
    ],
    forms: [
      { number: 'I-765', name: 'Application for Employment Authorization', fee: '$410 or included with I-485' }
    ],
    costs: [
      { item: 'I-765 Filing Fee', amount: '$410' },
      { item: 'Included with I-485', amount: '$0 additional' }
    ],
    commonMistakes: [
      'Working before receiving the EAD',
      'Not renewing before expiration (file 180 days before)',
      'Not selecting the correct eligibility category on I-765',
      'Gaps in work authorization due to processing delays'
    ],
    afterApproval: [
      'Can work for any employer in the U.S.',
      'Valid for 1-2 years typically',
      'Must renew before expiration',
      'Auto-extension for up to 540 days for timely-filed renewals',
      'Use with I-9 employment verification'
    ],
    relatedVisas: ['advance-parole', 'daca', 'tps']
  },
  {
    id: 'i131',
    name: 'I-131 Travel Document',
    shortName: 'I-131',
    type: 'other',
    description: 'Application for reentry permit, refugee travel document, or advance parole for various immigration categories.',
    difficulty: 'Easy',
    processingTime: '3-8 months',
    icon: 'Plane',
    overview: 'Form I-131 is used to apply for several types of travel documents. The most common are: Advance Parole (for pending AOS applicants), Reentry Permit (for green card holders planning extended travel abroad), and Refugee Travel Document (for refugees and asylees).\n\nA Reentry Permit is important for green card holders who plan to be outside the U.S. for more than 1 year. Without it, their green card may be considered abandoned. The permit is valid for 2 years.\n\nA Refugee Travel Document allows refugees and asylees to travel abroad and return. It looks like a passport and is valid for 1 year.',
    eligibility: [
      'Advance Parole: pending AOS application',
      'Reentry Permit: lawful permanent resident planning extended travel',
      'Refugee Travel Document: refugee or asylee needing to travel',
      'Must be physically present in U.S. when filing (for most types)'
    ],
    steps: [
      { step: 'Determine which travel document type you need', timeline: '1 day' },
      { step: 'File I-131 with USCIS', timeline: '1 week' },
      { step: 'Attend biometrics appointment', timeline: '1-2 months' },
      { step: 'USCIS processes application', timeline: '3-8 months' },
      { step: 'Receive travel document', timeline: 'Upon approval' }
    ],
    documents: [
      'Form I-131',
      'Passport-style photos',
      'Copy of green card or immigration documents',
      'Evidence of travel need',
      'Copy of passport (if available)'
    ],
    forms: [
      { number: 'I-131', name: 'Application for Travel Document', fee: '$630' }
    ],
    costs: [
      { item: 'I-131 Filing Fee', amount: '$630' },
      { item: 'Biometrics Fee', amount: 'Included' }
    ],
    commonMistakes: [
      'Not filing before departing the U.S.',
      'Green card holders: staying abroad too long even with reentry permit',
      'Refugees: traveling to the country of persecution (may affect status)',
      'Not carrying the document while traveling'
    ],
    afterApproval: [
      'Reentry Permit: valid for 2 years',
      'Refugee Travel Document: valid for 1 year',
      'Advance Parole: valid until AOS decided or 1 year',
      'Must present document upon return to U.S.'
    ],
    relatedVisas: ['advance-parole', 'ead']
  },
  {
    id: 'i751',
    name: 'Removal of Conditions (I-751)',
    shortName: 'I-751',
    type: 'other',
    description: 'Petition to remove the conditions on a 2-year conditional green card obtained through marriage less than 2 years old.',
    difficulty: 'Moderate',
    processingTime: '12-24 months',
    icon: 'FileText',
    overview: 'When a person obtains a green card through marriage that was less than 2 years old at the time of approval, they receive a conditional (2-year) green card. To become a permanent resident, they must file Form I-751 to remove the conditions.\n\nThe I-751 must be filed jointly by both spouses within the 90-day window before the conditional green card expires. If the couple has divorced, the conditional resident can request a waiver of the joint filing requirement.\n\nWaivers are also available in cases of domestic abuse, extreme hardship, and when the marriage was entered in good faith but the spouse died.',
    eligibility: [
      'Have a conditional green card obtained through marriage',
      'File within 90 days before the green card expires',
      'Joint filing: still married to the petitioning spouse',
      'Waiver: divorced, subject to abuse, or spouse deceased'
    ],
    steps: [
      { step: 'Gather evidence of bona fide marriage', timeline: '2-4 weeks' },
      { step: 'File I-751 within 90-day window before expiration', timeline: 'Within window' },
      { step: 'Receive receipt notice (extends green card for 24 months)', timeline: '2-4 weeks' },
      { step: 'USCIS processes petition', timeline: '12-24 months' },
      { step: 'Attend interview (if required)', timeline: 'If scheduled' },
      { step: 'Receive 10-year green card', timeline: 'Upon approval' }
    ],
    documents: [
      'Form I-751',
      'Copy of conditional green card',
      'Evidence of bona fide marriage:',
      '- Joint tax returns',
      '- Joint bank account statements',
      '- Joint lease or mortgage',
      '- Birth certificates of children together',
      '- Photos together over the 2-year period',
      '- Affidavits from friends and family',
      '- Joint insurance policies',
      'If waiver: evidence of divorce, abuse, or death'
    ],
    forms: [
      { number: 'I-751', name: 'Petition to Remove Conditions on Residence', fee: '$760' }
    ],
    costs: [
      { item: 'I-751 Filing Fee', amount: '$760' },
      { item: 'Biometrics Fee', amount: '$85' },
      { item: 'Attorney fees (if needed)', amount: '$1,500-$3,000' }
    ],
    commonMistakes: [
      'Missing the 90-day filing window',
      'Not filing and letting conditional green card expire',
      'Insufficient evidence of bona fide marriage',
      'Not knowing about waiver options after divorce',
      'Not understanding that receipt notice extends status'
    ],
    afterApproval: [
      'Receive permanent 10-year green card',
      'No longer conditional',
      'Can renew with I-90 when it expires',
      'Eligible for naturalization (may apply concurrently)'
    ],
    relatedVisas: ['marriage-green-card', 'naturalization']
  },
  {
    id: 'consular-vs-aos',
    name: 'Consular Processing vs Adjustment of Status',
    shortName: 'CP vs AOS',
    type: 'other',
    description: 'Comparison of the two pathways to obtaining a green card: processing at a U.S. consulate abroad or adjusting status within the U.S.',
    difficulty: 'Moderate',
    processingTime: 'AOS: 8-24 months | CP: 6-14 months',
    icon: 'Scale',
    overview: 'There are two ways to obtain a green card after an immigrant petition is approved: Adjustment of Status (AOS) and Consular Processing (CP).\n\nAdjustment of Status (Form I-485) allows eligible individuals already in the U.S. to apply for a green card without leaving the country. Benefits include the ability to file for EAD and Advance Parole concurrently, and staying in the U.S. during processing.\n\nConsular Processing requires the applicant to attend an interview at a U.S. embassy or consulate abroad. It may be faster in some cases and is required for those not eligible to adjust status in the U.S. (e.g., those who entered without inspection).\n\nThe choice between AOS and CP depends on the individual\'s immigration status, physical location, and personal circumstances.',
    eligibility: [
      'AOS: Must be physically present in U.S., have lawful entry (generally), and eligible status',
      'AOS: I-94 must be valid or qualify for an exception',
      'CP: Can be outside the U.S. or choose to process abroad',
      'CP: Required if not eligible to adjust status',
      'Both: must have an approved or concurrently filed immigrant petition'
    ],
    steps: [
      { step: 'Determine eligibility for AOS vs CP', timeline: '1 week' },
      { step: 'AOS: File I-485 with supporting documents', timeline: '2-4 weeks to prepare' },
      { step: 'CP: Wait for NVC processing and submit DS-260', timeline: '2-6 months' },
      { step: 'AOS: Attend biometrics, wait for interview', timeline: '8-24 months total' },
      { step: 'CP: Attend consular interview abroad', timeline: '6-14 months total' },
      { step: 'Receive green card or immigrant visa', timeline: 'Upon approval' }
    ],
    documents: [
      'AOS: I-485, I-864, I-693 medical, photos, supporting evidence',
      'CP: DS-260, civil documents, police clearances, medical exam',
      'Both: immigrant petition approval (I-130, I-140, etc.)',
      'Both: passport, birth certificate, financial documents'
    ],
    forms: [
      { number: 'I-485', name: 'Adjustment of Status', fee: '$1,440' },
      { number: 'DS-260', name: 'Immigrant Visa Application (consular)', fee: '$325' },
      { number: 'I-864', name: 'Affidavit of Support', fee: 'N/A' }
    ],
    costs: [
      { item: 'AOS: I-485 Fee', amount: '$1,440' },
      { item: 'CP: IV Processing Fee', amount: '$325' },
      { item: 'CP: USCIS Immigrant Fee', amount: '$220' },
      { item: 'Medical exam', amount: '$200-$500' }
    ],
    commonMistakes: [
      'Choosing CP when eligible for AOS (may lose ability to stay in U.S.)',
      'Not knowing about the 3/10 year bars for unlawful presence',
      'AOS: traveling without advance parole',
      'Not understanding that entry without inspection may bar AOS'
    ],
    afterApproval: [
      'AOS: green card mailed to U.S. address',
      'CP: receive immigrant visa, enter U.S. as permanent resident',
      'Both pathways result in permanent resident status',
      'Green card is mailed after entry (CP) or after approval (AOS)'
    ],
    relatedVisas: ['family-based', 'marriage-green-card', 'advance-parole']
  },
  {
    id: 'deportation-defense',
    name: 'Deportation Defense / Cancellation of Removal',
    shortName: 'Deportation Defense',
    type: 'other',
    description: 'Legal options for individuals in removal proceedings, including cancellation of removal, asylum, voluntary departure, and other forms of relief.',
    difficulty: 'Complex',
    processingTime: '1-4 years',
    icon: 'Gavel',
    overview: 'When the government initiates removal (deportation) proceedings, the individual receives a Notice to Appear (NTA) in immigration court. There are several forms of relief available depending on the person\'s circumstances.\n\nCancellation of Removal for permanent residents requires 5 years of continuous residence and 7 years of continuous physical presence after admission. For non-permanent residents, it requires 10 years of continuous physical presence, good moral character, and showing that removal would cause "exceptional and extremely unusual hardship" to a qualifying U.S. citizen or LPR relative.\n\nOther forms of relief include: asylum/withholding of removal, Convention Against Torture (CAT) protection, voluntary departure, prosecutorial discretion, and various waivers.',
    eligibility: [
      'In removal proceedings before an immigration judge',
      'Cancellation (LPRs): 5 years residence, 7 years presence after admission',
      'Cancellation (non-LPRs): 10 years presence, good moral character, exceptional hardship',
      'Asylum/withholding: fear of persecution',
      'Voluntary departure: good moral character, ability to pay departure costs',
      'Must not have certain aggravated felony convictions'
    ],
    steps: [
      { step: 'Receive Notice to Appear (NTA)', timeline: 'Day 0' },
      { step: 'Attend master calendar hearing', timeline: '1-6 months' },
      { step: 'File applications for relief', timeline: 'Per court deadlines' },
      { step: 'Prepare evidence and witness testimony', timeline: '2-6 months' },
      { step: 'Attend merits/individual hearing', timeline: '6-36 months' },
      { step: 'Receive judge\'s decision', timeline: 'At hearing or within weeks' },
      { step: 'Appeal to BIA if denied (optional)', timeline: '30 days to appeal' }
    ],
    documents: [
      'Notice to Appear',
      'Evidence of continuous presence/residence',
      'Evidence of good moral character',
      'Evidence of hardship to qualifying relatives',
      'Country conditions evidence (for asylum)',
      'Character references and support letters',
      'Tax returns, employment records',
      'Medical/psychological evaluations',
      'Birth certificates of U.S. citizen children'
    ],
    forms: [
      { number: 'EOIR-42A', name: 'Cancellation of Removal (LPRs)', fee: 'N/A (court filing)' },
      { number: 'EOIR-42B', name: 'Cancellation of Removal (Non-LPRs)', fee: 'N/A (court filing)' },
      { number: 'I-589', name: 'Asylum/Withholding (if applicable)', fee: 'No fee' }
    ],
    costs: [
      { item: 'Immigration court fees', amount: 'Minimal' },
      { item: 'Attorney fees', amount: '$5,000-$20,000' },
      { item: 'Expert witness fees', amount: '$1,000-$5,000' },
      { item: 'Document translation/preparation', amount: '$500-$2,000' }
    ],
    commonMistakes: [
      'Not attending court hearings (results in in absentia deportation order)',
      'Not hiring an attorney for removal proceedings',
      'Missing filing deadlines set by the judge',
      'Not preserving evidence of continuous presence',
      'Not understanding all available forms of relief',
      'Not appealing an adverse decision within 30 days'
    ],
    afterApproval: [
      'Cancellation for non-LPRs: receive green card',
      'Cancellation for LPRs: retain permanent resident status',
      'Asylum: receive asylee status and work authorization',
      'Voluntary departure: leave without deportation order on record',
      'Can appeal to Board of Immigration Appeals (BIA) if denied'
    ],
    relatedVisas: ['refugee-asylum', 'tps', 'daca']
  }
];

export function getCategoryById(id) {
  return categories.find(c => c.id === id);
}

export function getCategoriesByType(type) {
  return categories.filter(c => c.type === type);
}

export const categoryTypes = [
  { key: 'nonimmigrant', label: 'Nonimmigrant Visas', labelEs: 'Visas de No Inmigrante' },
  { key: 'immigrant', label: 'Immigrant Visas / Green Card', labelEs: 'Visas de Inmigrante / Green Card' },
  { key: 'citizenship', label: 'Citizenship & Naturalization', labelEs: 'Ciudadanía y Naturalización' },
  { key: 'other', label: 'Other Processes', labelEs: 'Otros Procesos' },
];
