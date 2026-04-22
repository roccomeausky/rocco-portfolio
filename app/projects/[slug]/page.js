"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { doc, setDoc, onSnapshot, increment } from "firebase/firestore";
import { db } from "../../../firebase";
import { projects, getProjectBySlug } from "../../../lib/projects";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  const [upvotes, setUpvotes] = useState({});

  useEffect(() => {
    const unsubUpvotes = onSnapshot(doc(db, "stats", "upvotes"), (doc) => {
      if (doc.exists()) setUpvotes(doc.data());
    });
    return () => unsubUpvotes();
  }, []);

  const handleUpvote = async (projectId) => {
    const upvoteRef = doc(db, "stats", "upvotes");
    await setDoc(upvoteRef, { [projectId]: increment(1) }, { merge: true });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#e4e4e7] flex items-center justify-center">
        <div className="text-center font-mono">
          <p className="text-[#00e5ff] text-lg mb-4">404</p>
          <p className="text-[#71717a] mb-8">Project not found.</p>
          <Link
            href="/"
            className="border border-[#00e5ff] text-[#00e5ff] px-6 py-2 rounded-full text-sm hover:bg-[#00e5ff] hover:text-[#0a0a0f] transition-all duration-300"
          >
            ← cd ~
          </Link>
        </div>
      </div>
    );
  }

  // Find prev/next projects for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e4e4e7]">
      {/* ── Background layers ── */}
      <div className="fixed inset-0 dot-grid pointer-events-none z-0" />
      <div
        className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0, 229, 255, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* ── Navigation ── */}
      <nav className="relative z-10 flex justify-between items-center p-6 md:p-8 max-w-6xl mx-auto">
        <div className="font-mono text-sm">
          <span className="text-[#00e5ff]">rocco</span>
          <span className="text-[#71717a]">@bu.edu</span>
          <span className="text-[#00e5ff]">:~/projects$</span>
        </div>
        <Link
          href="/#projects"
          className="text-sm font-mono text-[#71717a] hover:text-[#00e5ff] transition-colors duration-300"
        >
          ← back
        </Link>
      </nav>

      {/* ── Project Header ── */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-8 pb-12">
        <div className="flex items-center space-x-3 mb-8">
          <span className="text-xs font-mono text-[#00e5ff]">
            PROJECT_{project.number}
          </span>
          <div className="flex-1 h-px bg-[#1e1e2a]" />
          <div className="flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full bg-[#00e5ff] ${
                project.status === "IN PROGRESS" ? "animate-pulse" : ""
              }`}
            />
            <span className="text-xs font-mono text-[#71717a]">
              {project.status}
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-3">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl font-mono text-[#00e5ff] mb-2">
          {project.subtitle}
        </p>
        <p className="text-sm font-mono text-[#71717a]">{project.category}</p>
      </header>

      {/* ── Hero Image ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pb-16">
        <div className="rounded-2xl overflow-hidden border border-[#1e1e2a]">
          <img
            src={project.image}
            alt={project.alt}
            className="w-full aspect-video object-cover"
          />
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <div className="flex items-center space-x-3 mb-8">
          <span className="text-xs font-mono text-[#00e5ff]">//</span>
          <h2 className="text-sm font-mono text-[#71717a] tracking-widest uppercase">
            Overview
          </h2>
          <div className="flex-1 h-px bg-[#1e1e2a]" />
        </div>

        <div className="space-y-4">
          {project.longDescription.map((paragraph, i) => (
            <p key={i} className="text-[#a1a1aa] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ── Technical Specifications ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <div className="flex items-center space-x-3 mb-8">
          <span className="text-xs font-mono text-[#00e5ff]">//</span>
          <h2 className="text-sm font-mono text-[#71717a] tracking-widest uppercase">
            Technical Specifications
          </h2>
          <div className="flex-1 h-px bg-[#1e1e2a]" />
        </div>

        <div className="bg-[#111118] border border-[#1e1e2a] rounded-2xl overflow-hidden">
          {project.specs.map((spec, i) => (
            <div
              key={i}
              className={`flex justify-between items-center px-6 py-4 ${
                i !== project.specs.length - 1 ? "border-b border-[#1e1e2a]" : ""
              }`}
            >
              <span className="text-sm font-mono text-[#71717a]">
                {spec.label}
              </span>
              <span className="text-sm font-mono text-[#e4e4e7] text-right">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <div className="flex items-center space-x-3 mb-8">
          <span className="text-xs font-mono text-[#00e5ff]">//</span>
          <h2 className="text-sm font-mono text-[#71717a] tracking-widest uppercase">
            Tech Stack
          </h2>
          <div className="flex-1 h-px bg-[#1e1e2a]" />
        </div>

        <div className="flex flex-wrap gap-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-4 py-2 border border-[#1e1e2a] text-sm font-mono text-[#00e5ff] rounded-lg hover:border-[#00e5ff33] transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <div className="flex items-center space-x-3 mb-8">
          <span className="text-xs font-mono text-[#00e5ff]">//</span>
          <h2 className="text-sm font-mono text-[#71717a] tracking-widest uppercase">
            Gallery
          </h2>
          <div className="flex-1 h-px bg-[#1e1e2a]" />
        </div>

        <div className="space-y-4">
          {project.gallery.map((item, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden border border-[#1e1e2a] group ${
                item.type === 'image' ? 'inline-block w-full md:w-[calc(50%-0.5rem)]' : 'w-full'
              }`}
              style={item.type === 'image' ? { marginRight: i % 2 === 0 ? '0.5rem' : '0' } : {}}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <video
                  src={item.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video bg-black"
                >
                  Your browser does not support the video tag.
                </video>
              )}
              {item.caption && (
                <div className="px-4 py-3 bg-[#111118]">
                  <p className="text-xs font-mono text-[#71717a]">
                    {item.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Upvote ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <button
          onClick={() => handleUpvote(project.slug)}
          className="flex items-center space-x-3 font-mono text-sm text-[#71717a] hover:text-[#00e5ff] transition-colors duration-300 cursor-pointer"
        >
          <span>$ upvote --project {project.slug}</span>
          <span className="bg-[#00e5ff08] text-[#00e5ff] border border-[#00e5ff33] px-3 py-1.5 rounded text-xs">
            {upvotes[project.slug] || 0}
          </span>
        </button>
      </section>

      {/* ── Prev / Next Navigation ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <div className="h-px bg-[#1e1e2a] mb-8" />
        <div className="flex justify-between items-center">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="font-mono text-sm text-[#71717a] hover:text-[#00e5ff] transition-colors duration-300"
            >
              ← {prevProject.title}
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="font-mono text-sm text-[#71717a] hover:text-[#00e5ff] transition-colors duration-300"
            >
              {nextProject.title} →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-[#1e1e2a] py-12 mt-8">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center border border-[#00e5ff] text-[#00e5ff] px-6 py-2.5 rounded-full font-mono text-sm hover:bg-[#00e5ff] hover:text-[#0a0a0f] transition-all duration-300"
          >
            ← cd ~
          </Link>
        </div>
      </footer>
    </div>
  );
}
