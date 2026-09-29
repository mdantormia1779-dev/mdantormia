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
      className="cv-paper"
      style={{
        width: "100%",
        maxWidth: "210mm",
        boxSizing: "border-box",
        padding: "12mm 16mm 10mm 16mm",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "14px",
        lineHeight: "1.42",
        color: "#000000",
        backgroundColor: "#ffffff",
        margin: "0 auto",
      }}
    >
      {/* HEADER SECTION (ALWAYS CENTERED) */}
      <div
        className="text-center"
        style={{
          textAlign: "center",
          width: "100%",
          margin: "0 auto 11px auto",
        }}
      >
        <h1
          style={{
            fontSize: "21px",
            fontWeight: "bold",
            color: "#000000",
            margin: "0 0 2px 0",
            textAlign: "center",
            lineHeight: "1.2",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {personalInfo.fullName || "Md Antor Mia"}
        </h1>
        <div
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            color: "#000000",
            margin: "0 0 2px 0",
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {personalInfo.title || "MERN Stack Developer"}
        </div>

        {/* Contact info line: +8801318964063 | mdantormia1779@gmail.com| Rangpur,Bangladesh */}
        <div
          style={{
            fontSize: "13px",
            color: "#000000",
            margin: "2px 0",
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <span>{personalInfo.phone || "+8801318964063"}</span>
          <span> | </span>
          <a
            href={`mailto:${personalInfo.email || "mdantormia1779@gmail.com"}`}
            style={{ color: "#000000", textDecoration: "none" }}
            className="hover:underline"
          >
            {personalInfo.email || "mdantormia1779@gmail.com"}
          </a>
          <span>| </span>
          <span>{personalInfo.location || "Rangpur,Bangladesh"}</span>
        </div>

        {/* Links line: GitHub | Portfolio | Linkedin (underlined text, no icons) */}
        <div
          style={{
            fontSize: "13px",
            color: "#000000",
            margin: "2px 0",
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          {personalInfo.github ? (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#000000", textDecoration: "underline" }}
            >
              GitHub
            </a>
          ) : (
            <span style={{ textDecoration: "underline" }}>GitHub</span>
          )}
          <span> | </span>
          {personalInfo.portfolio ? (
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#000000", textDecoration: "underline" }}
            >
              Portfolio
            </a>
          ) : (
            <span style={{ textDecoration: "underline" }}>Portfolio</span>
          )}
          <span> | </span>
          {personalInfo.linkedin ? (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#000000", textDecoration: "underline" }}
            >
              Linkedin
            </a>
          ) : (
            <span style={{ textDecoration: "underline" }}>Linkedin</span>
          )}
        </div>
      </div>

      {/* CAREER OBJECTIVE */}
      <div style={{ marginBottom: "11px", textAlign: "left" }}>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "15px",
            color: "#000000",
            marginBottom: "2px",
          }}
        >
          Career Objective
        </div>
        <p style={{ margin: 0, textAlign: "justify", lineHeight: "1.42" }}>
          {objective ? (
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
        <div style={{ marginBottom: "11px", textAlign: "left" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              color: "#000000",
              marginBottom: "2px",
            }}
          >
            Professional Experience
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {experiences.map((exp, idx) => (
              <p key={exp.id || idx} style={{ margin: 0, lineHeight: "1.4" }}>
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
        <div style={{ marginBottom: "11px", textAlign: "left" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              color: "#000000",
              marginBottom: "2px",
            }}
          >
            Technical Skill
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              listStyleType: "disc",
              display: "flex",
              flexDirection: "column",
              gap: "1.5px",
            }}
          >
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
        <div style={{ marginBottom: "11px", textAlign: "left" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              color: "#000000",
              marginBottom: "2px",
            }}
          >
            Projects:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                {/* Project Title and Links line */}
                <div>
                  <strong style={{ fontWeight: "bold" }}>{proj.name}</strong>{" "}
                  {proj.liveUrl ? (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#000000", textDecoration: "underline" }}
                    >
                      Live link
                    </a>
                  ) : (
                    <span style={{ textDecoration: "underline" }}>Live link</span>
                  )}{" "}
                  |{" "}
                  {proj.githubUrl ? (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#000000", textDecoration: "underline" }}
                    >
                      Source Code
                    </a>
                  ) : (
                    <span style={{ textDecoration: "underline" }}>Source Code</span>
                  )}
                </div>

                {/* Technologies */}
                {proj.technologies && (
                  <div style={{ margin: "1px 0" }}>
                    <strong>Technologies: </strong>
                    <span>{proj.technologies}</span>
                  </div>
                )}

                {/* Highlights Bullets */}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul
                    style={{
                      margin: "2px 0 0 0",
                      paddingLeft: "20px",
                      listStyleType: "disc",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5px",
                    }}
                  >
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
        <div style={{ marginBottom: "11px", textAlign: "left" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              color: "#000000",
              marginBottom: "2px",
            }}
          >
            EDUCATION
          </div>
          <div>
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
        <div style={{ marginBottom: "2px", textAlign: "left" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              color: "#000000",
              marginBottom: "2px",
            }}
          >
            LANGUAGE
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              listStyleType: "disc",
              display: "flex",
              flexDirection: "column",
              gap: "1.5px",
            }}
          >
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
