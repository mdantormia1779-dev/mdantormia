/**
 * Generates clean, standalone A4 HTML representing the CV
 * with larger 13px font size and balanced line height to fill the bottom space
 * while strictly guaranteeing a 1-page A4 print.
 */
export function generateCvHtml(data) {
  const p = data?.personalInfo || {};
  const experiences = data?.experiences || [];
  const skills = data?.skills || {};
  const projects = data?.projects || [];
  const education = data?.education || [];
  const languages = data?.languages || [];

  const fullName = p.fullName || "Md Antor Mia";
  const title = p.title || "MERN Stack Developer";
  const phone = p.phone || "+8801318964063";
  const email = p.email || "mdantormia1779@gmail.com";
  const location = p.location || "Rangpur,Bangladesh";
  const github = p.github || "https://github.com/mdantormia1779-dev";
  const portfolio = p.portfolio || "https://mdantormia.vercel.app";
  const linkedin = p.linkedin || "https://linkedin.com/in/mdantormia";

  let objectiveHtml = data?.objective || "";
  if (!objectiveHtml) {
    objectiveHtml =
      "Motivated <strong>MERN Stack Developer</strong> with hands-on experience in React.js, Next.js, Node.js, and modern web technologies. Experienced in building responsive, scalable, and user-friendly applications. Seeking an opportunity to contribute to real-world projects while growing as a professional Full-Stack Developer.";
  } else if (objectiveHtml.includes("MERN Stack Developer")) {
    objectiveHtml = objectiveHtml.replace(
      "MERN Stack Developer",
      "<strong>MERN Stack Developer</strong>"
    );
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title></title>
        <style>
          /* Completely eliminate browser header (date/title) and footer (URL/pages) */
          @page {
            size: A4 portrait;
            margin: 0 !important;
          }
          *, *::before, *::after {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            font-family: Arial, Helvetica, sans-serif !important;
            -webkit-font-smoothing: antialiased;
            overflow: hidden !important;
          }
          .cv-container {
            width: 100% !important;
            max-width: 210mm !important;
            box-sizing: border-box !important;
            padding: 12mm 16mm 10mm 16mm !important;
            margin: 0 auto !important;
            background: #ffffff !important;
            color: #000000 !important;
            font-size: 14px !important;
            line-height: 1.42 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .header-center {
            text-align: center !important;
            margin-bottom: 11px !important;
            width: 100% !important;
          }
          .header-name {
            font-size: 21px !important;
            font-weight: bold !important;
            color: #000000 !important;
            margin: 0 0 2px 0 !important;
            text-align: center !important;
            line-height: 1.2 !important;
          }
          .header-title {
            font-size: 15px !important;
            font-weight: bold !important;
            color: #000000 !important;
            margin: 0 0 2px 0 !important;
            text-align: center !important;
          }
          .header-contact {
            font-size: 13px !important;
            color: #000000 !important;
            margin: 2px 0 !important;
            text-align: center !important;
          }
          .header-links {
            font-size: 13px !important;
            color: #000000 !important;
            margin: 2px 0 !important;
            text-align: center !important;
          }
          .section-title {
            font-weight: bold !important;
            font-size: 15px !important;
            color: #000000 !important;
            margin-top: 11px !important;
            margin-bottom: 2px !important;
            text-align: left !important;
          }
          a {
            color: #000000 !important;
            text-decoration: underline !important;
          }
          ul {
            margin: 2px 0 !important;
            padding-left: 20px !important;
            list-style-type: disc !important;
          }
          li {
            margin-bottom: 1.5px !important;
            line-height: 1.38 !important;
          }
          p {
            margin: 0 !important;
            line-height: 1.42 !important;
          }
        </style>
      </head>
      <body>
        <div class="cv-container">
          <!-- HEADER -->
          <div class="header-center">
            <div class="header-name">${fullName}</div>
            <div class="header-title">${title}</div>
            <div class="header-contact">
              <span>${phone}</span> | <a href="mailto:${email}" style="text-decoration:none;">${email}</a>| <span>${location}</span>
            </div>
            <div class="header-links">
              <a href="${github}" target="_blank">GitHub</a> | 
              <a href="${portfolio}" target="_blank">Portfolio</a> | 
              <a href="${linkedin}" target="_blank">Linkedin</a>
            </div>
          </div>

          <!-- CAREER OBJECTIVE -->
          <div>
            <div class="section-title" style="margin-top: 0;">Career Objective</div>
            <p style="text-align: justify; line-height: 1.42;">
              ${objectiveHtml}
            </p>
          </div>

          <!-- PROFESSIONAL EXPERIENCE -->
          ${
            experiences.length > 0
              ? `
            <div>
              <div class="section-title">Professional Experience</div>
              <div style="display: flex; flex-direction: column; gap: 5px;">
                ${experiences
                  .map(
                    (exp) => `
                  <p>
                    <strong>${exp.role}${
                      exp.typeOrCompany ? ` | ${exp.typeOrCompany}` : ""
                    }</strong>${exp.description ? ` — ${exp.description}` : ""}
                  </p>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }

          <!-- TECHNICAL SKILL -->
          <div>
            <div class="section-title">Technical Skill</div>
            <ul>
              ${
                skills.frontend
                  ? `<li><strong>Frontend:</strong> ${skills.frontend}</li>`
                  : ""
              }
              ${
                skills.backend
                  ? `<li><strong>Backend:</strong> ${skills.backend}</li>`
                  : ""
              }
              ${
                skills.programming
                  ? `<li><strong>Programming Languages:</strong> ${skills.programming}</li>`
                  : ""
              }
              ${skills.tools ? `<li><strong>Tools:</strong> ${skills.tools}</li>` : ""}
            </ul>
          </div>

          <!-- PROJECTS -->
          ${
            projects.length > 0
              ? `
            <div>
              <div class="section-title">Projects:</div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${projects
                  .map(
                    (proj) => `
                  <div>
                    <div>
                      <strong>${proj.name}</strong> 
                      ${
                        proj.liveUrl
                          ? `<a href="${proj.liveUrl}" target="_blank">Live link</a>`
                          : "<u>Live link</u>"
                      } | 
                      ${
                        proj.githubUrl
                          ? `<a href="${proj.githubUrl}" target="_blank">Source Code</a>`
                          : "<u>Source Code</u>"
                      }
                    </div>
                    ${
                      proj.technologies
                        ? `
                      <div style="margin: 1px 0;">
                        <strong>Technologies:</strong> ${proj.technologies}
                      </div>
                    `
                        : ""
                    }
                    ${
                      proj.highlights && proj.highlights.length > 0
                        ? `
                      <ul>
                        ${proj.highlights
                          .map((h) => `<li>${h}</li>`)
                          .join("")}
                      </ul>
                    `
                        : ""
                    }
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          `
              : ""
          }

          <!-- EDUCATION -->
          ${
            education.length > 0
              ? `
            <div>
              <div class="section-title">EDUCATION</div>
              <div>
                ${education
                  .map(
                    (edu) =>
                      `${edu.degree}${
                        edu.institution ? `-${edu.institution}` : ""
                      }${edu.year ? ` (${edu.year})` : ""}`
                  )
                  .join("<br />")}
              </div>
            </div>
          `
              : ""
          }

          <!-- LANGUAGE -->
          ${
            languages.length > 0
              ? `
            <div>
              <div class="section-title">LANGUAGE</div>
              <ul>
                ${languages
                  .map((lang) => `<li>${lang.name}: ${lang.proficiency}</li>`)
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }
        </div>
      </body>
    </html>
  `;
}

/**
 * Utility to reliably print the CV document in pure A4 format
 * without any dashboard layout interference, clipping, dark backgrounds,
 * or unwanted browser headers/footers (date, URL, page number).
 */
export function printCvDocument(cvDataOrElementId) {
  let htmlContent = "";

  if (typeof cvDataOrElementId === "object" && cvDataOrElementId !== null) {
    htmlContent = generateCvHtml(cvDataOrElementId);
  } else {
    const elementId =
      typeof cvDataOrElementId === "string"
        ? cvDataOrElementId
        : "printable-cv-area";
    const printElement = document.getElementById(elementId);
    if (!printElement) {
      window.print();
      return;
    }
    htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title></title>
          <style>
            @page {
              size: A4 portrait;
              margin: 0 !important;
            }
            *, *::before, *::after {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              width: 100% !important;
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              background: #ffffff !important;
              color: #000000 !important;
              font-family: Arial, Helvetica, sans-serif !important;
              -webkit-font-smoothing: antialiased;
            }
            .text-center { text-align: center !important; }
            .cv-paper {
              width: 100% !important;
              box-sizing: border-box !important;
              padding: 12mm 16mm 10mm 16mm !important;
              margin: 0 auto !important;
              background: #ffffff !important;
              color: #000000 !important;
              font-size: 14px !important;
              line-height: 1.42 !important;
            }
          </style>
        </head>
        <body>
          <div class="cv-paper">
            ${printElement.innerHTML}
          </div>
        </body>
      </html>
    `;
  }

  let iframe = document.getElementById("cv-hidden-print-iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = "cv-hidden-print-iframe";
    iframe.style.position = "fixed";
    iframe.style.left = "-9999px";
    iframe.style.top = "0";
    iframe.style.width = "210mm";
    iframe.style.height = "297mm";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
  } else {
    iframe.style.width = "210mm";
    iframe.style.height = "297mm";
  }

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(htmlContent);
  doc.close();

  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 300);
}
