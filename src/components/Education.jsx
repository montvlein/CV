import React from 'react';

export default function Education() {
  const education = [
    {
      school: 'ROCHELLE UNIVERSITY',
      degree: 'Bachelor of Science in Psychology',
      period: '2015-2019'
    },
    {
      school: 'FAUGHT UNIVERSITY',
      degree: 'Certificate in Project Management',
      period: '2019-2020'
    }
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">EDUCATION</h2>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index}>
            <h3 className="font-medium">{edu.school}</h3>
            <p className="text-gray-600">{edu.degree}</p>
            <p className="text-gray-600">{edu.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}