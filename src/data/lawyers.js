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
export const lawyerListings = [];

export const legalAidNationwide = [
  {
    name: 'ImmigrationLawHelp.org',
    url: 'https://www.immigrationlawhelp.org',
    descEn: 'Search 1,000+ free/low-cost immigration legal service providers in all 50 states.',
    descEs: 'Busca más de 1,000 proveedores de servicios legales de inmigración gratuitos o de bajo costo en los 50 estados.',
  },
  {
    name: 'Immigration Advocates Network',
    url: 'https://www.immigrationadvocates.org/legaldirectory/',
    descEn: 'National directory of nonprofit immigration legal services by state, county, or detention facility.',
    descEs: 'Directorio nacional de servicios legales de inmigración sin fines de lucro por estado, condado o centro de detención.',
  },
  {
    name: 'CLINIC Legal Directory',
    url: 'https://cliniclegal.org',
    descEn: 'Catholic Legal Immigration Network — directory of nonprofit immigration legal services.',
    descEs: 'Red Católica Legal de Inmigración — directorio de servicios legales sin fines de lucro.',
  },
  {
    name: 'AILA Lawyer Search',
    url: 'https://www.aila.org/find-an-attorney',
    descEn: 'Find immigration attorneys who are members of the American Immigration Lawyers Association.',
    descEs: 'Encuentra abogados de inmigración miembros de AILA.',
  },
  {
    name: 'DOJ List of Pro Bono Providers',
    url: 'https://www.justice.gov/eoir/list-pro-bono-legal-service-providers',
    descEn: 'Official U.S. Department of Justice list of free legal service providers for immigration courts.',
    descEs: 'Lista oficial del Departamento de Justicia de proveedores de servicios legales gratuitos.',
  },
  {
    name: 'LawHelp.org',
    url: 'https://www.lawhelp.org',
    descEn: 'Find free legal aid by state for immigration, housing, employment, and more.',
    descEs: 'Encuentra asistencia legal gratuita por estado para inmigración, vivienda, empleo y más.',
  },
  {
    name: 'HIAS',
    url: 'https://www.hias.org',
    descEn: 'Legal representation and resettlement services for refugees and asylum seekers.',
    descEs: 'Representación legal y servicios de reasentamiento para refugiados y solicitantes de asilo.',
  },
  {
    name: 'National Immigration Law Center (NILC)',
    url: 'https://www.nilc.org',
    descEn: 'Advances rights and opportunities of low-income immigrants.',
    descEs: 'Defiende los derechos y oportunidades de inmigrantes de bajos ingresos.',
  },
  {
    name: 'American Bar Association',
    url: 'https://www.americanbar.org/groups/legal_aid/',
    descEn: "Free legal help through the ABA's referral and pro bono programs.",
    descEs: 'Ayuda legal gratuita a través de los programas de referencia y pro bono de la ABA.',
  },
];

export const legalAidByState = [
  {
    state: 'Arizona',
    stateEs: 'Arizona',
    organizations: [
      {
        name: 'Florence Immigrant & Refugees Rights Project',
        url: 'https://firrp.org',
        descEn: 'Free legal services for detained immigrants and asylum seekers in Arizona.',
        descEs: 'Servicios legales gratuitos para inmigrantes detenidos y solicitantes de asilo en Arizona.',
      },
      {
        name: 'AZCEND',
        url: 'https://www.azcend.org',
        descEn: 'Community-based legal and social services for immigrant families in Arizona.',
        descEs: 'Servicios legales y sociales comunitarios para familias inmigrantes en Arizona.',
      },
    ],
  },
  {
    state: 'California',
    stateEs: 'California',
    organizations: [
      {
        name: 'Asian Law Caucus (San Francisco)',
        url: 'https://www.asianlawcaucus.org',
        descEn: 'Civil rights and immigration legal services focused on AAPI communities.',
        descEs: 'Servicios legales de derechos civiles e inmigración enfocados en comunidades AAPI.',
      },
      {
        name: 'CHIRLA (Los Angeles)',
        url: 'https://www.chirla.org',
        descEn: 'Coalition for Humane Immigrant Rights — citizenship, DACA, and family petitions.',
        descEs: 'Coalición por los Derechos Humanos de los Inmigrantes — ciudadanía, DACA y peticiones familiares.',
      },
      {
        name: 'Central American Resource Center (Los Angeles)',
        url: 'https://www.carecen-la.org',
        descEn: 'Legal aid, education, and advocacy for Central American immigrants.',
        descEs: 'Asistencia legal, educación y defensa para inmigrantes centroamericanos.',
      },
      {
        name: 'Bay Area Legal Aid',
        url: 'https://baylegal.org',
        descEn: 'Free civil legal services across the SF Bay Area, including immigration matters.',
        descEs: 'Servicios legales civiles gratuitos en el Área de la Bahía, incluyendo asuntos de inmigración.',
      },
      {
        name: 'Al Otro Lado (San Diego/Tijuana)',
        url: 'https://alotrolado.org',
        descEn: 'Cross-border legal services for asylum seekers and deportees.',
        descEs: 'Servicios legales transfronterizos para solicitantes de asilo y deportados.',
      },
    ],
  },
  {
    state: 'Colorado',
    stateEs: 'Colorado',
    organizations: [
      {
        name: 'Rocky Mountain Immigrant Advocacy Network',
        url: 'https://www.rmian.org',
        descEn: 'Free legal services for detained immigrants and children in Colorado and Wyoming.',
        descEs: 'Servicios legales gratuitos para inmigrantes detenidos y niños en Colorado y Wyoming.',
      },
    ],
  },
  {
    state: 'Florida',
    stateEs: 'Florida',
    organizations: [
      {
        name: 'Americans for Immigrant Justice (Miami)',
        url: 'https://aijustice.org',
        descEn: 'Pro bono representation in asylum, deportation defense, and family cases.',
        descEs: 'Representación pro bono en casos de asilo, defensa contra deportación y familia.',
      },
      {
        name: 'Catholic Charities Legal Services (Miami)',
        url: 'https://cclsmiami.org',
        descEn: 'Affordable immigration legal help across South Florida.',
        descEs: 'Ayuda legal de inmigración asequible en el sur de Florida.',
      },
      {
        name: 'Florida Immigrant Coalition',
        url: 'https://floridaimmigrant.org',
        descEn: 'Statewide coalition organizing for immigrant rights and providing referrals.',
        descEs: 'Coalición estatal que organiza por los derechos de los inmigrantes y ofrece referencias.',
      },
    ],
  },
  {
    state: 'Georgia',
    stateEs: 'Georgia',
    organizations: [
      {
        name: 'Latin American Association (Atlanta)',
        url: 'https://thelaa.org',
        descEn: 'Legal services, citizenship support, and family advocacy for Georgia immigrants.',
        descEs: 'Servicios legales, apoyo en ciudadanía y defensa familiar para inmigrantes en Georgia.',
      },
      {
        name: 'Georgia Asylum & Immigration Network',
        url: 'https://georgiaasylum.org',
        descEn: 'Free legal representation for asylum seekers and detained immigrants.',
        descEs: 'Representación legal gratuita para solicitantes de asilo e inmigrantes detenidos.',
      },
    ],
  },
  {
    state: 'Illinois',
    stateEs: 'Illinois',
    organizations: [
      {
        name: 'National Immigrant Justice Center (Chicago)',
        url: 'https://immigrantjustice.org',
        descEn: 'Direct legal services and policy advocacy for low-income immigrants.',
        descEs: 'Servicios legales directos y defensa de políticas para inmigrantes de bajos ingresos.',
      },
      {
        name: 'Legal Aid Chicago',
        url: 'https://www.legalaidchicago.org',
        descEn: 'Free civil legal aid including immigration matters in the Chicago area.',
        descEs: 'Asistencia legal civil gratuita incluyendo asuntos de inmigración en el área de Chicago.',
      },
    ],
  },
  {
    state: 'Maryland/DC',
    stateEs: 'Maryland/DC',
    organizations: [
      {
        name: 'CASA (Maryland/DC/Virginia)',
        url: 'https://wearecasa.org',
        descEn: 'Immigration legal services, workforce development, and family support.',
        descEs: 'Servicios legales de inmigración, desarrollo laboral y apoyo familiar.',
      },
      {
        name: "Capital Area Immigrants' Rights Coalition",
        url: 'https://caircoalition.org',
        descEn: 'Pro bono representation for detained immigrants in the DC region.',
        descEs: 'Representación pro bono para inmigrantes detenidos en la región de DC.',
      },
    ],
  },
  {
    state: 'Massachusetts',
    stateEs: 'Massachusetts',
    organizations: [
      {
        name: 'Political Asylum/Immigration Representation Project (PAIR)',
        url: 'https://www.pairproject.org',
        descEn: 'Free legal services for asylum seekers in Massachusetts.',
        descEs: 'Servicios legales gratuitos para solicitantes de asilo en Massachusetts.',
      },
      {
        name: 'Greater Boston Legal Services',
        url: 'https://www.gbls.org',
        descEn: 'Civil legal aid including immigration help for low-income residents.',
        descEs: 'Asistencia legal civil incluyendo ayuda de inmigración para residentes de bajos ingresos.',
      },
    ],
  },
  {
    state: 'Minnesota',
    stateEs: 'Minnesota',
    organizations: [
      {
        name: 'The Advocates for Human Rights',
        url: 'https://www.theadvocatesforhumanrights.org',
        descEn: 'Pro bono legal services for refugees, asylum seekers, and torture survivors.',
        descEs: 'Servicios legales pro bono para refugiados, solicitantes de asilo y sobrevivientes de tortura.',
      },
    ],
  },
  {
    state: 'New Jersey',
    stateEs: 'Nueva Jersey',
    organizations: [
      {
        name: 'American Friends Service Committee',
        url: 'https://www.afsc.org',
        descEn: 'Immigrant rights advocacy and detention support nationwide.',
        descEs: 'Defensa de derechos de inmigrantes y apoyo a detenidos a nivel nacional.',
      },
      {
        name: 'Make the Road New Jersey',
        url: 'https://maketheroadnj.org',
        descEn: 'Legal services, organizing, and advocacy for working-class immigrants.',
        descEs: 'Servicios legales, organización y defensa para inmigrantes de la clase trabajadora.',
      },
    ],
  },
  {
    state: 'New York',
    stateEs: 'Nueva York',
    organizations: [
      {
        name: 'Legal Aid Society',
        url: 'https://www.legalaidnyc.org',
        descEn: 'Free civil legal services in NYC including immigration cases.',
        descEs: 'Servicios legales civiles gratuitos en NYC incluyendo casos de inmigración.',
      },
      {
        name: 'Catholic Charities NYC',
        url: 'https://catholiccharitiesny.org',
        descEn: 'Immigration legal services, naturalization, and family-based petitions.',
        descEs: 'Servicios legales de inmigración, naturalización y peticiones familiares.',
      },
      {
        name: 'Safe Horizon',
        url: 'https://www.safehorizon.org',
        descEn: 'Legal services for survivors of crime, including U-visa and VAWA cases.',
        descEs: 'Servicios legales para sobrevivientes de delitos, incluyendo casos U-visa y VAWA.',
      },
      {
        name: 'New York Immigration Coalition',
        url: 'https://www.nyic.org',
        descEn: 'Statewide coalition advocating for immigrant communities.',
        descEs: 'Coalición estatal que aboga por las comunidades inmigrantes.',
      },
      {
        name: 'The Door',
        url: 'https://door.org',
        descEn: 'Legal and social services for immigrant youth in NYC.',
        descEs: 'Servicios legales y sociales para jóvenes inmigrantes en NYC.',
      },
      {
        name: 'Make the Road New York',
        url: 'https://maketheroadny.org',
        descEn: 'Legal aid, organizing, and education for working-class immigrants.',
        descEs: 'Asistencia legal, organización y educación para inmigrantes de la clase trabajadora.',
      },
    ],
  },
  {
    state: 'North Carolina',
    stateEs: 'Carolina del Norte',
    organizations: [
      {
        name: 'RAICES (national, with strong NC presence)',
        url: 'https://www.raicestexas.org',
        descEn: 'National nonprofit providing low-cost immigration legal services.',
        descEs: 'Organización nacional sin fines de lucro que ofrece servicios legales de inmigración a bajo costo.',
      },
      {
        name: 'Legal Aid of North Carolina',
        url: 'https://www.legalaidnc.org',
        descEn: 'Free civil legal services including immigration help across NC.',
        descEs: 'Servicios legales civiles gratuitos incluyendo ayuda de inmigración en Carolina del Norte.',
      },
    ],
  },
  {
    state: 'Texas',
    stateEs: 'Texas',
    organizations: [
      {
        name: 'RAICES',
        url: 'https://www.raicestexas.org',
        descEn: 'Refugee and Immigrant Center for Education and Legal Services in Texas and beyond.',
        descEs: 'Centro de Educación y Servicios Legales para Refugiados e Inmigrantes en Texas y más.',
      },
      {
        name: 'Catholic Charities Dallas',
        url: 'https://www.ccdallas.org',
        descEn: 'Affordable immigration legal services in North Texas.',
        descEs: 'Servicios legales de inmigración asequibles en el norte de Texas.',
      },
      {
        name: 'Las Americas Immigrant Advocacy Center',
        url: 'https://las-americas.org',
        descEn: 'Free legal services for detained immigrants and asylum seekers in El Paso.',
        descEs: 'Servicios legales gratuitos para inmigrantes detenidos y solicitantes de asilo en El Paso.',
      },
      {
        name: 'South Texas Immigration Council',
        url: 'https://www.southtexasimmigrationcouncil.org',
        descEn: 'Low-cost immigration legal help across the Rio Grande Valley.',
        descEs: 'Ayuda legal de inmigración a bajo costo en el Valle del Río Grande.',
      },
    ],
  },
  {
    state: 'Utah',
    stateEs: 'Utah',
    organizations: [
      {
        name: 'Immigration Legal Services (Catholic Community Services)',
        url: 'https://www.ccsutah.org',
        descEn: 'Affordable immigration legal aid throughout Utah.',
        descEs: 'Asistencia legal de inmigración asequible en todo Utah.',
      },
      {
        name: 'Utah Immigration Assistance Center',
        url: '',
        descEn: 'Local immigration help for naturalization and family petitions.',
        descEs: 'Ayuda local de inmigración para naturalización y peticiones familiares.',
      },
    ],
  },
  {
    state: 'Virginia',
    stateEs: 'Virginia',
    organizations: [
      {
        name: 'Legal Aid Justice Center',
        url: 'https://www.justice4all.org',
        descEn: 'Free legal services for low-income Virginians, including immigration cases.',
        descEs: 'Servicios legales gratuitos para residentes de bajos ingresos en Virginia, incluyendo casos de inmigración.',
      },
      {
        name: 'CASA (Virginia/Maryland/DC)',
        url: 'https://wearecasa.org',
        descEn: 'Immigration legal services and community advocacy.',
        descEs: 'Servicios legales de inmigración y defensa comunitaria.',
      },
    ],
  },
  {
    state: 'Washington',
    stateEs: 'Washington',
    organizations: [
      {
        name: 'Northwest Immigrant Rights Project',
        url: 'https://www.nwirp.org',
        descEn: 'Direct legal services and advocacy for immigrants in the Pacific Northwest.',
        descEs: 'Servicios legales directos y defensa para inmigrantes en el Noroeste del Pacífico.',
      },
    ],
  },
];
