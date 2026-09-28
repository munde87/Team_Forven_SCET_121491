# SANKALAN AI — Demo Frontend PRD

*Complete UI/UX Specification for the SANKALAN AI React Shell.*

---

## 1. Overview & Goals

The SANKALAN AI frontend is a desktop-first, industrial enterprise application designed for mining executives, geological officers, and reviewers. It demonstrates the complete flow from file ingestion to RAG retrieval verification, evidence drawer inspection, and DOCX/PDF export.

---

## 2. Design System & Aesthetics

- **Color Palette:** Deep Slate/Navy shell (`#0F172A`), Obsidian Card Backgrounds (`#1E293B`),restrained Cyan (`#06B6D4`), Emerald Green (`#10B981`) for verified badges, and Amber (`#F59E0B`) for low-confidence warnings.
- **Typography:** Modern Sans-Serif (`Inter`, `Outfit`, or system stack).
- **Aesthetic Style:** Glassmorphism with subtle borders, micro-animations, active status indicators, and clean tabular layouts.

---

## 3. Key Navigation & Views

1. **Dashboard:**
   - Operational KPIs (Indexed Files, Mines Covered, Verified Q&A, Exported Reports).
   - Real-time pipeline visualizer (Ingestion → Intelligence → RAG → Verification → Output).
   - Recent activity & quick-action triggers.

2. **AI Query & Evidence Workbench:**
   - Natural language search composer with preset mining queries.
   - Faceted filters (Mine, Subsidiary, Year, Document Type).
   - Multi-step animation: Query Understanding → Hybrid Search → Cross-Encoder Reranking → Verification → Grounded Answer.
   - Evidence Cards with explicit source pages and "Why this answer?" provenance trace.

3. **Document Ingestion Workbench:**
   - Drag-and-drop file upload (PDF, XLSX, DOCX, maps).
   - Real-time processing stepper showing OCR, Layout Analysis, Table/Figure Parsing, Entity Enrichment, Chunking, and Embedding.

4. **Document Intelligence Inspector:**
   - Dual-pane layout: original page preview on left, extracted metadata, entities, and tables on right.

5. **Automated Report Studio:**
   - Pre-built templates (Mine Production Audit, Geological Assessment, Parliamentary Q&A Response).
   - One-click DOCX & PDF generation with embedded tables, findings, and evidence references.

6. **Mining Topic Intelligence:**
   - Word Cloud & ranked term lists for operational topics (Production, Safety, Ecology, Drilling, Breakdown).
   - Multi-year trend charts and subsidiary entity breakdown.
