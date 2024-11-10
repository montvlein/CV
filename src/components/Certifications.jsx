import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Certifications({certifications}) {
  const { language } = useLanguage()

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{language === 'en' ? 'CERTIFICATIONS' : 'CERTIFICACIONES'}</h2>
      <article className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index}>
            <a 
              href={cert.link}
              className="font-medium hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
               {cert.title[language]}
            </a>
            <p className="text-gray-600 dark:text-gray-300">{cert.issuer}</p>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(cert.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
}