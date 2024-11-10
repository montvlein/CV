import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Projects({projects}) {
  const { language } = useLanguage();

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{language === 'en' ? 'PROJECTS' : 'PROYECTOS'}</h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index}>
            <h3 className="font-medium">{project.title[language]}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{project.description[language]}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-2 space-x-4">
              <a href={project.link} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                GitHub Repository
              </a>
              {project.deployment && (
                <a href={project.deployment} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}