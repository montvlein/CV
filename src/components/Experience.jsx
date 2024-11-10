import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Experience({experiences}) {
  const { language } = useLanguage();

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{language === 'en' ? 'WORK EXPERIENCE' : 'EXPERIENCIA LABORAL'}</h2>
      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <div key={index}>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {experience.role[language]}
            </h3>
            <a 
              href={experience.companyLink}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {experience.company}
            </a>
            <span className="text-gray-600 dark:text-gray-400">
              {' | '}
              {new Date(experience.startDate).getFullYear()} - 
              {experience.endDate ? new Date(experience.endDate).getFullYear() : language === 'en' ? ' Present' : ' Presente'}
            </span>
            <ul className="list-disc ml-4 mt-2 text-gray-600 dark:text-gray-300">
              {experience.description[language].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}