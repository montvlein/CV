import { formatExperienceDateRange } from './formatDate';
import { groupExperiencesByRole } from './groupExperiencesByRole';

const CONTENT_WIDTH = 515;

const LABELS = {
  es: {
    summary: 'PERFIL',
    experience: 'EXPERIENCIA',
    projects: 'PROYECTOS',
    skills: 'HABILIDADES',
    certifications: 'CERTIFICACIONES',
    programmingLanguages: 'Lenguajes',
    frameworksAndLibraries: 'Frameworks',
    toolsAndTechnologies: 'Herramientas',
    softSkills: 'Habilidades blandas',
    languages: 'Idiomas',
    github: 'GitHub',
    liveDemo: 'Demo',
  },
  en: {
    summary: 'SUMMARY',
    experience: 'EXPERIENCE',
    projects: 'PROJECTS',
    skills: 'SKILLS',
    certifications: 'CERTIFICATIONS',
    programmingLanguages: 'Programming Languages',
    frameworksAndLibraries: 'Frameworks & Libraries',
    toolsAndTechnologies: 'Tools',
    softSkills: 'Soft Skills',
    languages: 'Languages',
    github: 'GitHub',
    liveDemo: 'Live Demo',
  },
};

function sectionTitle(text) {
  return {
    stack: [
      { text, style: 'sectionTitle', margin: [0, 14, 0, 2] },
      {
        canvas: [{
          type: 'line',
          x1: 0,
          y1: 0,
          x2: CONTENT_WIDTH,
          y2: 0,
          lineWidth: 0.75,
          lineColor: '#000000',
        }],
        margin: [0, 0, 0, 6],
      },
    ],
  };
}

function harvardEntryHeader(leftContent, rightText) {
  return {
    columns: [
      { width: '*', stack: Array.isArray(leftContent) ? leftContent : [leftContent] },
      {
        width: 'auto',
        text: rightText,
        alignment: 'right',
        style: 'dates',
        margin: [12, 0, 0, 0],
      },
    ],
    columnGap: 8,
  };
}

function formatCertDate(date, language) {
  return new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
    year: 'numeric',
    month: 'long',
  });
}

function buildHarvardHeader(personalInfo, contact) {
  const contactParts = [
    { text: contact.location },
    { text: '  •  ' },
    { text: contact.phone },
    { text: '  •  ' },
    { text: contact.email, link: `mailto:${contact.email}` },
    { text: '  •  ' },
    { text: 'LinkedIn', link: contact.linkedin },
  ];

  if (contact.github) {
    contactParts.push({ text: '  •  ' }, { text: 'GitHub', link: contact.github });
  }

  return [
    {
      text: `${personalInfo.firstName} ${personalInfo.lastName}`.toUpperCase(),
      style: 'name',
      alignment: 'center',
    },
    {
      text: contactParts,
      style: 'contactLine',
      alignment: 'center',
      margin: [0, 4, 0, 0],
    },
  ];
}

function buildSummarySection(summary, labels) {
  return [
    sectionTitle(labels.summary),
    { text: summary, style: 'body', margin: [0, 0, 0, 4] },
  ];
}

function buildExperienceSection(experiences, language) {
  const groupedExperiences = groupExperiencesByRole(experiences, language);

  return [
    sectionTitle(LABELS[language].experience),
    ...groupedExperiences.flatMap((group) => {
      const isGroup = group.entries.length > 1;

      if (isGroup) {
        return [
          { text: group.role, style: 'position', margin: [0, 4, 0, 2] },
          ...group.entries.flatMap((experience) => [
            harvardEntryHeader(
              { text: experience.company, style: 'organization' },
              formatExperienceDateRange(experience.startDate, experience.endDate, language),
            ),
            {
              ul: [...experience.description[language]],
              style: 'body',
              margin: [0, 2, 0, 8],
            },
          ]),
        ];
      }

      const experience = group.entries[0];
      return [
        harvardEntryHeader(
          { text: experience.company, style: 'organization' },
          formatExperienceDateRange(experience.startDate, experience.endDate, language),
        ),
        { text: group.role, style: 'position', margin: [0, 0, 0, 2] },
        {
          ul: [...experience.description[language]],
          style: 'body',
          margin: [0, 0, 0, 8],
        },
      ];
    }),
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
      const links = [{ text: labels.github, link: project.link, style: 'link' }];

      if (project.deployment) {
        links.push(
          { text: '  |  ', style: 'bodySmall' },
          { text: labels.liveDemo, link: project.deployment, style: 'link' },
        );
      }

      return [
        { text: project.title[language], style: 'organization', margin: [0, 4, 0, 1] },
        {
          text: project.technologies.join(', '),
          style: 'bodySmall',
          italics: true,
          margin: [0, 0, 0, 2],
        },
        { text: project.description[language], style: 'body', margin: [0, 0, 0, 2] },
        { text: links, style: 'bodySmall', margin: [0, 0, 0, 8] },
      ];
    }),
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
    ...categories.map(({ title, items }) => ({
      text: [
        { text: `${title}: `, bold: true },
        { text: items.join(', ') },
      ],
      style: 'body',
      margin: [0, 0, 0, 3],
    })),
  ];
}

function buildCertificationsSection(certifications, language, labels) {
  return [
    sectionTitle(labels.certifications),
    ...certifications.flatMap((cert) => [
      {
        columns: [
          {
            width: '*',
            text: cert.title[language],
            link: cert.link,
            style: 'organization',
          },
          {
            width: 'auto',
            text: `${cert.issuer}, ${formatCertDate(cert.date, language)}`,
            alignment: 'right',
            style: 'dates',
            margin: [12, 0, 0, 0],
          },
        ],
        margin: [0, 2, 0, 6],
      },
    ]),
  ];
}

export function buildCvPdfDocument(data, language) {
  const resume = structuredClone(data);
  const labels = LABELS[language];
  const { personalInfo, skills, experience, projects, certifications } = resume;

  const content = [
    ...buildHarvardHeader(personalInfo, personalInfo.contact),
    ...buildSummarySection(personalInfo.summary[language], labels),
    ...buildExperienceSection(experience, language),
    ...buildSkillsSection(skills, language, labels),
    ...buildCertificationsSection(certifications, language, labels),
    // ...buildProjectsSection(projects, language, labels),
  ];

  return {
    pageSize: 'A4',
    pageMargins: [40, 44, 40, 44],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 10,
      color: '#000000',
    },
    styles: {
      name: {
        fontSize: 16,
        bold: true,
        characterSpacing: 0.5,
      },
      contactLine: {
        fontSize: 9,
        color: '#000000',
      },
      sectionTitle: {
        fontSize: 11,
        bold: true,
        characterSpacing: 0.8,
      },
      organization: {
        fontSize: 10,
        bold: true,
      },
      position: {
        fontSize: 10,
        italics: true,
      },
      dates: {
        fontSize: 9,
        color: '#000000',
      },
      body: {
        fontSize: 10,
        lineHeight: 1.2,
      },
      bodySmall: {
        fontSize: 9,
      },
      link: {
        fontSize: 9,
        color: '#000000',
        decoration: 'underline',
      },
    },
    content,
    info: {
      title: `CV - ${personalInfo.firstName} ${personalInfo.lastName}`,
      author: `${personalInfo.firstName} ${personalInfo.lastName}`,
      subject: 'Curriculum Vitae',
    },
  };
}
