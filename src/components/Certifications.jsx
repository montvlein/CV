import React from 'react';

export default function Certifications() {
  const certifications = [
    {
      title: "Certified Tech Developer - Professional Developer",
      issuer: "Digital House",
      date: "December 2022",
      link: "https://drive.google.com/file/d/1gNuxwgMU3JVq69oB_VoHIldNtAs-spAi/view?usp=sharing"
    },
    {
      title: "Back End Specialist",
      issuer: "Digital House",
      date: "December 2023",
      link: "https://drive.google.com/file/d/1I_Vc48t1NEpfpYJZMUBMs-CG_JGuXXml/view?usp=sharing"
    }
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">CERTIFICATIONS</h2>
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index}>
            <a 
              href={cert.link}
              className="font-medium hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {cert.title}
            </a>
            <p className="text-gray-600 dark:text-gray-300">{cert.issuer}</p>
            <p className="text-gray-600 dark:text-gray-400">{cert.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}