"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug } from "../../../lib/projects";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#e4e4e7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-2">404</p>
          <p className="text-[#a1a1aa] mb-8">Project not found.</p>
          <Link
            href="/"
            className="bg-[#e4e4e7] text-[#0a0a0f] px-6 py-3 rounded-lg text-sm font-medium hover:bg-white transition-colors duration-200"
          >
            Back to home
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
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-8 max-w-6xl mx-auto">
        <Link href="/" className="text-sm font-medium text-[#e4e4e7]">
          Rocco Meausky
        </Link>
        <Link
          href="/#projects"
          className="text-sm text-[#a1a1aa] hover:text-[#e4e4e7] transition-colors duration-200"
        >
          Back
        </Link>
      </nav>

      {/* Project Header */}
      <header className="max-w-6xl mx-auto px-6 md:px-8 pt-8 pb-12 animate-fade-in">
        <p className="text-sm text-[#a1a1aa] uppercase tracking-wider mb-4">
          {project.category}
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-3">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-[#a1a1aa]">
          {project.subtitle}
        </p>
      </header>

      {/* Hero Image */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 pb-16">
        <div className="rounded-xl overflow-hidden border border-[#1e1e2a]">
          <img
            src={project.heroImage || project.image}
            alt={project.alt}
            className="w-full aspect-video object-cover"
          />
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <h2 className="text-sm text-[#a1a1aa] uppercase tracking-wider mb-8">
          Overview
        </h2>
        <div className="space-y-4">
          {project.longDescription.map((paragraph, i) => (
            <p key={i} className="text-[#a1a1aa] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <h2 className="text-sm text-[#a1a1aa] uppercase tracking-wider mb-8">
          Technical Specifications
        </h2>
        <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl overflow-hidden">
          {project.specs.map((spec, i) => (
            <div
              key={i}
              className={`flex justify-between items-center px-6 py-4 ${
                i !== project.specs.length - 1 ? "border-b border-[#1e1e2a]" : ""
              }`}
            >
              <span className="text-sm text-[#a1a1aa]">
                {spec.label}
              </span>
              <span className="text-sm font-mono text-[#e4e4e7] text-right">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <h2 className="text-sm text-[#a1a1aa] uppercase tracking-wider mb-8">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-4 py-2 border border-[#1e1e2a] text-sm text-[#a1a1aa] rounded-lg hover:border-[#2a2a3a] transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <h2 className="text-sm text-[#a1a1aa] uppercase tracking-wider mb-8">
          Gallery
        </h2>
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
                  className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-transform duration-500"
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
                  <p className="text-xs text-[#a1a1aa]">
                    {item.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>




      {/* Prev / Next Navigation */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-16">
        <div className="h-px bg-[#1e1e2a] mb-8" />
        <div className="flex justify-between items-center">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="text-sm text-[#a1a1aa] hover:text-[#e4e4e7] transition-colors duration-200"
            >
              {prevProject.title}
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="text-sm text-[#a1a1aa] hover:text-[#e4e4e7] transition-colors duration-200"
            >
              {nextProject.title}
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2a] py-12 mt-8">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <Link
            href="/#projects"
            className="text-sm text-[#a1a1aa] hover:text-[#e4e4e7] transition-colors duration-200"
          >
            Back to projects
          </Link>
        </div>
      </footer>
    </div>
  );
}
