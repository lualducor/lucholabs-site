export const identity = {
  name: 'Luis Alberto Duarte Cortés',
  title: 'I build AI-powered systems and automation infrastructure',
  subtitle: 'Bogotá · Remote · C1 English',
  cvUrl: '/CV/lucholabs.pdf',
  photo: '/photo.jpg',
}

export const stats = [
  {
    label: 'English C1',
    sub: 'IELTS Academic 7.0 · British Council',
    subColor: 'rgba(34,197,94,0.6)',
    category: 'Language',
  },
  {
    label: 'Remote Ready',
    sub: 'US & LATAM Timezones · Full Time',
    subColor: 'rgba(255,255,255,0.4)',
    category: 'Availability',
    pulse: true,
  },
]

export const currentlyBuilding = ['Boveda', 'Anti-Phishing Shield', 'Automation Workflows', '3D Tools']

export const bentExperience = [
  { company: 'Funktronic Labs', role: 'QA Tester', period: 'Remote · 2024' },
  { company: 'Magis SAS', role: 'Tech Support Analyst', period: 'Bogotá · 2023' },
]

export const skills = {
  core: ['Python', 'FastAPI', 'n8n', 'REST APIs', 'Linux'],
  tooling: ['PostgreSQL', 'SQLAlchemy', 'Webhooks', 'Postman', 'Make'],
}

export const thesis = {
  title: 'Meritorious Thesis',
  subtitle: 'Open-Source Live Captioning System for Hearing-Impaired Students',
  institution: 'Universidad ECCI — B.Sc. Systems Engineering',
  status: 'Live · In Use · 2024–Present',
  adoptedBy: ['SENA Regional Amazonas', 'Universidad ECCI'],
  stack: ['Node.js', 'Mozilla DeepSpeech', 'NGINX', 'Custom Dictionary Engine'],
  impact:
    "Built during final semester after a hearing-impaired classmate had no way to follow lectures in real time. The system generates live subtitles from the teacher's voice directly to the student's screen and stores a full transcript for later review. Adopted by two Colombian academic institutions. Zero licensing cost. Deployable by any institution on open source software alone.",
  repoUrl: undefined as string | undefined,
}

export type TalkStatus = 'past' | 'upcoming'

export interface Talk {
  status: TalkStatus
  event: string
  location: string
  date: string
  topic: string
  photo?: string
}

export const speaking: Talk[] = [
  {
    status: 'past',
    event: 'Cybersecurity Forum',
    location: 'Bogotá',
    date: '2025',
    topic: 'Egresado panelist on network security and infrastructure.',
    photo: '/speaking.jpg',
  },
  {
    status: 'upcoming',
    event: 'AI & Cybersecurity Forum',
    location: 'Bogotá',
    date: 'May 2026',
    topic: 'Cybersecurity in the Golden Era of AI: agent models, emerging threats, and prompt injection attacks.',
  },
]

export const experience = [
  {
    company: 'Self-Employed',
    role: 'Freelance Automation Engineer',
    period: 'Bogotá · Apr 2024 – Present',
    description:
      'Designing and deploying automation workflows integrating REST APIs, webhooks, and Python scripts to reduce operational overhead. Maintaining the open-source voice-recognition accessibility tool adopted by SENA Regional Amazonas and Universidad ECCI. Speaker at cybersecurity and network security conferences.',
    tags: ['Automation', 'n8n', 'Python', 'APIs', 'Open Source', 'Accessibility'],
  },
  {
    company: 'Funktronic Labs',
    role: 'QA Tester (Contract)',
    period: 'Remote · Jan 2024 – Dec 2024',
    description:
      'Executed manual regression and sanity testing across software builds for a US-based game development studio. Documented structured bug reports with reproduction steps, severity ratings, and expected vs actual behavior. Served as bridge between engineering and end-user experience, retesting patches to confirm resolution.',
    tags: ['QA', 'Regression Testing', 'Bug Tracking', 'Remote', 'Technical Docs'],
  },
  {
    company: 'Magis SAS',
    role: 'Technical Support Analyst',
    period: 'Bogotá · Jun 2023 – Dec 2023',
    description:
      'Delivered Tier 2 application support for internal systems across Windows and Linux environments, ensuring uptime and operational continuity. Escalated complex incidents with thorough technical documentation. Configured and secured firewalls and network infrastructure; supported a key procurement bid by ensuring infrastructure was spec-ready on deadline.',
    tags: ['Technical Support', 'Windows', 'Linux', 'Networking', 'Incident Management'],
  },
]

export interface Project {
  name: string
  tagline: string
  description: string
  stack: string[]
  status: string
  statusColor: string
  repoUrl?: string
  demoUrl?: string
}

export const projects: Project[] = [
  {
    name: 'Product Review Classifier',
    tagline: 'LLM-powered review classification pipeline built on n8n and Groq',
    description:
      'Automated product review classification system built as an AI Automation Engineering capstone. Uses n8n as the workflow orchestrator with Groq API (llama-3.1-8b-instant) for LLM inference — classifying incoming reviews by sentiment and category without manual intervention.',
    stack: ['n8n', 'Groq API', 'Python', 'LLM'],
    status: 'Shipped',
    statusColor: 'rgba(99,102,241,0.7)',
    repoUrl: undefined,
    demoUrl: undefined,
  },
  {
    name: 'Urban Disruption Intelligence',
    tagline: 'Real-time infrastructure disruption intelligence for Colombian cities',
    description:
      "A WhatsApp-first system sitting between Colombia's public utility providers (water, electricity, gas) and citizens — delivering faster, more reliable disruption status than any official channel through community-validated restoration tracking.",
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'PostGIS', 'WhatsApp API', 'OpenStreetMap', 'Leaflet'],
    status: 'In Progress',
    statusColor: 'rgba(34,197,94,0.7)',
  },
  {
    name: 'Boveda',
    tagline: 'Personal finance dashboard for Colombian bank accounts',
    description:
      'A local-first fintech experiment exploring structured financial data, rule-based automation, and programmable workflows built on top of Colombian bank statement exports.',
    stack: ['Python', 'FastAPI', 'SQLite', 'SQLAlchemy', 'React'],
    status: 'In Progress',
    statusColor: 'rgba(34,197,94,0.7)',
  },
  {
    name: 'Anti-Phishing Shield',
    tagline: 'Open source email phishing protection for elderly users',
    description:
      'An open source tool designed to help third-age users identify and avoid email phishing attacks. Analyzes suspicious emails and provides plain-language warnings tailored for non-technical users.',
    stack: ['Python', 'Open Source', 'Email Analysis', 'Accessibility'],
    status: 'Prototype',
    statusColor: 'rgba(148,163,184,0.7)',
  },
  {
    name: 'AI 3D Print Optimizer',
    tagline: 'AI-assisted slicing parameter recommendations',
    description:
      'Developer tooling experiment exploring how AI models can analyze STL files and recommend slicing parameters to improve 3D print quality and reliability.',
    stack: ['Python', 'AI APIs', 'STL Analysis', 'CLI'],
    status: 'Prototype',
    statusColor: 'rgba(148,163,184,0.7)',
  },
]

export const contact = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/luis-alberto-duarte-97748171/?skipRedirect=true' },
  { label: 'GitHub', href: 'https://github.com/lualducor' },
  { label: 'Email', href: 'mailto:lualducor@gmail.com' },
]

export const contactMeta = {
  availability: 'Open to remote roles',
  cta: 'Available for project-based contracts and async collaboration.',
  calUrl: undefined as string | undefined,
}

export interface Certificate {
  title: string
  issuer: string
  date: string
  topics: string[]
  credentialUrl?: string
}

export const certificates: Certificate[] = [
  {
    title: 'AI Automation Engineering',
    issuer: 'Coderhouse',
    date: '2025',
    topics: ['Python', 'FastAPI', 'n8n', 'LLM Integrations', 'Groq API'],
  },
]
