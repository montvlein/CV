import React from 'react';
import Contact from './components/Contact';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import data from '../datos.json'

function App() {
  return (
    <div className="min-h-screen bg-white p-8 max-w-5xl mx-auto roboto-medium">
      <header className='mb-2 text-center'>
        <h1 className="text-3xl font-bold mb-2 uppercase">{data.personalInfo.lastName} {data.personalInfo.firstName}</h1>
        <hr/>
      </header>

      <main className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          <Contact />
          <Skills />
          <Certifications />
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          <AboutMe />
          <Experience />
          <Projects />
        </div>
      </main>
    </div>
  );
}

export default App;