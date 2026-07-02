import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { formatExperienceDateRange } from '../utils/formatDate';
import { groupExperiencesByRole } from '../utils/groupExperiencesByRole';

function CompanyName({ experience }) {
  if (experience.companyLink) {
    return (
      <a
        href={experience.companyLink}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        {experience.company}
      </a>
    );
  }

  return (
    <span className="text-gray-900 dark:text-white">
      {experience.company}
    </span>
  );
}

export default function Experience({ experiences }) {
  const { language } = useLanguage();
  const groupedExperiences = groupExperiencesByRole(experiences, language);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{language === 'en' ? 'WORK EXPERIENCE' : 'EXPERIENCIA LABORAL'}</h2>
      <div className="space-y-6">
        {groupedExperiences.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">
              {group.role}
            </h3>
            <div className="space-y-4">
              {group.entries.map((experience, index) => (
                <div key={index}>
                  <CompanyName experience={experience} />
                  <span className="text-gray-600 dark:text-gray-400">
                    {' | '}
                    {formatExperienceDateRange(experience.startDate, experience.endDate, language)}
                  </span>
                  <ul className="list-disc ml-4 mt-2 text-gray-600 dark:text-gray-300">
                    {experience.description[language].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
