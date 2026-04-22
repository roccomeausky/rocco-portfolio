"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { doc, setDoc, onSnapshot, increment } from "firebase/firestore";
import { db } from "../firebase";
import { projects } from "../lib/projects";

export default function Home() {
  const [views, setViews] = useState(0);
  const [upvotes, setUpvotes] = useState({ akka: 0, turret: 0, battlebot: 0 });

  useEffect(() => {
    // 1. Secretly increment the view counter when the page loads
    const incrementViews = async () => {
      const viewRef = doc(db, "stats", "views");
      await setDoc(viewRef, { count: increment(1) }, { merge: true });
    };
    incrementViews();

    // 2. Listen to the database for live view count updates
    const unsubViews = onSnapshot(doc(db, "stats", "views"), (doc) => {
      if (doc.exists()) setViews(doc.data().count);
    });

    // 3. Listen to the database for live upvote updates
    const unsubUpvotes = onSnapshot(doc(db, "stats", "upvotes"), (doc) => {
      if (doc.exists()) setUpvotes(doc.data());
    });

    return () => { unsubViews(); unsubUpvotes(); };
  }, []);

  // Function to handle clicking an upvote button
  const handleUpvote = async (project) => {
    const upvoteRef = doc(db, "stats", "upvotes");
    await setDoc(upvoteRef, { [project]: increment(1) }, { merge: true });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e4e4e7]">

      {/* ── Fixed background layers ── */}
      <div className="fixed inset-0 dot-grid pointer-events-none z-0" />
      <div
        className="fixed top-0 left-0 right-0 h-[700px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0, 229, 255, 0.05) 0%, transparent 60%)',
        }}
      />

      {/* ── Navigation ── */}
      <nav className="relative z-10 flex justify-between items-center p-6 md:p-8 max-w-6xl mx-auto">
        <div className="font-mono text-sm">
          <span className="text-[#00e5ff]">rocco</span>
          <span className="text-[#71717a]">@bu.edu</span>
          <span className="text-[#00e5ff]">:~$</span>
        </div>
        <div className="space-x-6 text-sm font-mono text-[#71717a]">
          <a
            href="#projects"
            className="hover:text-[#00e5ff] transition-colors duration-300"
          >
            projects
          </a>
          <a
            href="#contact"
            className="hover:text-[#00e5ff] transition-colors duration-300"
          >
            contact
          </a>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-36">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 border border-[#00e5ff33] bg-[#00e5ff08] px-4 py-1.5 rounded-full text-xs font-mono text-[#00e5ff] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            <span>Open to 2026 Internships</span>
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6 animate-fade-in-up animation-delay-100">
          Embedded systems{' '}
          <br />
          <span className="text-[#00e5ff]">& autonomous machines.</span>
          <span className="typing-cursor" />
        </h2>

        <p className="text-lg text-[#71717a] max-w-2xl leading-relaxed mb-10 animate-fade-in-up animation-delay-200">
          First-year Electrical Engineering student at Boston University.
          Specializing in hardware-software integration, computer vision, and
          physical computing.
        </p>

        <div className="animate-fade-in-up animation-delay-300 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-flex items-center border border-[#00e5ff] text-[#00e5ff] px-8 py-4 rounded-full font-mono text-sm hover:bg-[#00e5ff] hover:text-[#0a0a0f] transition-all duration-300"
          >
            View My Work ↓
          </a>
          <a
            href="/RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-[#1e1e2a] bg-[#111118] text-[#e4e4e7] px-8 py-4 rounded-full font-mono text-sm hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-300"
          >
            Resume.pdf ↗
          </a>
        </div>
      </header>

      {/* ── Projects Section ── */}
      <section
        id="projects"
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-16"
      >
        {/* Section header */}
        <div className="flex items-center space-x-3 mb-16">
          <span className="text-xs font-mono text-[#00e5ff]">//</span>
          <h3 className="text-sm font-mono text-[#71717a] tracking-widest uppercase">
            Selected Hardware
          </h3>
          <div className="flex-1 h-px bg-[#1e1e2a]" />
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group card-glow bg-[#111118] border border-[#1e1e2a] rounded-2xl overflow-hidden hover:border-[#00e5ff33] transition-all duration-500"
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-[#1e1e2a]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
                  <span className="text-xs font-mono text-[#71717a]">
                    {project.status}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#71717a]">
                  PROJECT_{project.number}
                </span>
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image panel */}
                <div
                  className={`overflow-hidden ${
                    index % 2 === 1 ? 'md:order-2' : ''
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Details panel */}
                <div
                  className={`p-6 md:p-8 flex flex-col justify-center ${
                    index % 2 === 1 ? 'md:order-1' : ''
                  }`}
                >
                  <h4 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                    {project.title}
                  </h4>
                  <p className="text-[#71717a] mb-6 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 border border-[#1e1e2a] text-xs font-mono text-[#00e5ff] rounded group-hover:border-[#00e5ff33] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Upvote + View Details */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUpvote(project.slug);
                      }}
                      className="flex items-center space-x-3 font-mono text-sm text-[#71717a] hover:text-[#00e5ff] transition-colors duration-300 w-fit cursor-pointer"
                    >
                      <span>$ upvote --project {project.slug}</span>
                      <span className="bg-[#00e5ff08] text-[#00e5ff] border border-[#00e5ff33] px-2.5 py-1 rounded text-xs">
                        {upvotes[project.slug] || 0}
                      </span>
                    </button>
                    <span className="text-xs font-mono text-[#71717a] group-hover:text-[#00e5ff] transition-colors duration-300 hidden md:inline">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Mars Rover Card ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-12">
        <div className="card-glow bg-[#111118] border border-[#1e1e2a] rounded-2xl overflow-hidden hover:border-[#00e5ff33] transition-all duration-500">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-[#1e1e2a]">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
              <span className="text-xs font-mono text-[#71717a]">
                IN PROGRESS
              </span>
            </div>
            <span className="text-xs font-mono text-[#71717a]">
              PROJECT_04
            </span>
          </div>

          <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h4 className="text-xl font-bold tracking-tight mb-2">
                BU Mars Rover Team
              </h4>
              <p className="text-[#71717a] text-sm max-w-2xl">
                Electrical Subteam. Designed motor controller PCB layouts using
                Altium Designer, focusing on signal integrity, correct component
                placement, and reliable trace routing ahead of competition
                deadlines.
              </p>
            </div>
            <span className="px-4 py-2 border border-[#00e5ff] text-[#00e5ff] text-xs font-mono rounded-full shrink-0">
              Altium Designer
            </span>
          </div>
        </div>
      </section>

      {/* ── Skills Terminal ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-12">
        <div className="border border-[#1e1e2a] bg-[#111118] rounded-2xl p-6 md:p-8 shrink-0 font-mono text-sm hover:border-[#00e5ff33] transition-all duration-500 card-glow">
          <div className="flex items-center space-x-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="space-y-3 pl-2 max-w-full overflow-x-auto text-[#a1a1aa] leading-relaxed">
            <p><span className="text-[#00e5ff]">rocco@system</span><span className="text-[#e4e4e7]">:~$</span> cat skills.json</p>
            <p className="text-[#e4e4e7]">{'{'}</p>
            <p className="pl-4 sm:pl-8">"hardware": ["PCB Design", "Altium Designer", "Soldering", "Circuit Analysis"],</p>
            <p className="pl-4 sm:pl-8">"software": ["C/C++", "Python", "JavaScript", "React/Next.js"],</p>
            <p className="pl-4 sm:pl-8">"systems":  ["Microcontrollers", "RTOS", "Linux", "I2C/SPI/UART", "Robotics"]</p>
            <p className="text-[#e4e4e7]">{'}'}</p>
            <p className="mt-4"><span className="text-[#00e5ff]">rocco@system</span><span className="text-[#e4e4e7]">:~$</span> <span className="typing-cursor" /></p>
          </div>
        </div>
      </section>

      {/* ── Footer & Contact ── */}
      <footer
        id="contact"
        className="relative z-10 border-t border-[#1e1e2a] py-24 mt-12"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <h3 className="text-4xl font-bold tracking-tighter mb-6">
            Let&apos;s build something.
          </h3>
          <p className="text-[#71717a] mb-10 font-mono text-sm">
            Currently seeking 2026 hardware and embedded internships.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:your.email@bu.edu"
              className="inline-flex items-center border border-[#00e5ff] text-[#00e5ff] px-8 py-3 rounded-full font-mono text-sm hover:bg-[#00e5ff] hover:text-[#0a0a0f] transition-all duration-300"
            >
              Email Me
            </a>
            <a
              href="https://github.com/roccomeausky"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-[#1e1e2a] bg-[#111118] text-[#e4e4e7] px-8 py-3 rounded-full font-mono text-sm hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-300"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/roccomeausky"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-[#1e1e2a] bg-[#111118] text-[#e4e4e7] px-8 py-3 rounded-full font-mono text-sm hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all duration-300"
            >
              LinkedIn ↗
            </a>
          </div>

          {/* The View Counter as system log */}
          <p className="text-xs text-[#71717a] font-mono mt-12">
              <span className="text-[#00e5ff]">&gt;</span>{' '}
              system.connections.total: {views || 0}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}