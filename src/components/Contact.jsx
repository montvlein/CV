import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact({data}) {
  const { language } = useLanguage()

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3 uppercase">{language === "es" ? "Contacto" : "CONTACT"}</h2>
      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
        <li>📞 {data.phone}</li>
        <li>📍 {data.location}</li>
        <li>✉️ {data.email}</li>
        <li>🔗 <a href="https://www.linkedin.com/in/leonel-montivero-developer/" className="hover:text-blue-600">LinkedIn Profile</a></li>
      </ul>
    </section>
  );
}