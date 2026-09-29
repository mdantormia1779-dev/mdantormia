/**
 * Utility to reliably print the CV document in pure A4 format
 * without any dashboard layout interference, clipping, dark backgrounds,
 * or unwanted browser headers/footers (date, URL, page number).
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
        <title></title>
        <style>
          /* Setting page margin to 0 hides browser headers (date/time) and footers (URL/page numbers) */
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
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 11px !important;
            line-height: 1.4 !important;
            -webkit-font-smoothing: antialiased;
          }
          .text-center {
            text-align: center !important;
          }
          .text-center * {
            text-align: center !important;
          }
          a {
            color: #000000 !important;
            text-decoration: underline !important;
          }
          ul {
            margin: 0 !important;
            padding-left: 20px !important;
            list-style-type: disc !important;
          }
          li {
            margin-bottom: 1.5px !important;
            line-height: 1.35 !important;
          }
          p {
            margin: 0 !important;
          }
          .cv-paper {
            width: 100% !important;
            max-width: 210mm !important;
            padding: 12mm 16mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
        </style>
      </head>
      <body>
        ${printElement.outerHTML}
      </body>
    </html>
  `);
  doc.close();

  // Give the browser 250ms to parse and layout before printing
  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 250);
}
