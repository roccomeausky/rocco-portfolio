"use client";

import React, { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, increment } from "firebase/firestore";
import { db } from "../firebase";

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
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 font-sans selection:bg-blue-200">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center p-8 max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold tracking-tighter">Rocco Meausky</h1>
        <div className="space-x-6 text-sm font-medium text-gray-500">
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-8 py-24 md:py-32">
        <div className="inline-flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-gray-600 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>Open to 2026 Internships</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
          I build <span className="text-gray-400">autonomous robots</span> <br/>
          and <span className="text-gray-400">embedded systems.</span>
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-10">
          First-year Electrical Engineering student at Boston University. 
          Specializing in hardware-software integration, computer vision, and physical computing.
        </p>
        <a href="#projects" className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all">
          View My Work ↓
        </a>
      </header>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto px-8 py-16">
        <h3 className="text-2xl font-bold tracking-tight mb-12 border-b pb-4">Selected Hardware</h3>

        <div className="space-y-24">
          
          {/* Project 1: AKKA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 overflow-hidden shadow-sm">
              <img src="/akka.jpg" alt="Project AKKA" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-3xl font-bold tracking-tight mb-3">Project AKKA</h4>
              <p className="text-gray-500 mb-6 leading-relaxed">
                A 6-DOF autonomous robotic arm powered by an NVIDIA Jetson Orin Nano. Engineered the power distribution system (handling up to 20A) using buck converters and terminal blocks. Programmed an Arduino via I2C to translate spatial AI coordinates into deterministic PWM signals for a 16-channel servo driver. Custom-designed and 3D-printed an active-cooled electronics enclosure.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['NVIDIA Jetson', 'Arduino', 'I2C', 'CAD', 'Power Distribution'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-md text-gray-600">{tech}</span>
                ))}
              </div>
              <button onClick={() => handleUpvote('akka')} className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors">
                <span>▲ Upvote Project</span>
                <span className="bg-gray-100 text-black px-2 py-1 rounded-md">{upvotes.akka || 0}</span>
              </button>
            </div>
          </div>

          {/* Project 2: Nerf Turret */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h4 className="text-3xl font-bold tracking-tight mb-3">Autonomous Targeting Turret</h4>
              <p className="text-gray-500 mb-6 leading-relaxed">
                An autonomous computer-vision turret powered by a Raspberry Pi Zero W2. Implemented YOLOv8n to identify and track specific targets while executing a strict human-detection safety lock. Integrated DC motors with encoders and limit switches for precise pan/tilt collision avoidance, alongside a servo-actuated firing mechanism.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Raspberry Pi', 'YOLOv8n Vision', 'Encoders', 'Servos/DC Motors', 'Python'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-md text-gray-600">{tech}</span>
                ))}
              </div>
              <button onClick={() => handleUpvote('turret')} className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors">
                <span>▲ Upvote Project</span>
                <span className="bg-gray-100 text-black px-2 py-1 rounded-md">{upvotes.turret || 0}</span>
              </button>
            </div>
            <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 order-1 md:order-2 overflow-hidden shadow-sm">
              <img src="/turret.jpg" alt="Autonomous Turret" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Project 3: Battle Bot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 overflow-hidden shadow-sm">
              <img src="/andy.jpg" alt="Battle Bot" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-3xl font-bold tracking-tight mb-3">Tournament Battle Bot</h4>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Head Electrical Engineer for a tournament-winning combat robot. Designed the electronic control system, including motor drivers, power regulation, and signal routing. Programmed dual ESP32 microcontrollers in C++ to interpret Bluetooth inputs and operate wheel and lift motors in real-time.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['ESP32', 'C++', 'Bluetooth', 'Motor Drivers', 'Wiring'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-md text-gray-600">{tech}</span>
                ))}
              </div>
              <button onClick={() => handleUpvote('battlebot')} className="flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-black transition-colors">
                <span>▲ Upvote Project</span>
                <span className="bg-gray-100 text-black px-2 py-1 rounded-md">{upvotes.battlebot || 0}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Mars Rover (Text Only Card) */}
      <section className="max-w-5xl mx-auto px-8 py-12">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="text-xl font-bold tracking-tight mb-2">BU Mars Rover Team</h4>
            <p className="text-gray-500 text-sm max-w-2xl">
              Electrical Subteam. Designed motor controller PCB layouts using Altium Designer, focusing on signal integrity, correct component placement, and reliable trace routing ahead of competition deadlines.
            </p>
          </div>
          <span className="px-4 py-2 bg-black text-white text-xs font-bold rounded-full shrink-0">Altium Designer</span>
        </div>
      </section>

      {/* Footer & Contact */}
      <footer id="contact" className="bg-black text-white py-24 mt-12">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h3 className="text-4xl font-bold tracking-tighter mb-6">Let&apos;s build something.</h3>
          <p className="text-gray-400 mb-10">Currently seeking 2026 hardware and embedded internships.</p>
          <div className="flex flex-col items-center justify-center space-y-6">
            <a href="mailto:your.email@bu.edu" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Email Me
            </a>
            
            {/* The Silent View Counter! */}
            <p className="text-xs text-gray-600 font-mono mt-12">
              Total Site Views: {views || 0}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}