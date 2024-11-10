import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Skills({skills}) {
  const { language } = useLanguage();

  const skillCategories = {
    'Programming Languages': skills.programmingLanguages,
    'Frameworks & Libraries': skills.frameworksAndLibraries,
    'Tools & Technologies': skills.toolsAndTechnologies,
    'Soft Skills': skills.softSkills[language],
    'Languages': skills.languages
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">SKILLS</h2>
      <div className="space-y-6">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill} 
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}