import React from 'react';

export default function Projects() {
  const projects = [
    {
      title: "Series and Movies Catalog",
      description: "System composed of multiple microservices to search for series and movie information.",
      technologies: ["Java SpringBoot", "Docker"],
      link: "https://github.com/montvlein/examen-esp-backend-Montivero-Fabricio"
    },
    {
      title: "Ticket Sales Platform",
      description: "Event platform to manage ticket sales.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/montvlein/DH_Final_Project_2_Frontend",
      deployment: "https://dh-final-project-2-frontend-rsanmfug1.vercel.app/"
    },
    {
      title: "OCR Reader",
      description: "Demo website for character recognition.",
      technologies: ["HTML", "Appscript", "GCP"],
      link: "https://github.com/montvlein/OCR",
      deployment: "https://montvlein.github.io/OCR/"
    }
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">PROJECTS</h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index}>
            <h3 className="font-medium">{project.title}</h3>
            <p className="text-gray-600 mt-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-2 space-x-4">
              <a href={project.link} className="text-blue-600 hover:text-blue-800 text-sm">
                GitHub Repository
              </a>
              {project.deployment && (
                <a href={project.deployment} className="text-blue-600 hover:text-blue-800 text-sm">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}