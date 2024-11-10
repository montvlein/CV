import React from 'react';

export default function Contact() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">CONTACT</h2>
      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
        <li>📞 +549 11 5827 2260</li>
        <li>📍 Buenos Aires, Argentina</li>
        <li>✉️ montvlein@gmail.com</li>
        <li>🔗 <a href="https://www.linkedin.com/in/leonel-montivero-developer/" className="hover:text-blue-600">LinkedIn Profile</a></li>
      </ul>
    </section>
  );
}