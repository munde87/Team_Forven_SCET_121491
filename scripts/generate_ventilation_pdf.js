import fs from 'fs';
import path from 'path';
import { jsPDF } from 'jspdf';

const outputDir = path.resolve('public', 'sample-pdfs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy DOCX demo report to public/sample-pdfs/
const sourceDocx = path.resolve('Sankalan_AI_Demo_Mining_Report.docx');
const destDocx = path.join(outputDir, 'Sankalan_AI_Demo_Mining_Report.docx');
if (fs.existsSync(sourceDocx)) {
  fs.copyFileSync(sourceDocx, destDocx);
  console.log(`Copied DOCX demo report: ${destDocx}`);
}

// Build Ventilation & Safety PDF
const doc = new jsPDF();

// Header banner
doc.setFillColor(15, 23, 42); // Dark Slate
doc.rect(0, 0, 210, 38, 'F');

doc.setTextColor(245, 158, 11); // Amber Gold
doc.setFontSize(10);
doc.setFont("helvetica", "bold");
doc.text("SANKALAN AI DEMO — VENTILATION & SAFETY MONITORING REPORT", 15, 16);

doc.setTextColor(255, 255, 255);
doc.setFontSize(12);
doc.text("SYNTHETIC DEMONSTRATION DATA — Official Mine Record", 15, 28);

// 1. Document Metadata Table
doc.setFontSize(12);
doc.setTextColor(30, 58, 138);
doc.setFont("helvetica", "bold");
doc.text("1. Document Metadata", 15, 48);

doc.setFillColor(241, 245, 249);
doc.rect(15, 52, 180, 28, 'F');

doc.setFontSize(10);
doc.setTextColor(15, 23, 42);
doc.text("Mine: Demo Central Mine", 20, 60);
doc.text("Subsidiary: Demo Coal Subsidiary", 20, 67);
doc.text("Reporting Year: 2025", 20, 74);

doc.text("Topic: Ventilation & Safety Monitoring", 110, 60);
doc.text("Reference ID: SANKALAN-DEMO-002", 110, 67);
doc.text("Status: Verified Statutory Data", 110, 74);

// 2. Monitoring Summary
doc.setFontSize(12);
doc.setTextColor(30, 58, 138);
doc.setFont("helvetica", "bold");
doc.text("2. Monitoring Summary", 15, 90);

doc.setFontSize(10);
doc.setFont("helvetica", "normal");
doc.setTextColor(51, 65, 85);
doc.text("This demonstration dataset contains four monthly ventilation observations. Key variables include average airflow, maximum methane concentration and follow-up observations.", 15, 98, { maxWidth: 180 });

// 3. Ventilation Observations Table
doc.setFontSize(12);
doc.setTextColor(30, 58, 138);
doc.setFont("helvetica", "bold");
doc.text("3. Ventilation Observations Data Table", 15, 118);

// Table Headers
doc.setFillColor(226, 232, 240);
doc.rect(15, 122, 180, 10, 'F');
doc.setFontSize(10);
doc.setTextColor(15, 23, 42);
doc.text("Month", 20, 129);
doc.text("Avg. Airflow (m³/s)", 65, 129);
doc.text("Max Methane (%)", 115, 129);
doc.text("Follow-up Observations", 155, 129);

// Rows
const rows = [
  ["April", "18.4", "0.42%", "5"],
  ["May", "19.1", "0.38%", "4"],
  ["June", "18.7", "0.45% (Peak)", "6"],
  ["July", "19.5", "0.36%", "3"]
];

rows.forEach((r, idx) => {
  const y = 138 + idx * 10;
  if (idx % 2 === 1) {
    doc.setFillColor(248, 250, 252);
    doc.rect(15, y - 6, 180, 10, 'F');
  }
  doc.setFont("helvetica", "normal");
  doc.text(r[0], 20, y);
  doc.text(r[1], 75, y);
  doc.text(r[2], 125, y);
  doc.text(r[3], 170, y);
});

// 4. Demonstration Findings
let currentY = 185;
doc.setFontSize(12);
doc.setTextColor(30, 58, 138);
doc.setFont("helvetica", "bold");
doc.text("4. Demonstration Findings & Audit Observations", 15, currentY);

currentY += 8;
doc.setFontSize(10);
doc.setFont("helvetica", "normal");
doc.setTextColor(51, 65, 85);

const findings = [
  "Airflow increased from 18.4 m³/s in April to 19.5 m³/s in July.",
  "June recorded the highest maximum methane value at 0.45%.",
  "Follow-up observations decreased from 6 in June to 3 in July.",
  "These observations are synthetic and require expert validation before operational deployment."
];

findings.forEach((f) => {
  doc.text(`• ${f}`, 20, currentY);
  currentY += 8;
});

// 5. Traceability Metadata
currentY += 10;
doc.setDrawColor(203, 213, 225);
doc.line(15, currentY, 195, currentY);

currentY += 8;
doc.setFontSize(9);
doc.setFont("helvetica", "bold");
doc.setTextColor(100, 116, 139);
doc.text("Reference: SANKALAN-DEMO-002 | Year: 2025 | Topic: Ventilation & Safety | Status: Verified Synthetic Data", 15, currentY);

const pdfPath = path.join(outputDir, 'Sankalan_AI_Demo_Ventilation_Safety_Report.pdf');
fs.writeFileSync(pdfPath, Buffer.from(doc.output('arraybuffer')));
console.log(`Generated Ventilation PDF: ${pdfPath}`);
