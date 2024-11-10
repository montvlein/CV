import React from 'react';
import Contact from './components/Contact';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import data from './data/resume.json'
import DarkModeToggle from './components/Toggles/DarkModeToggle';
import LanguageToggle from './components/Toggles/LangToggle';
import { LanguageProvider } from './context/LanguageContext';
import PdfDownloadButton from './components/PdfDownloadButton';

function App() {
  return (
    <LanguageProvider>
    <div className="absolute top-4 right-4 flex gap-2 print:hidden">
      <PdfDownloadButton />
      <LanguageToggle />
      <DarkModeToggle />
    </div>
    <div id="cv-content" className="min-h-screen p-8 max-w-5xl mx-auto roboto-medium bg-white dark:bg-gray-900 dark:text-white">
      <header className='mb-2 text-center'>
        <h1 className="text-3xl font-bold mb-2 uppercase">{data.personalInfo.lastName} {data.personalInfo.firstName}</h1>
        <hr/>
      </header>
      <main className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          <Contact data={data.personalInfo.contact}/>
          <Skills skills={data.skills} />
          <Certifications certifications={data.certifications} />
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          <AboutMe summary={data.personalInfo.summary} />
          <Experience experiences={data.experience} />
          <Projects projects={data.projects} />
        </div>
      </main>
    </div>
    </LanguageProvider>
  );
}

export default App;