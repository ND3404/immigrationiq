export const lawyerResources = [
  { name: 'AILA Lawyer Search', url: 'https://www.ailalawyer.com/', description: 'Search for immigration attorneys who are members of the American Immigration Lawyers Association.' },
  { name: 'CLINIC Legal Directory', url: 'https://www.cliniclegal.org/', description: 'Catholic Legal Immigration Network — directory of nonprofit immigration legal services providers.' },
  { name: 'PAIR Project', url: 'https://www.pairproject.org/', description: 'Political Asylum/Immigration Representation Project providing pro bono legal services.' },
  { name: 'Immigration Advocates Network', url: 'https://www.immigrationadvocates.org/nonprofit/legaldirectory/', description: 'Directory of free and low-cost immigration legal services organized by state.' },
  { name: 'American Bar Association', url: 'https://www.americanbar.org/groups/legal_services/flh-home/', description: 'Find free legal help through the ABA\'s referral program.' },
  { name: 'LawHelp.org', url: 'https://www.lawhelp.org/', description: 'Find free legal aid programs in your state for immigration and other legal issues.' },
  { name: 'DOJ Accredited Representatives', url: 'https://www.justice.gov/eoir/recognized-organizations-and-accredited-representatives-roster-state-and-city', description: 'Search for DOJ-recognized organizations and accredited representatives authorized to practice immigration law.' },
  { name: 'USCIS Find Legal Services', url: 'https://www.uscis.gov/avoid-scams/find-legal-services', description: 'USCIS official page for finding legitimate legal services and avoiding scams.' },
];

export const lawyerTips = {
  whatToLookFor: [
    'Active membership in AILA (American Immigration Lawyers Association)',
    'Licensed to practice law in at least one U.S. state',
    'Specific experience with your type of immigration case',
    'Transparent fee structure with written agreement',
    'Good standing with your state bar association',
    'Positive reviews and references from past clients',
    'Willingness to provide a free or low-cost initial consultation',
  ],
  questionsToAsk: [
    'How many cases like mine have you handled?',
    'What is the likely timeline for my case?',
    'What are the total fees and what do they include?',
    'Who will actually work on my case (attorney or paralegal)?',
    'What is your communication policy? How often will I get updates?',
    'What are the potential risks or complications in my case?',
    'Have you ever been disciplined by a state bar?',
    'What happens if my case is denied? Is there an appeal strategy?',
  ],
  redFlags: [
    'Guarantees a specific outcome ("I promise you\'ll get approved")',
    'Pressures you to sign immediately or pay in full upfront',
    'Cannot provide their bar license number or state of licensure',
    'Uses the title "notario público" instead of attorney',
    'Asks you to sign blank forms',
    'Has no physical office or refuses to meet in person',
    'Avoids putting the fee agreement in writing',
    'Has complaints with the state bar or DOJ',
  ],
  notarioWarning: 'In many Latin American countries, a "notario público" is a powerful legal professional. In the United States, a notary public has NO authority to provide legal advice or represent you in immigration matters. Only licensed attorneys and DOJ-accredited representatives can legally provide immigration services. Many people have lost thousands of dollars and jeopardized their cases by using notarios. This is immigration fraud and should be reported to your state attorney general.',
};

// Practice area keys — labels translated via t('practiceAreaXxx')
export const practiceAreaKeys = ['family', 'employment', 'asylum', 'deportation', 'citizenship'];

// Featured listings sort first. Replace with real lawyer data as paid listings come in.
export const lawyerListings = [
  {
    id: 'rodriguez-la',
    name: 'Maria Rodriguez',
    firm: 'Rodriguez Immigration Law',
    city: 'Los Angeles',
    state: 'CA',
    languages: ['English', 'Spanish'],
    practiceAreas: ['family', 'citizenship'],
    phone: '(213) 555-0142',
    website: 'https://example.com/rodriguez-immigration',
    consultationUrl: 'https://example.com/rodriguez-immigration/schedule',
    featured: true,
  },
  {
    id: 'chen-ny',
    name: 'David Chen',
    firm: 'Chen Immigration Partners',
    city: 'New York',
    state: 'NY',
    languages: ['English', 'Mandarin', 'Cantonese'],
    practiceAreas: ['employment', 'asylum'],
    phone: '(212) 555-0188',
    website: 'https://example.com/chen-partners',
    consultationUrl: 'https://example.com/chen-partners/consult',
    featured: true,
  },
  {
    id: 'patel-houston',
    name: 'Sarah Patel',
    firm: 'Patel Law Group',
    city: 'Houston',
    state: 'TX',
    languages: ['English', 'Hindi', 'Spanish'],
    practiceAreas: ['family', 'deportation'],
    phone: '(713) 555-0167',
    website: 'https://example.com/patel-law',
    consultationUrl: 'https://example.com/patel-law/book',
    featured: false,
  },
  {
    id: 'williams-miami',
    name: 'James Williams',
    firm: 'Williams Immigration Defense',
    city: 'Miami',
    state: 'FL',
    languages: ['English', 'Spanish', 'Portuguese'],
    practiceAreas: ['asylum', 'deportation', 'citizenship'],
    phone: '(305) 555-0123',
    website: 'https://example.com/williams-defense',
    consultationUrl: 'https://example.com/williams-defense/schedule',
    featured: false,
  },
];

export const legalAidByState = [
  { state: 'California', organizations: ['Asian Law Caucus (San Francisco)', 'CHIRLA (Los Angeles)', 'Central American Resource Center (Los Angeles)', 'Bay Area Legal Aid'] },
  { state: 'New York', organizations: ['Legal Aid Society', 'Catholic Charities NYC', 'Safe Horizon', 'New York Immigration Coalition', 'The Door'] },
  { state: 'Texas', organizations: ['RAICES', 'Catholic Charities Dallas', 'Las Americas Immigrant Advocacy Center', 'Houston Immigration Legal Services'] },
  { state: 'Florida', organizations: ['Americans for Immigrant Justice', 'Catholic Legal Services Archdiocese of Miami', 'Florida Immigrant Coalition'] },
  { state: 'Illinois', organizations: ['National Immigrant Justice Center', 'Legal Aid Chicago', 'Heartland Alliance'] },
  { state: 'Massachusetts', organizations: ['Political Asylum/Immigration Representation Project', 'Greater Boston Legal Services', 'Irish International Immigrant Center'] },
  { state: 'Washington', organizations: ['Northwest Immigrant Rights Project', 'American Immigration Lawyers Association WA'] },
  { state: 'Nationwide', organizations: ['ACLU Immigrants\' Rights Project', 'National Immigration Law Center (NILC)', 'Immigration Equality (LGBTQ+)', 'Kids in Need of Defense (KIND)'] },
];
