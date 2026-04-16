export const identity = {
  name: 'Luis Alberto Duarte Cortés',
  title: 'Automation Engineer · I find where operations break and build the fix',
  location: 'Bogotá · Remote · C1 English',
  cvUrl: 'https://drive.google.com/file/d/1P2uIt4PFxqIJooIKnxUeu2Sdu2LaHIrn/view?usp=drive_link',
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

export const skills = [
  'n8n', 'Python', 'FastAPI', 'REST APIs', 'Webhooks',
  'Make', 'Zapier', 'Postman', 'Linux', 'QA',
  'Regression Testing', 'Bug Triage', 'Jira', 'Technical Writing',
]

export const thesis =
  '★ Meritorious Thesis · Open Source Hearing-Impaired Accessibility Tool · B.Sc Systems Engineering · Adopted by SENA & Universidad ECCI · 2024'

export const experience = [
  {
    company: 'Self-Employed',
    role: 'Freelance Systems Engineer',
    period: 'Bogotá · Apr 2024 – Present',
    description:
      'Designing and deploying automation workflows integrating REST APIs, webhooks, and Python scripts to reduce operational overhead. Maintaining the open-source voice-recognition accessibility tool adopted by SENA Regional Amazonas and Universidad ECCI. Speaker at cybersecurity and network security conferences (2023).',
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
  {
    company: 'Spooky House',
    role: 'IT Support Technician',
    period: 'Bogotá · 2014 – 2018',
    description:
      'Provided on-call hardware and software support — diagnosing and repairing computers, POS systems, and peripherals. Handled preventive and corrective maintenance, reducing equipment downtime. Advised on equipment procurement and supported the store\'s transition to digital content and social media operations.',
    tags: ['IT Support', 'Hardware', 'POS Systems', 'Networking'],
  },
]

export const projects = [
  {
    name: 'Urban Disruption Intelligence',
    tagline: 'Real-time infrastructure disruption intelligence for Colombian cities',
    description:
      'A WhatsApp-first system sitting between Colombia\'s public utility providers (water, electricity, gas) and citizens — delivering faster, more reliable disruption status than any official channel through community-validated restoration tracking.',
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
