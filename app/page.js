"use client";

import React from 'react';
import Link from 'next/link';
import { projects } from "../lib/projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e4e4e7]">

      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 max-w-5xl mx-auto">
        <span className="text-sm font-medium tracking-tight">Rocco Meausky</span>
        <div className="space-x-6 text-sm text-[#a1a1aa]">
          <a
            href="#projects"
            className="hover:text-[#e4e4e7] transition-colors duration-200"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="hover:text-[#e4e4e7] transition-colors duration-200"
          >
            Skills
          </a>
          <a
            href="#contact"
            className="hover:text-[#e4e4e7] transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 animate-fade-in">
        <p className="text-sm text-[#00e5ff] mb-6">
          Open to 2026 internships
        </p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
          Rocco Meausky
        </h1>

        <p className="text-base md:text-lg text-[#a1a1aa] max-w-lg leading-relaxed mb-8">
          EE student at Boston University. I build robots, embedded systems, and PCBs.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#projects"
            className="bg-[#e4e4e7] text-[#0a0a0f] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors duration-200"
          >
            View projects
          </a>
          <a
            href="/RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#2a2a3a] text-[#a1a1aa] px-6 py-2.5 rounded-lg text-sm hover:text-[#e4e4e7] hover:border-[#3a3a4a] transition-colors duration-200"
          >
            Resume
          </a>
        </div>
      </header>

      {/* Projects */}
      <section
        id="projects"
        className="max-w-5xl mx-auto px-6 md:px-8 pb-16"
      >
        <h2 className="text-sm text-[#a1a1aa] uppercase tracking-wider mb-8">
          Projects
        </h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden hover:border-[#2a2a3a] transition-colors duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div
                  className={`overflow-hidden ${
                    index % 2 === 1 ? 'md:order-2' : ''
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div
                  className={`p-5 md:p-7 flex flex-col justify-center ${
                    index % 2 === 1 ? 'md:order-1' : ''
                  }`}
                >
                  <p className="text-xs text-[#71717a] uppercase tracking-wider mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#a1a1aa] mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-[#71717a] mb-4 leading-relaxed text-sm line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[#1a1a24] text-xs text-[#a1a1aa] rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs text-[#71717a] group-hover:text-[#a1a1aa] transition-colors duration-200">
                    View details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mars Rover */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pb-12">
        <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden hover:border-[#2a2a3a] transition-colors duration-200">
          <div className="p-5 md:p-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-lg font-semibold tracking-tight">
                  BU Mars Rover Team
                </h3>
                <span className="text-[10px] text-[#00e5ff] bg-[#00e5ff0a] border border-[#00e5ff22] px-1.5 py-0.5 rounded">
                  In progress
                </span>
              </div>
              <p className="text-[#71717a] text-sm max-w-2xl leading-relaxed">
                Electrical Subteam. Designed motor controller PCB layouts using
                Altium Designer, focusing on signal integrity, correct component
                placement, and reliable trace routing ahead of competition
                deadlines.
              </p>
            </div>
            <span className="px-2.5 py-1 bg-[#1a1a24] text-xs text-[#a1a1aa] rounded shrink-0">
              Altium Designer
            </span>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-5xl mx-auto px-6 md:px-8 py-12">
        <h2 className="text-sm text-[#a1a1aa] uppercase tracking-wider mb-6">
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5">
            <h3 className="text-sm font-medium mb-3 text-[#e4e4e7]">Hardware</h3>
            <ul className="space-y-1.5 text-sm text-[#a1a1aa]">
              <li>PCB Design</li>
              <li>Altium Designer</li>
              <li>Soldering</li>
              <li>Circuit Analysis</li>
            </ul>
          </div>
          <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5">
            <h3 className="text-sm font-medium mb-3 text-[#e4e4e7]">Software</h3>
            <ul className="space-y-1.5 text-sm text-[#a1a1aa]">
              <li>C / C++</li>
              <li>Python</li>
              <li>JavaScript</li>
              <li>React / Next.js</li>
            </ul>
          </div>
          <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5">
            <h3 className="text-sm font-medium mb-3 text-[#e4e4e7]">Systems</h3>
            <ul className="space-y-1.5 text-sm text-[#a1a1aa]">
              <li>Microcontrollers</li>
              <li>RTOS</li>
              <li>Linux</li>
              <li>I2C / SPI / UART</li>
              <li>Robotics</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer
        id="contact"
        className="border-t border-[#1e1e2a] py-16 mt-6"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <h3 className="text-xl font-semibold tracking-tight mb-6">
            Contact me
          </h3>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:your.email@bu.edu"
              className="bg-[#e4e4e7] text-[#0a0a0f] px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors duration-200"
            >
              Email
            </a>
            <a
              href="https://github.com/roccomeausky"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#2a2a3a] text-[#a1a1aa] px-6 py-2.5 rounded-lg text-sm hover:text-[#e4e4e7] hover:border-[#3a3a4a] transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/rocco-meausky/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#2a2a3a] text-[#a1a1aa] px-6 py-2.5 rounded-lg text-sm hover:text-[#e4e4e7] hover:border-[#3a3a4a] transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}