"use client";

import React from "react";

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
      className="cv-paper bg-white text-black shadow-2xl mx-auto"
      style={{
        width: "100%",
        maxWidth: "210mm",
        minHeight: "297mm",
        padding: "16mm 18mm",
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "12px",
        lineHeight: "1.45",
        color: "#000000",
      }}
    >
      {/* HEADER SECTION */}
      <div className="text-center mb-3">
        <h1 className="text-[17px] font-bold text-black tracking-normal">
          {personalInfo.fullName || "Md Antor Mia"}
        </h1>
        <div className="text-[13px] font-bold text-black mt-0.5">
          {personalInfo.title || "MERN Stack Developer"}
        </div>

        {/* Contact info line */}
        <div className="text-[12px] text-black mt-1">
          <span>{personalInfo.phone || "+8801318964063"}</span>
          <span> | </span>
          <a
            href={`mailto:${personalInfo.email || "mdantormia1779@gmail.com"}`}
            className="hover:underline text-black"
          >
            {personalInfo.email || "mdantormia1779@gmail.com"}
          </a>
          <span>| </span>
          <span>{personalInfo.location || "Rangpur,Bangladesh"}</span>
        </div>

        {/* Links line: Underlined text with pipe */}
        <div className="text-[12px] text-black mt-1">
          {personalInfo.github ? (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="underline text-black hover:text-blue-700"
            >
              GitHub
            </a>
          ) : (
            <span className="underline">GitHub</span>
          )}
          <span> | </span>
          {personalInfo.portfolio ? (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noreferrer"
              className="underline text-black hover:text-blue-700"
            >
              Portfolio
            </a>
          ) : (
            <span className="underline">Portfolio</span>
          )}
          <span> | </span>
          {personalInfo.linkedin ? (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline text-black hover:text-blue-700"
            >
              Linkedin
            </a>
          ) : (
            <span className="underline">Linkedin</span>
          )}
        </div>
      </div>

      {/* CAREER OBJECTIVE */}
      <div className="mb-3.5">
        <div className="font-bold text-[13px] text-black mb-1">
          Career Objective
        </div>
        <p className="text-[12px] text-black leading-[1.45] text-justify">
          {objective ? (
            // Render with bold for MERN Stack Developer if present
            objective.includes("MERN Stack Developer") ? (
              <>
                {objective.split("MERN Stack Developer")[0]}
                <strong>MERN Stack Developer</strong>
                {objective.split("MERN Stack Developer").slice(1).join("MERN Stack Developer")}
              </>
            ) : (
              objective
            )
          ) : (
            <>
              Motivated <strong>MERN Stack Developer</strong> with hands-on experience in React.js, Next.js, Node.js, and modern web technologies. Experienced in building responsive, scalable, and user-friendly applications. Seeking an opportunity to contribute to real-world projects while growing as a professional Full-Stack Developer.
            </>
          )}
        </p>
      </div>

      {/* PROFESSIONAL EXPERIENCE */}
      {experiences && experiences.length > 0 && (
        <div className="mb-3.5">
          <div className="font-bold text-[13px] text-black mb-1">
            Professional Experience
          </div>
          <div className="space-y-1.5 text-[12px] leading-[1.45]">
            {experiences.map((exp, idx) => (
              <p key={exp.id || idx} className="text-black">
                <strong>
                  {exp.role}
                  {exp.typeOrCompany ? ` | ${exp.typeOrCompany}` : ""}
                </strong>
                {exp.description ? ` — ${exp.description}` : ""}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* TECHNICAL SKILL */}
      {skills && (
        <div className="mb-3.5">
          <div className="font-bold text-[13px] text-black mb-1">
            Technical Skill
          </div>
          <ul className="list-disc list-outside ml-6 space-y-0.5 text-[12px] leading-[1.4] text-black">
            {skills.frontend && (
              <li>
                <strong>Frontend: </strong>
                <span>{skills.frontend}</span>
              </li>
            )}
            {skills.backend && (
              <li>
                <strong>Backend: </strong>
                <span>{skills.backend}</span>
              </li>
            )}
            {skills.programming && (
              <li>
                <strong>Programming Languages: </strong>
                <span>{skills.programming}</span>
              </li>
            )}
            {skills.tools && (
              <li>
                <strong>Tools: </strong>
                <span>{skills.tools}</span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <div className="mb-3.5">
          <div className="font-bold text-[13px] text-black mb-1">
            Projects:
          </div>
          <div className="space-y-3 text-[12px]">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                {/* Project Title and Links line */}
                <div className="text-black">
                  <strong className="text-black">{proj.name}</strong>{" "}
                  {proj.liveUrl ? (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-black hover:text-blue-700"
                    >
                      Live link
                    </a>
                  ) : (
                    <span className="underline">Live link</span>
                  )}{" "}
                  |{" "}
                  {proj.githubUrl ? (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-black hover:text-blue-700"
                    >
                      Source Code
                    </a>
                  ) : (
                    <span className="underline">Source Code</span>
                  )}
                </div>

                {/* Technologies */}
                {proj.technologies && (
                  <div className="text-black mt-0.5">
                    <strong>Technologies: </strong>
                    <span>{proj.technologies}</span>
                  </div>
                )}

                {/* Highlights Bullets */}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-6 mt-0.5 space-y-0.5 text-black text-[12px] leading-[1.35]">
                    {proj.highlights.map((item, hIdx) => (
                      <li key={hIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDUCATION */}
      {education && education.length > 0 && (
        <div className="mb-3.5">
          <div className="font-bold text-[13px] text-black mb-1 uppercase">
            EDUCATION
          </div>
          <div className="text-[12px] text-black leading-[1.4]">
            {education.map((edu, idx) => (
              <div key={edu.id || idx}>
                <span>{edu.degree}</span>
                {edu.institution ? `-${edu.institution}` : ""}
                {edu.year ? ` (${edu.year})` : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LANGUAGE */}
      {languages && languages.length > 0 && (
        <div className="mb-2">
          <div className="font-bold text-[13px] text-black mb-1 uppercase">
            LANGUAGE
          </div>
          <ul className="list-disc list-outside ml-6 space-y-0.5 text-[12px] leading-[1.4] text-black">
            {languages.map((lang, idx) => (
              <li key={lang.id || idx}>
                {lang.name}: {lang.proficiency}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
