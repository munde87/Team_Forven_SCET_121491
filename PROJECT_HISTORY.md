# SANKALAN AI — Mining Intelligence & Reporting Platform
## Project Analysis & Progress History Record

---

### Executive Overview

**SANKALAN AI** is an enterprise/sovereign-grade **Mining Intelligence & Automated Reporting Platform** engineered for processing heterogeneous mining documentation, geological archives, operational data, and statutory filings. The application provides an evidence-linked Multimodal Retrieval-Augmented Generation (RAG) system, deep document intelligence, automated sovereign report compilation, and domain topic/entity analytics.

This document serves as a complete history record of the project's vision, technical architecture, completed milestones, components, data flows, and current operational state.

---

### Technical Architecture & Design System

1. **Technology Stack:**
   - **Frontend Framework:** React 19 (`react`, `react-dom`) with Vite 6 build system.
   - **Routing:** React Router v7 (`react-router-dom`).
   - **Styling & Aesthetics:** Tailwind CSS v3 with PostCSS and custom color design tokens reflecting an enterprise industrial/government aesthetic (Dark Slate, Sovereign Charcoal, Industrial Navy, Amber Gold accents, and Glassmorphism surfaces).
   - **Icons & Visuals:** Lucide React icons (`lucide-react`) and Google Material Symbols Outlined.
   - **Data Visualization:** Recharts (`recharts`) for trend analysis, yield curves, and topic distribution charts.
   - **Animations:** Framer Motion (`framer-motion`) and CSS transitions for pipeline processing feedback.
   - **State Persistence:** Custom React Context (`AppContext.jsx`) with `localStorage` synchronization for documents, reports, and query histories.

2. **Core Architectural Principles:**
   - **Evidence First:** Every AI answer and report section is backed by verified source citations (Document ID, Page Number, Section, Bounding Box coordinates, and Audit Trace).
   - **Retrieval Verification Layer:** Prevents hallucination by scoring candidate chunks against query intent and explicit metadata filters, marking candidates as `VERIFIED` or `REJECTED`.
   - **Multimodal Stratigraphy:** Handles text narrative, numeric tables, visual figures/maps, and domain entities (mines, seams, equipment, locations, incidents).

---

### Key Modules & Completed Implementations

#### 1. Global Navigation & Layout Shell
- **`AppShell.jsx`**: Wrapper providing structured navigation layout across all platform modules.
- **`Navbar.jsx`**: Top header featuring active page indicator, quick action buttons (*Upload Document*, *Generate Report*), search triggers, and platform status.
- **`Sidebar.jsx`**: Left navigation drawer with clean iconography for seamless switching between modules.
- **`Toast.jsx`**: Non-intrusive floating toast notifications for user action feedback.

#### 2. Landing Page (`LandingPage.jsx`)
- Executive entry point introducing SANKALAN AI's vision and value proposition.
- Feature highlight grid covering Document Intelligence, Multimodal RAG, Verification Engine, and Automated Reports.
- Live pipeline workflow animation.
- Direct quick-start CTAs into the Dashboard and Query Workbench.

#### 3. Dashboard (`Dashboard.jsx`)
- Central command center displaying live operational KPIs:
  - *Total Documents Indexed*
  - *Mines/Sectors Covered*
  - *Evidence-linked Answers Generated*
  - *Reports Compiled & Approved*
- **Visual Architecture Pipeline:** Interactive 5-stage workflow visualizer (*Ingestion → Doc Intel → Multimodal RAG → Verification → AI Output*).
- **Recent Ingestion Activity Feed:** Status indicators for latest uploaded reports.
- **Recent Reports Table:** Quick preview and access to newly generated intelligence reports.

#### 4. Multimodal AI Query Workbench (`AIQueryPage.jsx`)
- Natural language query input with preset mining queries (*Safety issues, Geological exploration, Opencast production trends*).
- Multi-dimensional filtering (*Mine Sector, Subsidiary, Year, Document Type, Topic*).
- **Stage-by-Stage Pipeline Simulator:**
  1. *Query Intent Understanding*
  2. *Hybrid Keyword + Dense Vector Retrieval*
  3. *Cross-Encoder Reranking*
  4. *Retrieval Verification (Audit Check)*
  5. *Grounded Answer Generation*
- **Evidence Cards & Verification Badges:** Displays verified candidates alongside rejected candidate chunks (demonstrating anti-hallucination capabilities).
- **Source Citation Drawer Integration:** Allows clicking any evidence card to open the precise document page and bounding box preview.

#### 5. Sovereign Document Library (`DocumentsPage.jsx`)
- Central repository for all ingested documents with search, sorting, and metadata filtering.
- Displays file types (PDF, XLSX, CSV), page counts, extracted tables/figures, SHA-256 hashes, and index statuses.
- **Upload Modal (`UploadModal.jsx`):** Drag-and-drop uploader supporting PDF, DOCX, XLSX, and CSV files.
- **Multi-Stage Processing Simulator (`mockProcessing.js`):** Simulates real-time 8-stage document processing (*File Hashing → Spatial OCR → Layout Analysis → Table Extraction → Entity Enrichment → Chunking → Vector Embedding → Indexing*).

#### 6. Deep Document Intelligence Workbench (`DocumentIntelligencePage.jsx`)
- Split-screen document inspection tool:
  - **Left Pane:** Visual source page canvas preview with official stamp and metadata bounding boxes.
  - **Right Pane:** Multi-tab extracted intelligence viewer:
    - *OCR Text Stream*
    - *Layout Bounding Boxes*
    - *Table Stratigraphy & Numeric Datasets*
    - *Figures & Map Captions*
    - *Mining Domain Entity Explorer* (Mines, Seams, Machinery, Locations)
    - *Topic & Keyword Tags*

#### 7. Automated Report Generator & Library (`ReportsPage.jsx`)
- Library of finalized intelligence reports (*Mine Safety Reviews, Production Summaries, Geological Summaries, Management Briefs*).
- **Report Generation Wizard (`ReportWizardModal.jsx`):** Multi-step configuration modal selecting report type, target mine, time horizon, and data sources.
- **Live Compilation Stepper (`mockReports.js`):** Simulates multi-stage generation (*RAG Querying → Source Passage Retrieval → Dual-Key Verification → Chart/Yield Curve Rendering → Document Composition*).
- **Interactive A4 Report Preview:** In-app formatted document complete with Executive Summary, Key Findings bullet points, interactive Recharts visualizations, and cited source footers.

#### 8. Mining & Topic Intelligence Analytics (`MiningIntelligencePage.jsx`)
- Strategic intelligence dashboard featuring:
  - **Topic Distribution & Keyword Clouds:** Frequency ranking of key operational terms (*Slope Stability, Overburden Removal, DGMS Guidelines, Dewatering*).
  - **Year-over-Year Production & Safety Trend Charts:** Recharts bar and line graphs comparing performance across FY 2022–23, 2023–24, and 2024–25.
  - **Entity Explorer:** Deep filterable view categorizing extracted entities into *Mines, Seams, Equipment, Incidents, and Locations*.
  - **Filtered Document Match List:** Clickable entity tags that isolate related historical records.

#### 9. Common Components & Services
- **`SourceViewerDrawer.jsx`**: Slide-over drawer demonstrating target snippet bounding boxes and an expandable *"Why this answer?"* retrieval trace.
- **`AppContext.jsx`**: Global React Context managing persistent state across sessions via `localStorage` keys:
  - `sankalan-ai_documents`
  - `sankalan-ai_reports`
  - `sankalan-ai_queries`

---

### Summary of Completed Workspace Files

```
SANKALAN AI/
├── package.json                        # Dependencies (React 19, Vite 6, Tailwind, Lucide, Recharts, Framer Motion)
├── vite.config.js                      # Vite build setup
├── tailwind.config.js                  # Custom design tokens & theme customization
├── prd_demo_frontend.txt               # Frontend Demo Specification PRD
├── prd_technical.txt                   # Technical Product Architecture PRD
├── PROJECT_HISTORY.md                  # Detailed Project Analysis & History Record (This File)
└── src/
    ├── App.jsx                         # Main Router & Provider setup
    ├── main.jsx                        # React entry point
    ├── index.css                       # Global Tailwind CSS & custom utility classes
    ├── context/
    │   └── AppContext.jsx              # Global state manager with localStorage persistence
    ├── services/
    │   ├── mockProcessing.js           # 8-Stage document ingestion engine
    │   ├── mockRag.js                  # Multi-stage RAG & Retrieval Verification engine
    │   └── mockReports.js              # 5-Stage report generation engine
    ├── data/
    │   ├── documents.js                # Initial mock document catalog
    │   ├── chunks.js                   # Mock retrieval candidates & answer templates
    │   ├── reports.js                  # Initial mock generated reports
    │   ├── entities.js                 # Mining entity ontology dataset
    │   └── miningData.js               # Performance & safety analytics datasets
    ├── components/
    │   ├── layout/
    │   │   ├── AppShell.jsx            # Platform layout container
    │   │   ├── Navbar.jsx              # Header with quick actions
    │   │   └── Sidebar.jsx             # Left navigation panel
    │   ├── common/
    │   │   ├── SourceViewerDrawer.jsx  # Slide-over document page & citation drawer
    │   │   └── Toast.jsx               # Floating toast notification
    │   ├── documents/
    │   │   └── UploadModal.jsx         # Document upload modal with stage progress
    │   └── reports/
    │       └── ReportWizardModal.jsx   # Report generator wizard modal
    └── pages/
        ├── LandingPage.jsx             # Public landing page
        ├── Dashboard.jsx               # Operations dashboard & pipeline overview
        ├── AIQueryPage.jsx             # Multimodal RAG query workbench
        ├── DocumentsPage.jsx           # Sovereign document repository
        ├── DocumentIntelligencePage.jsx # Deep document analysis page
        ├── ReportsPage.jsx             # Automated reports library & reader
        └── MiningIntelligencePage.jsx  # Topic & entity analytics workbench
```

---

### Verification & Current Application State

- **Build & Compilation:** Evaluated and verified clean bundle compilation with Vite.
- **Interactivity:** All core CTAs, navigation flows, modal openings, drawer slide-overs, report wizard steps, upload progress bars, and RAG query executions function deterministically.
- **Data Persistence:** Uploading new documents or generating reports immediately persists to browser `localStorage` and updates the global Dashboard KPIs.

---

### Future Enhancement Roadmap (Backend Integration)

1. **Production Backend Connectors:** Replace mock services (`mockProcessing.js`, `mockRag.js`, `mockReports.js`) with REST/gRPC API endpoints connected to PostgreSQL + pgvector and FastAPI microservices.
2. **vLLM Integration:** Connect the RAG pipeline to private on-premises LLM inference engines (e.g., Llama 3 / Mistral / Qwen models finetuned on mining/geological corpora).
3. **Real OCR & Layout Parser:** Integrate PaddleOCR / Tesseract / LayoutLM for live PDF parsing and bounding-box spatial extraction.
4. **Export Engine:** Add PDF/DOCX generation server hooks for exporting finalized reports.
