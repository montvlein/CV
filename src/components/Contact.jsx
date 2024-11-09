import React from 'react';

export default function Contact() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">CONTACT</h2>
      <div className="space-y-2 text-gray-600">
        <p>📞 +549 11 5827 2260</p>
        <p>📍 Buenos Aires, Argentina</p>
        <p>✉️ montvlein@gmail.com</p>
        <p>🔗 <a href="https://www.linkedin.com/in/leonel-montivero-developer/" className="hover:text-blue-600">LinkedIn Profile</a></p>
      </div>
    </section>
  );
}