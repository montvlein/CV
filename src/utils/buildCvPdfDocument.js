import { formatExperienceDateRange } from './formatDate';
import { groupExperiencesByRole } from './groupExperiencesByRole';

const LABELS = {
  es: {
    contact: 'CONTACTO',
    skills: 'HABILIDADES',
    programmingLanguages: 'Lenguajes de programación',
    frameworksAndLibraries: 'Frameworks y librerías',
    toolsAndTechnologies: 'Herramientas y tecnologías',
    softSkills: 'Habilidades blandas',
    languages: 'Idiomas',
    aboutMe: 'SOBRE MÍ',
    experience: 'EXPERIENCIA LABORAL',
    projects: 'PROYECTOS',
    certifications: 'CERTIFICACIONES',
    phone: 'Teléfono',
    location: 'Ubicación',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    liveDemo: 'Demo en vivo',
  },
  en: {
    contact: 'CONTACT',
    skills: 'SKILLS',
    programmingLanguages: 'Programming Languages',
    frameworksAndLibraries: 'Frameworks & Libraries',
    toolsAndTechnologies: 'Tools & Technologies',
    softSkills: 'Soft Skills',
    languages: 'Languages',
    aboutMe: 'ABOUT ME',
    experience: 'WORK EXPERIENCE',
    projects: 'PROJECTS',
    certifications: 'CERTIFICATIONS',
    phone: 'Phone',
    location: 'Location',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    liveDemo: 'Live Demo',
  },
};

function sectionTitle(text) {
  return { text, style: 'sectionTitle', margin: [0, 10, 0, 4] };
}

function formatCertDate(date, language) {
  return new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
  });
}

function buildContactSection(contact, labels) {
  const links = [
    { text: labels.linkedin, link: contact.linkedin, style: 'link', margin: [0, 0, 0, 4] },
    { text: labels.github, link: contact.github, style: 'link', margin: [0, 0, 0, 4] },
  ];

  return [
    sectionTitle(labels.contact),
    { text: `${labels.phone}: ${contact.phone}`, style: 'body' },
    { text: `${labels.location}: ${contact.location}`, style: 'body' },
    { text: `${labels.email}: ${contact.email}`, style: 'body' },
    ...links,
  ];
}

function buildSkillsSection(skills, language, labels) {
  const categories = [
    { title: labels.programmingLanguages, items: skills.programmingLanguages },
    { title: labels.frameworksAndLibraries, items: skills.frameworksAndLibraries },
    { title: labels.toolsAndTechnologies, items: skills.toolsAndTechnologies },
    { title: labels.softSkills, items: skills.softSkills[language] },
    { title: labels.languages, items: skills.languages },
  ];

  return [
    sectionTitle(labels.skills),
    ...categories.flatMap(({ title, items }) => [
      { text: title, style: 'subSectionTitle', margin: [0, 4, 0, 2] },
      { text: items.join(', '), style: 'body', margin: [0, 0, 0, 4] },
    ]),
  ];
}

function buildCertificationsSection(certifications, language, labels) {
  return [
    sectionTitle(labels.certifications),
    ...certifications.flatMap((cert) => [
      {
        text: cert.title[language],
        link: cert.link,
        style: 'link',
        margin: [0, 0, 0, 1],
      },
      { text: cert.issuer, style: 'body' },
      {
        text: formatCertDate(cert.date, language),
        style: 'bodySmall',
        margin: [0, 0, 0, 8],
      },
    ]),
  ];
}

function buildExperienceSection(experiences, language, labels) {
  const groupedExperiences = groupExperiencesByRole(experiences, language);

  return [
    sectionTitle(labels.experience),
    ...groupedExperiences.flatMap((group) => [
      { text: group.role, style: 'role', margin: [0, 0, 0, 4] },
      ...group.entries.flatMap((experience) => [
        {
          text: [
            experience.companyLink
              ? { text: experience.company, link: experience.companyLink, style: 'link' }
              : { text: experience.company, style: 'bodySmall' },
            {
              text: ` | ${formatExperienceDateRange(experience.startDate, experience.endDate, language)}`,
              style: 'bodySmall',
            },
          ],
          margin: [0, 0, 0, 2],
        },
        {
          ul: experience.description[language],
          style: 'body',
          margin: [0, 0, 0, 10],
        },
      ]),
    ]),
  ];
}

function buildProjectsSection(projects, language, labels) {
  const visibleProjects = projects.filter((project) => project.show);

  if (visibleProjects.length === 0) {
    return [];
  }

  return [
    sectionTitle(labels.projects),
    ...visibleProjects.flatMap((project) => {
      const links = [
        { text: labels.github, link: project.link, style: 'link' },
      ];

      if (project.deployment) {
        links.push({ text: `  |  ${labels.liveDemo}`, link: project.deployment, style: 'link' });
      }

      return [
        { text: project.title[language], style: 'role', margin: [0, 0, 0, 2] },
        { text: project.description[language], style: 'body', margin: [0, 0, 0, 2] },
        {
          text: project.technologies.join(' · '),
          style: 'bodySmall',
          margin: [0, 0, 0, 2],
        },
        { text: links, margin: [0, 0, 0, 10] },
      ];
    }),
  ];
}

export function buildCvPdfDocument(data, language) {
  const labels = LABELS[language];
  const { personalInfo, skills, experience, projects, certifications } = data;

  const leftColumn = [
    ...buildContactSection(personalInfo.contact, labels),
    ...buildSkillsSection(skills, language, labels),
    ...buildCertificationsSection(certifications, language, labels),
  ];

  const rightColumn = [
    sectionTitle(labels.aboutMe),
    {
      text: personalInfo.summary[language],
      style: 'body',
      margin: [0, 0, 0, 4],
    },
    ...buildExperienceSection(experience, language, labels),
    ...buildProjectsSection(projects, language, labels),
  ];

  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 9,
    },
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        margin: [0, 0, 0, 6],
      },
      sectionTitle: {
        fontSize: 11,
        bold: true,
      },
      subSectionTitle: {
        fontSize: 9,
        bold: true,
        color: '#374151',
      },
      role: {
        fontSize: 10,
        bold: true,
        color: '#111827',
      },
      body: {
        fontSize: 9,
        color: '#4b5563',
        lineHeight: 1.25,
      },
      bodySmall: {
        fontSize: 8,
        color: '#6b7280',
      },
      link: {
        fontSize: 9,
        color: '#2563eb',
        decoration: 'underline',
      },
    },
    content: [
      {
        text: `${personalInfo.lastName} ${personalInfo.firstName}`.toUpperCase(),
        style: 'header',
        alignment: 'center',
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 0.5,
            lineColor: '#d1d5db',
          },
        ],
        margin: [0, 0, 0, 12],
      },
      {
        columns: [
          { width: '32%', stack: leftColumn },
          { width: '*', stack: rightColumn },
        ],
        columnGap: 20,
      },
    ],
    info: {
      title: `CV - ${personalInfo.firstName} ${personalInfo.lastName}`,
      author: `${personalInfo.firstName} ${personalInfo.lastName}`,
      subject: 'Curriculum Vitae',
    },
  };
}
