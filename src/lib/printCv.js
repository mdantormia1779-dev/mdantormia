/**
 * Utility to reliably print the CV document in pure A4 format
 * without any dashboard layout interference, clipping, or dark backgrounds.
 */
export function printCvDocument(elementId = "printable-cv-area") {
  const printElement = document.getElementById(elementId);
  if (!printElement) {
    window.print();
    return;
  }

  // Look for existing print iframe or create a new one
  let iframe = document.getElementById("cv-hidden-print-iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = "cv-hidden-print-iframe";
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);
  }

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Md Antor Mia - CV</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm 16mm;
          }
          *, *::before, *::after {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 11.5px;
            line-height: 1.45;
          }
          a {
            color: #000000 !important;
            text-decoration: underline !important;
          }
          ul {
            margin: 2px 0 3px 0 !important;
            padding-left: 20px !important;
            list-style-type: disc !important;
          }
          li {
            margin-bottom: 2px !important;
            line-height: 1.35 !important;
          }
          p {
            margin: 2px 0 !important;
          }
          .cv-paper {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
        </style>
      </head>
      <body>
        <div class="cv-paper">
          ${printElement.innerHTML}
        </div>
      </body>
    </html>
  `);
  doc.close();

  // Give the browser time to layout before calling print
  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 250);
}
