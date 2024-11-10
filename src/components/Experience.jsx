import React from 'react';

export default function Experience() {
  const experience = {
    company: "Set & Forget",
    role: "Fullstack Developer",
    period: "2021 - Present",
    description: [
      "Designed and implemented solutions using AppScript and Google Cloud.",
      "Developed scalable solutions using React and Node.js.",
      "Integrated RESTful APIs to optimize service interoperability."
    ],
    companyLink: "https://www.linkedin.com/company/setandforget/"
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">WORK EXPERIENCE</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium">{experience.role}</h3>
          <a 
            href={experience.companyLink}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {experience.company}
          </a>
          <span className="text-gray-600 dark:text-gray-400"> | {experience.period}</span>
          <ul className="list-disc ml-4 mt-2 text-gray-600 dark:text-gray-300">
            {experience.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}