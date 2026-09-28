import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, WidthType } from "docx";

/**
 * Downloads a DOM element as a formatted PDF using html2canvas & jsPDF.
 */
export const downloadReportAsPDF = async (reportElementId, reportTitle = "Sankalan_AI_Report") => {
  try {
    const element = document.getElementById(reportElementId);
    if (!element) {
      console.error(`Element #${reportElementId} not found for PDF export.`);
      return false;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const cleanFilename = `${reportTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
    pdf.save(cleanFilename);
    return true;
  } catch (err) {
    console.error("PDF generation failed:", err);
    return false;
  }
};

/**
 * Generates and downloads a structured DOCX file from report object data.
 */
export const downloadReportAsDOCX = async (reportData, reportTitle = "Sankalan_AI_Report") => {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "SANKALAN AI — MINING INTELLIGENCE PLATFORM",
              heading: HeadingLevel.HEADING_1,
              spacing: { after: 120 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Sovereign Energy & Mining Intelligence System", italic: true, color: "555555" })
              ],
              spacing: { after: 240 }
            }),
            new Paragraph({
              text: reportData.title || reportTitle,
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 200 }
            }),

            // Metadata Block
            new Paragraph({
              children: [
                new TextRun({ text: `Organization: `, bold: true }),
                new TextRun({ text: `${reportData.subsidiary || reportData.organization || 'Coal India Limited'}\n` }),
                new TextRun({ text: `Reporting Period: `, bold: true }),
                new TextRun({ text: `${reportData.period || 'FY 2024–25'}\n` }),
                new TextRun({ text: `Report Type: `, bold: true }),
                new TextRun({ text: `${reportData.type || 'General Intelligence'}\n` }),
                new TextRun({ text: `Generated At: `, bold: true }),
                new TextRun({ text: `${reportData.createdAt || new Date().toISOString().split("T")[0]}\n` })
              ],
              spacing: { after: 300 }
            }),

            // Executive Summary
            new Paragraph({
              text: "EXECUTIVE SUMMARY",
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 200, after: 120 }
            }),
            new Paragraph({
              children: [
                new TextRun({ text: reportData.executiveSummary || "No summary available." })
              ],
              spacing: { after: 300 }
            }),

            // Key Findings
            new Paragraph({
              text: "KEY FINDINGS & AUDIT OBSERVATIONS",
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 200, after: 120 }
            }),
            ...(reportData.keyFindings || []).map(
              (finding) =>
                new Paragraph({
                  bullet: { level: 0 },
                  children: [new TextRun({ text: finding })],
                  spacing: { after: 80 }
                })
            ),

            // Sources & Evidence Section
            new Paragraph({
              text: "SOURCES & CITED EVIDENCE",
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 300, after: 120 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "[1] Statutory Safety & Operations Review — Page 42 (Section 3.2 — Slope Stability)",
                  italic: true
                })
              ],
              spacing: { after: 80 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "[2] Opencast Operational Dispatch Summary — Page 18 (Section 4.1 — Haul Road & Logistics)",
                  italic: true
                })
              ],
              spacing: { after: 300 }
            }),

            // Prototype Disclaimer
            new Paragraph({
              children: [
                new TextRun({
                  text: "DISCLAIMER: Prototype demonstration using sample data. Not an official CIL/CMPDI report.",
                  bold: true,
                  color: "888888"
                })
              ],
              spacing: { before: 400 }
            })
          ]
        }
      ]
    });

    const blob = await Packer.toBlob(doc);
    const cleanFilename = `${reportTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}.docx`;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = cleanFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    return true;
  } catch (err) {
    console.error("DOCX generation failed:", err);
    return false;
  }
};
