import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageToggle({ className }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`p-2 rounded-lg bg-gray-200 dark:bg-gray-700 ${className}`}
      aria-label="Toggle language"
    >
      <span className="text-gray-700 dark:text-gray-200 font-medium">
        {language.toUpperCase()}
      </span>
    </button>
  );
}