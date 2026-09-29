"use client";

import React from "react";
import { ExternalLink, Mail, Phone, MapPin, Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function CvTemplate({ data, printableRef }) {
  if (!data) return null;

  const {
    personalInfo = {},
    objective = "",
    experiences = [],
    skills = {},
    projects = [],
    education = [],
    languages = [],
  } = data;

  return (
    <div
      ref={printableRef}
      id="printable-cv-area"
      className="cv-paper bg-white text-gray-900 font-sans shadow-2xl mx-auto transition-all"
      style={{
        width: "100%",
        maxWidth: "210mm",
        minHeight: "297mm",
        padding: "12mm 14mm",
        boxSizing: "border-box",
        fontSize: "10.5pt",
        lineHeight: "1.4",
        color: "#111827",
      }}
    >
      {/* HEADER SECTION */}
      <header className="text-center pb-2.5 mb-2.5 border-b border-gray-300">
        <h1 className="text-2xl font-black tracking-wider uppercase text-gray-950 font-serif">
          {personalInfo.fullName || "MD ANTOR MIA"}
        </h1>
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-indigo-700 mt-0.5">
          {personalInfo.title || "MERN Stack Developer"}
        </p>

        {/* Contact Info Line */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-gray-600 mt-2">
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone size={11} className="text-gray-500" />
              <a href={`tel:${personalInfo.phone}`} className="hover:underline text-gray-800">
                {personalInfo.phone}
              </a>
            </span>
          )}
          {personalInfo.phone && personalInfo.email && <span className="text-gray-300">|</span>}
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail size={11} className="text-gray-500" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline text-gray-800">
                {personalInfo.email}
              </a>
            </span>
          )}
          {personalInfo.email && personalInfo.location && <span className="text-gray-300">|</span>}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} className="text-gray-500" />
              <span className="text-gray-800">{personalInfo.location}</span>
            </span>
          )}
        </div>

        {/* Social / Portfolio Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium text-indigo-600 mt-1.5">
          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline hover:text-indigo-800"
            >
              <FaGithub size={11} />
              <span>GitHub</span>
            </a>
          )}
          {personalInfo.github && personalInfo.portfolio && <span className="text-gray-300">|</span>}
          {personalInfo.portfolio && (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline hover:text-indigo-800"
            >
              <Globe size={11} />
              <span>Portfolio</span>
            </a>
          )}
          {personalInfo.portfolio && personalInfo.linkedin && <span className="text-gray-300">|</span>}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline hover:text-indigo-800"
            >
              <FaLinkedin size={11} />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </header>

      {/* CAREER OBJECTIVE */}
      {objective && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Career Objective
          </h2>
          <p className="text-[11px] leading-relaxed text-gray-800 text-justify">
            {objective}
          </p>
        </section>
      )}

      {/* PROFESSIONAL EXPERIENCE */}
      {experiences && experiences.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Professional Experience
          </h2>
          <div className="space-y-2">
            {experiences.map((exp, idx) => (
              <div key={exp.id || idx} className="text-[11px]">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-950">
                    {exp.role}
                    {exp.typeOrCompany && (
                      <span className="font-semibold text-gray-600"> | {exp.typeOrCompany}</span>
                    )}
                  </span>
                  {exp.duration && (
                    <span className="text-[10px] text-gray-500 font-medium">{exp.duration}</span>
                  )}
                </div>
                {exp.description && (
                  <p className="text-gray-700 leading-snug mt-0.5">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TECHNICAL SKILLS */}
      {skills && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Technical Skills
          </h2>
          <div className="space-y-1 text-[11px]">
            {skills.frontend && (
              <p className="leading-snug">
                <span className="font-bold text-gray-950">Frontend: </span>
                <span className="text-gray-800">{skills.frontend}</span>
              </p>
            )}
            {skills.backend && (
              <p className="leading-snug">
                <span className="font-bold text-gray-950">Backend: </span>
                <span className="text-gray-800">{skills.backend}</span>
              </p>
            )}
            {skills.programming && (
              <p className="leading-snug">
                <span className="font-bold text-gray-950">Programming Languages: </span>
                <span className="text-gray-800">{skills.programming}</span>
              </p>
            )}
            {skills.tools && (
              <p className="leading-snug">
                <span className="font-bold text-gray-950">Tools: </span>
                <span className="text-gray-800">{skills.tools}</span>
              </p>
            )}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="text-[11px]">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-bold text-gray-950 text-[11.5px]">{proj.name}</span>
                  <div className="flex items-center gap-1.5 text-[10.5px]">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-0.5 underline"
                      >
                        <span>Live</span>
                        <ExternalLink size={9} />
                      </a>
                    )}
                    {proj.liveUrl && proj.githubUrl && <span className="text-gray-400">•</span>}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-0.5 underline"
                      >
                        <span>Source Code</span>
                        <ExternalLink size={9} />
                      </a>
                    )}
                  </div>
                </div>

                {proj.technologies && (
                  <p className="text-[10px] text-gray-600 font-medium mt-0.5">
                    <span className="font-semibold text-gray-700">Tech:</span> {proj.technologies}
                  </p>
                )}

                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-gray-800 text-[10.5px] leading-tight">
                    {proj.highlights.map((item, hIdx) => (
                      <li key={hIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education && education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Education
          </h2>
          <div className="space-y-1.5">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="text-[11px] flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-gray-950">{edu.degree}</span>
                  {edu.institution && (
                    <span className="text-gray-700"> - {edu.institution}</span>
                  )}
                </div>
                {edu.year && <span className="text-[10px] text-gray-500 font-medium">{edu.year}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* LANGUAGES */}
      {languages && languages.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[12px] font-bold tracking-wider uppercase text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
            {languages.map((lang, idx) => (
              <span key={lang.id || idx} className="text-gray-800">
                <strong className="text-gray-950">{lang.name}:</strong> {lang.proficiency}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
