import type {
  BISStandard,
  Conversation,
  MockAnswer,
  SuggestionQuestion,
  SourceRef,
} from '@/types';

const BIS_URL = 'https://www.bis.gov.in/';

export const mockStandards: BISStandard[] = [
  {
    id: 'is-16152',
    number: 'IS 16152:2012',
    title: 'Self-Ballasted LED Lamps for General Lighting Services',
    category: 'Electrical',
    scope:
      'Covers the safety and performance requirements for self-ballasted LED lamps intended for general lighting applications, including domestic and similar use.',
    overview:
      'This standard establishes the essential safety, interchangeability and performance characteristics for self-ballasted LED lamps used in general lighting services. It addresses electrical, thermal and photometric parameters to help ensure consistent product quality.',
    keyInformation: [
      'Electrical safety and insulation requirements',
      'Luminous flux and efficacy performance',
      'Endurance and lumen maintenance testing',
      'Marking and packaging specifications',
    ],
    source: 'Bureau of Indian Standards',
    sourceUrl: BIS_URL,
  },
  {
    id: 'is-10322',
    number: 'IS 10322:2022',
    title: 'Household Pressure Cookers — Specification',
    category: 'Household',
    scope:
      'Specifies the requirements for materials, construction, performance and safety of household pressure cookers intended for domestic cooking.',
    overview:
      'This standard defines the material, design and performance requirements for household pressure cookers. It addresses pressure-bearing safety, gasket performance, and the reliability of safety devices used during normal domestic cooking.',
    keyInformation: [
      'Material requirements for body and lid',
      'Working pressure and safety valve performance',
      'Gasket durability and sealing integrity',
      'Handle strength and locking mechanism tests',
    ],
    source: 'Bureau of Indian Standards',
    sourceUrl: BIS_URL,
  },
  {
    id: 'is-9473',
    number: 'IS 9473:2019',
    title: 'Conformity Assessment — BIS Certification Scheme',
    category: 'Consumer Products',
    scope:
      'Outlines the framework for conformity assessment and the grant of a licence to use the BIS Standard Mark under the applicable certification scheme.',
    overview:
      'This standard describes the conformity assessment framework that supports the BIS certification process. It covers application, factory inspection, product testing, surveillance and the conditions under which a licence to apply the Standard Mark may be granted or withdrawn.',
    keyInformation: [
      'Application and documentation requirements',
      'Factory inspection and in-process control',
      'Product sampling and laboratory testing',
      'Surveillance and licence renewal',
    ],
    source: 'Bureau of Indian Standards',
    sourceUrl: BIS_URL,
  },
  {
    id: 'is-6926',
    number: 'IS 6926:2021',
    title: 'Stainless Steel Plates, Sheets and Strips — Specification',
    category: 'Household',
    scope:
      'Covers the requirements for stainless steel plates, sheets and strips supplied for general and household applications.',
    overview:
      'This standard specifies the chemical composition, mechanical properties and dimensional tolerances for stainless steel plates, sheets and strips. It supports material selection for household and general applications where corrosion resistance is important.',
    keyInformation: [
      'Chemical composition by grade',
      'Mechanical properties and hardness',
      'Surface finish and dimensional tolerances',
      'Marking and identification',
    ],
    source: 'Bureau of Indian Standards',
    sourceUrl: BIS_URL,
  },
  {
    id: 'is-302',
    number: 'IS 302-2-6:2020',
    title: 'Safety of Household Electrical Appliances — Cooking Ranges',
    category: 'Electrical',
    scope:
      'Specifies the safety requirements for electric cooking ranges, ovens and similar appliances intended for household use.',
    overview:
      'This standard addresses the safety of household electric cooking ranges and ovens. It covers protection against electrical, mechanical and thermal hazards encountered during normal household use.',
    keyInformation: [
      'Protection against electric shock',
      'Heating element and temperature control',
      'Mechanical stability and surface temperatures',
      'Marking and user instructions',
    ],
    source: 'Bureau of Indian Standards',
    sourceUrl: BIS_URL,
  },
  {
    id: 'is-2080',
    number: 'IS 2080:2022',
    title: 'Domestic Food Mixers and Grinders — Safety Requirements',
    category: 'Consumer Products',
    scope:
      'Covers the safety and performance requirements for domestic electric food mixers, grinders and blenders used in household kitchens.',
    overview:
      'This standard specifies the safety and performance requirements for domestic food mixers and grinders. It addresses electrical safety, mechanical guarding, and operational performance for household kitchen use.',
    keyInformation: [
      'Electrical safety and earthing',
      'Mechanical guarding of moving parts',
      'Motor performance and endurance',
      'Cleaning and accessibility of parts',
    ],
    source: 'Bureau of Indian Standards',
    sourceUrl: BIS_URL,
  },
];

const src = (id: string): SourceRef => {
  const s = mockStandards.find((m) => m.id === id)!;
  return {
    standardId: s.id,
    number: s.number,
    title: s.title,
    scope: s.scope,
    category: s.category,
    source: s.source,
    sourceUrl: s.sourceUrl,
  };
};

export const mockAnswers: MockAnswer[] = [
  {
    keywords: ['led', 'bulb', 'lamp', 'light'],
    content:
      "Based on the information available in the current SAATHI knowledge base, the relevant standard for self-ballasted LED lamps is IS 16152:2012. This standard covers the safety and performance requirements for self-ballasted LED lamps intended for general lighting services, including domestic use. It addresses electrical safety, luminous flux and efficacy, endurance and lumen maintenance, and marking requirements.",
    sources: [src('is-16152')],
  },
  {
    keywords: ['cover', 'covers', 'what does', 'scope', 'about this standard'],
    content:
      "The standard covers the basic requirements and characteristics applicable to the product category represented in this prototype. It addresses the essential safety, performance and marking parameters that help ensure consistent product quality for the intended application.",
    sources: [src('is-16152')],
  },
  {
    keywords: ['pressure cooker', 'cooker'],
    content:
      "For household pressure cookers, the applicable standard is IS 10322:2022. It specifies the requirements for materials, construction, performance and safety of household pressure cookers. Key aspects include material requirements for the body and lid, working pressure and safety valve performance, gasket durability, and handle strength.",
    sources: [src('is-10322')],
  },
  {
    keywords: ['bis certification', 'certification', 'conformity', 'licence', 'license', 'standard mark'],
    content:
      "BIS certification is administered under a conformity assessment framework described in IS 9473:2019. The process involves an application, a factory inspection to verify in-process control, product sampling and laboratory testing, and ongoing surveillance. A licence to apply the BIS Standard Mark may be granted when the applicable requirements are met, and is maintained through periodic surveillance.",
    sources: [src('is-9473')],
  },
  {
    keywords: ['stainless steel', 'steel'],
    content:
      "The relevant standard for stainless steel plates, sheets and strips is IS 6926:2021. It specifies the chemical composition by grade, mechanical properties, surface finish and dimensional tolerances, and supports material selection for household and general applications where corrosion resistance matters.",
    sources: [src('is-6926')],
  },
  {
    keywords: ['cooking range', 'oven', 'electric appliance', 'household electrical'],
    content:
      "For electric cooking ranges and ovens, the applicable standard is IS 302-2-6:2020. It specifies the safety requirements for household electric cooking ranges, covering protection against electric shock, heating element and temperature control, mechanical stability, and surface temperatures.",
    sources: [src('is-302')],
  },
  {
    keywords: ['mixer', 'grinder', 'blender', 'food'],
    content:
      "Domestic food mixers and grinders are covered by IS 2080:2022. The standard specifies safety and performance requirements including electrical safety and earthing, mechanical guarding of moving parts, motor performance and endurance, and the accessibility of parts for cleaning.",
    sources: [src('is-2080')],
  },
];

export const fallbackAnswer: MockAnswer = {
  keywords: [],
  content:
    "I couldn't find enough information in the current SAATHI knowledge base to answer that reliably. The prototype knowledge base currently contains a limited set of standards, so try asking about one of the available topics — such as LED bulbs, pressure cookers, or BIS certification.",
  sources: [],
  declined: true,
};

export const suggestions: SuggestionQuestion[] = [
  { id: 's1', text: 'What standard applies to LED bulbs?' },
  { id: 's2', text: 'What does this standard cover?' },
  { id: 's3', text: 'What are the requirements for pressure cookers?' },
  { id: 's4', text: 'Tell me about BIS certification.' },
];

export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    title: 'LED bulb standards',
    group: 'Today',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'What standard applies to LED bulbs?',
      },
      {
        id: 'm2',
        role: 'assistant',
        content:
          "Based on the information available in the current SAATHI knowledge base, the relevant standard for self-ballasted LED lamps is IS 16152:2012. This standard covers the safety and performance requirements for self-ballasted LED lamps intended for general lighting services, including domestic use.",
        sources: [src('is-16152')],
      },
      {
        id: 'm3',
        role: 'user',
        content: 'What does this standard cover?',
      },
      {
        id: 'm4',
        role: 'assistant',
        content:
          "The standard covers the safety and performance requirements for self-ballasted LED lamps. It addresses electrical safety, luminous flux and efficacy, endurance and lumen maintenance, and marking requirements for the product category.",
        sources: [src('is-16152')],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Pressure cooker requirements',
    group: 'Today',
    messages: [
      {
        id: 'm5',
        role: 'user',
        content: 'What are the requirements for pressure cookers?',
      },
      {
        id: 'm6',
        role: 'assistant',
        content:
          "For household pressure cookers, the applicable standard is IS 10322:2022. It specifies the requirements for materials, construction, performance and safety. Key aspects include material requirements for the body and lid, working pressure and safety valve performance, gasket durability, and handle strength.",
        sources: [src('is-10322')],
      },
    ],
  },
  {
    id: 'c3',
    title: 'BIS certification',
    group: 'Yesterday',
    messages: [
      {
        id: 'm7',
        role: 'user',
        content: 'Tell me about BIS certification.',
      },
      {
        id: 'm8',
        role: 'assistant',
        content:
          "BIS certification is administered under a conformity assessment framework described in IS 9473:2019. The process involves an application, a factory inspection to verify in-process control, product sampling and laboratory testing, and ongoing surveillance. A licence to apply the BIS Standard Mark may be granted when the applicable requirements are met.",
        sources: [src('is-9473')],
      },
    ],
  },
  {
    id: 'c4',
    title: 'Stainless steel standards',
    group: 'Yesterday',
    messages: [
      {
        id: 'm9',
        role: 'user',
        content: 'Which standard covers stainless steel sheets?',
      },
      {
        id: 'm10',
        role: 'assistant',
        content:
          "The relevant standard for stainless steel plates, sheets and strips is IS 6926:2021. It specifies the chemical composition by grade, mechanical properties, surface finish and dimensional tolerances for household and general applications.",
        sources: [src('is-6926')],
      },
    ],
  },
  {
    id: 'c5',
    title: 'Understanding Indian Standards',
    group: 'Older',
    messages: [
      {
        id: 'm11',
        role: 'user',
        content: 'How are Indian Standards structured?',
      },
      {
        id: 'm12',
        role: 'assistant',
        content:
          "Indian Standards published by the Bureau of Indian Standards are generally structured to specify requirements, test methods and conformity assessment provisions for a defined product or process. In this prototype, each standard record includes a scope, overview and key information to help you understand its purpose.",
        sources: [],
      },
    ],
  },
];
