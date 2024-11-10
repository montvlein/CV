import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutMe({summary}) {
  const {language} = useLanguage()

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">{language === 'en' ? 'ABOUT ME' : 'SOBRE MÍ'}</h2>
      <p className="text-gray-600 leading-relaxed dark:text-gray-300">
        {language === 'en' ? summary.en : summary.es}
      </p>
    </section>
  );
}