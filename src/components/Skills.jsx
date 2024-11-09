import React from 'react';

export default function Skills() {
  const skillCategories = {
    'Programming Languages': [
      'HTML', 'CSS', 'JavaScript', 'Java', 'Golang', 'Python', 'AppScript'
    ],
    'Frameworks & Libraries': [
      'React', 'Next.js', 'Bootstrap v4', 'Tailwind', 'Express', 'Spring Boot', 
      'Nest.js', 'Prisma', 'Fiber'
    ],
    'Tools & Technologies': [
      'Postman', 'Git', 'Jira'
    ],
    'Soft Skills': [
      'Teamwork', 'Problem-solving', 'Time management', 'Adaptability'
    ],
    'Languages': [
      'Spanish (Native)', 'English (A2)'
    ]
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">SKILLS</h2>
      <div className="space-y-6">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}