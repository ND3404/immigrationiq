import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const translations = {
  en: {
    // Nav
    home: 'Home',
    categories: 'Categories',
    chat: 'AI Chat',
    timeline: 'Timeline',
    checklist: 'Checklist',
    lawyers: 'Find Lawyers',
    processingTimes: 'Processing Times',
    news: 'News',
    glossary: 'Glossary',
    faq: 'FAQ',
    feeCalculator: 'Fee Calculator',

    // Fee Calculator
    feeCalculatorTitle: 'Visa Fee Calculator',
    feeCalculatorSubtitle: 'Estimate the total cost of your immigration application. Select a form type and configure options to see an itemized breakdown.',

    // Home page
    heroTitle: 'Navigate U.S. Immigration with Confidence',
    heroSubtitle: 'AI-powered guidance for visas, green cards, citizenship, and more. Get clear answers to your immigration questions.',
    searchPlaceholder: 'Search visa types, processes, or questions...',
    howItWorks: 'How It Works',
    step1Title: 'Choose Your Path',
    step1Desc: 'Browse visa categories or describe your situation to find the right immigration option for you.',
    step2Title: 'Get AI Guidance',
    step2Desc: 'Ask our AI assistant any immigration question and receive detailed, accurate answers instantly.',
    step3Title: 'Take Action',
    step3Desc: 'Follow step-by-step checklists, track timelines, and connect with qualified immigration lawyers.',
    recentNews: 'Recent Immigration News',
    quickAccess: 'Quick Access',
    visaBulletin: 'Visa Bulletin',
    visaBulletinTitle: 'Visa Bulletin',
    visaBulletinDesc: 'The Visa Bulletin is published monthly by the U.S. Department of State. It shows which immigrant visa applicants can move forward with their cases based on their priority date and preference category.',
    visaBulletinPriorityDate: 'What is a Priority Date?',
    visaBulletinPriorityDateDesc: 'Your Priority Date is the date your immigration petition was filed (or, for some categories, the date your labor certification was filed). The Visa Bulletin shows "Final Action Dates" and "Dates for Filing" — if your priority date is earlier than the date listed for your category and country, you may be eligible to proceed. If the bulletin shows "C" (Current), no waiting is required for that category.',
    visaBulletinCta: 'View Official Visa Bulletin',

    // Common
    learnMore: 'Learn More',
    askAI: 'Ask AI',
    viewAll: 'View All',
    search: 'Search',
    filter: 'Filter',
    download: 'Download',
    print: 'Print',
    export: 'Export',
    copyMessage: 'Copy',
    startChat: 'Start Chat',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    getStarted: 'Get Started',
    disclaimer: 'This tool provides general information only and is not legal advice. Consult a qualified immigration attorney for your specific situation.',

    // Chat
    chatTitle: 'Immigration AI Assistant',
    chatSubtitle: 'Ask any question about U.S. immigration processes, visas, or requirements.',
    chatPlaceholder: 'Type your immigration question...',
    chatSuggestion1: 'What are the requirements for an H-1B visa?',
    chatSuggestion2: 'How do I apply for a green card through marriage?',
    chatSuggestion3: 'What is the difference between B-1 and B-2 visas?',
    typing: 'Typing...',
    exportChat: 'Export Chat',

    // Category
    overview: 'Overview',
    eligibility: 'Eligibility',
    process: 'Process',
    documents: 'Documents',
    forms: 'Forms',
    costs: 'Costs',
    mistakes: 'Common Mistakes',
    afterApproval: 'After Approval',
    relatedVisas: 'Related Visas',
    difficultyEasy: 'Easy',
    difficultyModerate: 'Moderate',
    difficultyComplex: 'Complex',

    // Footer
    about: 'About',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact Us',
    copyright: '© 2026 ImmigrationIQ. All rights reserved.',
  },

  es: {
    // Nav
    home: 'Inicio',
    categories: 'Categorías',
    chat: 'Chat IA',
    timeline: 'Cronograma',
    checklist: 'Lista de Verificación',
    lawyers: 'Buscar Abogados',
    processingTimes: 'Tiempos de Procesamiento',
    news: 'Noticias',
    glossary: 'Glosario',
    faq: 'Preguntas Frecuentes',
    feeCalculator: 'Calculadora de Tarifas',

    // Fee Calculator
    feeCalculatorTitle: 'Calculadora de Tarifas de Visa',
    feeCalculatorSubtitle: 'Estima el costo total de tu solicitud de inmigración. Selecciona un tipo de formulario y configura opciones para ver un desglose detallado.',

    // Home page
    heroTitle: 'Navega la Inmigración a EE.UU. con Confianza',
    heroSubtitle: 'Orientación impulsada por IA para visas, tarjetas de residencia, ciudadanía y más. Obtén respuestas claras a tus preguntas de inmigración.',
    searchPlaceholder: 'Buscar tipos de visa, procesos o preguntas...',
    howItWorks: 'Cómo Funciona',
    step1Title: 'Elige Tu Camino',
    step1Desc: 'Explora las categorías de visa o describe tu situación para encontrar la opción de inmigración adecuada para ti.',
    step2Title: 'Obtén Orientación con IA',
    step2Desc: 'Haz cualquier pregunta de inmigración a nuestro asistente de IA y recibe respuestas detalladas y precisas al instante.',
    step3Title: 'Toma Acción',
    step3Desc: 'Sigue listas de verificación paso a paso, rastrea cronogramas y conéctate con abogados de inmigración calificados.',
    recentNews: 'Noticias Recientes de Inmigración',
    quickAccess: 'Acceso Rápido',
    visaBulletin: 'Boletín de Visas',
    visaBulletinTitle: 'Boletín de Visas',
    visaBulletinDesc: 'El Boletín de Visas es publicado mensualmente por el Departamento de Estado de EE.UU. Muestra qué solicitantes de visa de inmigrante pueden avanzar con sus casos según su fecha de prioridad y categoría de preferencia.',
    visaBulletinPriorityDate: '¿Qué es una Fecha de Prioridad?',
    visaBulletinPriorityDateDesc: 'Tu Fecha de Prioridad es la fecha en que se presentó tu petición de inmigración (o, para algunas categorías, la fecha en que se presentó tu certificación laboral). El Boletín de Visas muestra "Fechas de Acción Final" y "Fechas para Presentar" — si tu fecha de prioridad es anterior a la fecha indicada para tu categoría y país, puedes ser elegible para proceder. Si el boletín muestra "C" (Corriente), no se requiere espera para esa categoría.',
    visaBulletinCta: 'Ver Boletín de Visas Oficial',

    // Common
    learnMore: 'Más Información',
    askAI: 'Preguntar a IA',
    viewAll: 'Ver Todo',
    search: 'Buscar',
    filter: 'Filtrar',
    download: 'Descargar',
    print: 'Imprimir',
    export: 'Exportar',
    copyMessage: 'Copiar',
    startChat: 'Iniciar Chat',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    getStarted: 'Comenzar',
    disclaimer: 'Esta herramienta proporciona solo información general y no constituye asesoría legal. Consulta a un abogado de inmigración calificado para tu situación específica.',

    // Chat
    chatTitle: 'Asistente de Inmigración IA',
    chatSubtitle: 'Haz cualquier pregunta sobre procesos de inmigración, visas o requisitos en EE.UU.',
    chatPlaceholder: 'Escribe tu pregunta de inmigración...',
    chatSuggestion1: '¿Cuáles son los requisitos para una visa H-1B?',
    chatSuggestion2: '¿Cómo solicito una tarjeta de residencia por matrimonio?',
    chatSuggestion3: '¿Cuál es la diferencia entre las visas B-1 y B-2?',
    typing: 'Escribiendo...',
    exportChat: 'Exportar Chat',

    // Category
    overview: 'Descripción General',
    eligibility: 'Elegibilidad',
    process: 'Proceso',
    documents: 'Documentos',
    forms: 'Formularios',
    costs: 'Costos',
    mistakes: 'Errores Comunes',
    afterApproval: 'Después de la Aprobación',
    relatedVisas: 'Visas Relacionadas',
    difficultyEasy: 'Fácil',
    difficultyModerate: 'Moderado',
    difficultyComplex: 'Complejo',

    // Footer
    about: 'Acerca de',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    contact: 'Contáctanos',
    copyright: '© 2026 ImmigrationIQ. Todos los derechos reservados.',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('immigrationiq-language') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('immigrationiq-language', lang);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const t = useCallback(
    (key) => {
      const value = translations[language]?.[key];
      if (value !== undefined) return value;
      // Fallback to English
      return translations.en?.[key] ?? key;
    },
    [language]
  );

  const value = React.useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
