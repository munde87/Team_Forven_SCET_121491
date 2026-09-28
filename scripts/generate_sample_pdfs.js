import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

const outputDir = path.resolve('public', 'sample-pdfs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function buildPDF(filename, title, subtitle, org, mine, date, summary, keyFindings) {
  const doc = new jsPDF();

  // Header banner
  doc.setFillColor(15, 23, 42); // Dark Slate
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(245, 158, 11); // Amber Gold
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("SANKALAN AI — SOVEREIGN MINING INTELLIGENCE PLATFORM", 15, 15);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(title.toUpperCase(), 15, 28);

  // Metadata block
  doc.setFillColor(241, 245, 249);
  doc.rect(15, 48, 180, 25, 'F');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(`Organization: ${org}`, 20, 56);
  doc.text(`Target Mine: ${mine}`, 20, 64);

  doc.text(`Document Date: ${date}`, 110, 56);
  doc.text(`Status: Official Statutory Filing`, 110, 64);

  // Section 1: Executive Summary
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text("1. EXECUTIVE SUMMARY & STATUTORY OVERVIEW", 15, 88);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);

  const splitSummary = doc.splitTextToSize(summary, 180);
  doc.text(splitSummary, 15, 96);

  let currentY = 96 + splitSummary.length * 6 + 10;

  // Section 2: Key Findings
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 58, 138);
  doc.text("2. KEY AUDIT FINDINGS & TELEMETRY OBSERVATIONS", 15, currentY);

  currentY += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);

  keyFindings.forEach((finding, idx) => {
    const splitFinding = doc.splitTextToSize(`${idx + 1}. ${finding}`, 175);
    doc.text(splitFinding, 20, currentY);
    currentY += splitFinding.length * 6 + 4;
  });

  currentY += 10;

  // Footer stamp
  doc.setDrawColor(203, 213, 225);
  doc.line(15, 270, 195, 270);
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("CONFIDENTIAL — FOR DEMO UPLOAD & REPORT GENERATION TESTING", 15, 276);
  doc.text(`Page 1 of 1 | Hash: sha256-${Math.random().toString(36).substring(2, 10)}`, 140, 276);

  const filePath = path.join(outputDir, filename);
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(filePath, pdfBuffer);
  console.log(`Successfully generated: ${filePath}`);
}

// 1. Safety Audit PDF
buildPDF(
  "Sample_Safety_Audit_2025.pdf",
  "Statutory Mine Safety Audit FY 2024-25",
  "Eastern Coalfields Limited — Safety Review",
  "ECL (Eastern Coalfields Limited)",
  "Rajmahal Opencast Sector B",
  "2025-02-15",
  "This statutory safety audit evaluates highwall bench stability, slope movement radar telemetry, methane gas monitoring, and haul road proximity warning compliance across Rajmahal Opencast Mine during FY 2024-25.",
  [
    "Highwall Slope Stability Radar (SSR-04) registered zero critical movement exceeding 1.0mm alarm threshold.",
    "Dual-sensor methane gas monitoring stations active across working faces with 99.8% continuous uptime.",
    "100% of Heavy Earth Moving Machinery (HEMM) dumpers retrofitted with proximity radar warnings.",
    "DGMS Grade A statutory compliance rating awarded with zero high-risk violations noted."
  ]
);

// 2. Production Summary PDF
buildPDF(
  "Sample_Production_Summary_2025.pdf",
  "Opencast Production & Excavation Review 2025",
  "Northern Coalfields Limited — Operational Report",
  "NCL (Northern Coalfields Limited)",
  "Jayant Mega Opencast Mine",
  "2025-02-20",
  "Annual operational evaluation covering raw coal extraction quotas, overburden stripping ratios, dragline uptime, and automated weighbridge rail dispatch loading at Jayant Mega Opencast Mine.",
  [
    "Total raw coal output achieved 22.4 Million Tonnes, surpassing the annual target quota by 4.8%.",
    "Overburden stripping volume reached 4.82 M Cu.M with average stripping ratio stabilizing at 1:2.84.",
    "42 Cu.M Dragline availability maintained above 91.2% with predictive vibration telemetry.",
    "Automated rail rake loading at siding dispatched an average of 58.4 rakes/day without demurrage."
  ]
);

// 3. Geological Exploration PDF
buildPDF(
  "Sample_Geological_Exploration_2025.pdf",
  "Geological Exploration & Borehole Core Assessment",
  "CMPDI — Exploration Technical Report",
  "CMPDI (Central Mine Planning & Design Institute)",
  "Jharia Coalfield Block B",
  "2025-02-25",
  "Detailed lithological core logging, seam correlation, 3D seismic block modeling, and ash grade estimations for Jharia deep coal seam horizons drilled down to 450 meters depth.",
  [
    "18 deep exploratory boreholes drilled down to 450m depth with average core recovery rate of 96.8%.",
    "Coal Seam VI intercepted at depth 384.2m with clean thick coal horizon of 14.2 meters.",
    "Proximate ash content evaluated at 24.5% (Grade G-11 thermal coal classification).",
    "Proven reserves increased by 1.4 Billion Tonnes based on 3D lithological block reconciliation."
  ]
);
