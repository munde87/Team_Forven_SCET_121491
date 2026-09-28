# SANKALAN AI — Complete System Architecture & End-to-End User Flow Documentation

> **SIH26023 — AI-Powered Geological, Mining and other Reporting Solution for CMPDI/CIL subsidiaries**

---

## 🌟 Evaluator & Jury Elevator Pitch

> **"From user query to final answer, SANKALAN AI first retrieves the evidence, verifies it, generates a grounded response, and finally provides complete source traceability."**

---

## 🔄 End-to-End User Flow

### 📊 Presentation 7-Box Summary Flow
```text
Login → Dashboard → Query / Document → Hybrid Retrieval → Verify → AI Generate → Source-Linked Output
```

### ⚡ Core Processing Axiom
```text
Retrieve → Verify → Generate → Trace → Review
```

### 👤 User Perspective Step-by-Step Flow

1. **Login & RBAC Authentication**  
   User authenticates according to their role (CIL Administrator, CIL Analyst, Subsidiary Admin, Subsidiary Analyst, Geological Expert, Mining Engineer, Auditor/Viewer) with strict organization & mine isolation.

2. **Enterprise Dashboard**  
   User lands on the dashboard overview displaying indexed document metrics, active mine coverage, telemetry indicators, evidence pipeline status, and quick-action launchers.

3. **Ask / Upload / Request**  
   User asks natural language queries ("What is CIL's raw coal production for FY 2024-25 and its 5-year growth trajectory?"), uploads new statutory filings (PDF, Scanned Maps, DWG, XLSX, CSV), or requests automated statutory reports.

4. **AI Processing & Hybrid Retrieval**  
   System processes the input through multi-modal query routing: SQL structured database queries + BM25 keyword matching + pgvector dense vector embeddings + metadata filters.

5. **Retrieval Verification (Anti-Hallucination Audit)**  
   Retrieved evidence candidates are audited against strict relevance criteria, metadata match (Mine/Year/Subsidiary), temporal alignment, and historical conflict detection. Insufficient or conflicting evidence triggers abstention or clarification.

6. **Private AI Response Generation**  
   Verified evidence context is passed to the local private vLLM engine, which synthesizes a grounded answer with page-level bounding box citations and zero hallucination.

7. **Source Traceability & Human-in-the-Loop Review**  
   Answers and generated report drafts render exact document, page number, section, and year references. Important report outputs undergo domain expert review (Approve / Edit / Regenerate) before final release.

---

## 🏗️ 12-Layer Enterprise Platform Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SANKALAN AI PLATFORM                              │
│             AI-Powered Geological, Mining & Reporting Intelligence          │
└─────────────────────────────────────────────────────────────────────────────┘

 USERS (CIL Admin • Subsidiary Admin • Analyst • Geological Expert • Auditor)
   │
   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. ACCESS & SECURITY LAYER                                                  │
│ Login / SSO • Identity Management • RBAC Authorization • Tenant Isolation    │
│ API Gateway • Rate Limiting • Session Management • Audit Logging            │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. APPLICATION SERVICES LAYER                                              │
│ Query Service • Document Service • Report Service • Organization Service    │
│ Data Service • Notification Service • Metadata & Audit Services             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. DATA INGESTION & CONNECTIVITY LAYER                                      │
│ PDF Reports • Scanned Docs • Excel/CSV • Word • Geological Maps & Images    │
│ Historical Archives • SAP/ERP Secure API/Batch • Ingestion Queue & Sync     │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. DOCUMENT INTELLIGENCE LAYER                                              │
│ OCR • Spatial Layout Parsing • Table Extraction • Image/Map Parsing         │
│ Document Structure • Metadata Extraction • Domain Entity Tagging • Quality  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 5. KNOWLEDGE BUILDING LAYER                                                 │
│ Semantic Chunking • Chunk Enrichment • Multimodal Embeddings (Text/Table/Map)│
│ Open Knowledge Framework (Documents ↔ Mines ↔ Topics ↔ Entities)           │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 6. KNOWLEDGE STORAGE LAYER                                                  │
│ PostgreSQL (Metadata/SAP/Users) • pgvector (HNSW Vectors) • S3 Raw Storage  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 7. QUERY PROCESSING & HYBRID RETRIEVAL                                      │
│ Intent & Entity Extraction • Metadata Filtering • Hybrid Engine             │
│ (Structured SQL Search + BM25 Keyword Search + Dense Vector Similarity)      │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 8. RETRIEVAL VERIFICATION LAYER (ANTI-HALLUCINATION AUDIT)                 │
│ Query Relevance • Source Validity • Metadata Match • Conflict Detection     │
│ Decision: VERIFIED → Continue to LLM | INSUFFICIENT → Abstain / Re-retrieve │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                       ┌───────────┴────────────┐
                       │                        │
                    VERIFIED                 INSUFFICIENT
                       │                        │
                       ▼                        ▼
┌───────────────────────────────┐       More Retrieval /
│ 9. PRIVATE AI / LLM LAYER     │       Clarification /
│ Prompt Builder • Context Ctrl │       Abstention
│ Private vLLM Engine           │
└───────────────┬───────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 10. GROUNDED GENERATION & INTELLIGENCE MODULES                              │
│ Natural Language Search • AI Report Drafting • Topic & Keyword Cloud        │
│ Mining Intelligence & Production Telemetry                                  │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 11. HUMAN-IN-THE-LOOP CONTROL                                                │
│ Domain Expert Review → APPROVE / MODIFY / REJECT (Regenerate Workflow)       │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 12. OUTPUT & SOURCE TRACEABILITY                                             │
│ Grounded AI Answer • Page/Section Bounding Box • PDF/DOCX Export • Audit    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔌 Backend Services Breakdown & Storage Tier Mapping

```text
SANKALAN AI BACKEND TOPOLOGY
│
├── API Gateway Service (Rate Limiting, Auth Dispatch, Route Handling)
├── Authentication & Identity Service (Login, Token, Session, Identity)
├── Authorization Service (RBAC, Organization Access, Subsidiary Scope, Mine Scope)
├── User & Organization Service (Tenant Isolation, Profile Settings)
├── Document Management Service (Upload, Versioning, Metadata, Access Control)
├── Ingestion Gateway Service (Queue, Redis Job Orchestration, Duplicate Check)
├── Document Intelligence Service (Spatial OCR, Table Layout, Entity Extraction)
├── Knowledge & Vector Service (Semantic Chunking, Multimodal Embeddings, Graph)
├── Hybrid Retrieval Engine (SQL Query, BM25 Keyword, Vector Similarity)
├── Reranking Engine (Cross-Encoder Scoring, Temporal Alignment)
├── Verification Service (Relevance, Source Integrity, Conflict Audit)
├── Private LLM Orchestrator (vLLM Client, Guardrails, Context Trimming)
├── Report Studio Service (Template Rendering, Chart Engine, DOCX/PDF Export)
├── Mining Intelligence & Analytics Service (Telemetry & Operational KPIs)
└── Audit & Traceability Service (Immutable Provenance Ledger)
```

### 🗄️ Storage Tier Architecture

```text
                             STORAGE LAYER
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
   OBJECT STORAGE        POSTGRESQL           PGVECTOR
   (AES-256 S3)          (Relational)        (Vector DB)
          │                   │                   │
          │                   ├── Users           ├── Text Embeddings
          │                   ├── Roles           ├── Table Embeddings
          │                   ├── Organizations   ├── Image Embeddings
          │                   ├── Documents       ├── Map Embeddings
          │                   ├── Metadata        └── Chunk Vectors
          │                   ├── Mine Data
          │                   ├── SAP Data
          │                   ├── Topics
          │                   └── Audit Trail
          ▼
 Raw Files: PDF, DOCX, XLSX, CSV, PNG, JPG, DWG
```

---

## ⚡ Specialized Sub-System Pipelines

### 1. SAP / ERP Data Ingestion Flow
```text
SAP / ERP / Mine Systems ──► Secure Connector ──► API / Batch Sync ──► Data Mapping ──► Validation & Transformation ──► PostgreSQL Structured Store
```

### 2. Multi-Modal Query Classifier & Evidence Fusion
```text
USER QUERY ──► QUERY CLASSIFIER
                  ├── Structured Query ──► SQL Execution
                  ├── Document Query   ──► Vector & Keyword Retrieval (RAG)
                  └── Mixed Query      ──► SQL + RAG Fusion ──► Verification ──► vLLM Engine
```

### 3. Automated Statutory Report Generation Workflow
```text
Report Request ──► Template Selection ──► Query/Evidence Retrieval ──► Verification ──► Data Context Assembly ──► Private vLLM Drafting ──► Citation Bounding Box ──► Human Review ──► PDF/DOCX Export
```

### 4. Anti-Hallucination Retrieval Verification Branching Logic
```text
Query + Candidate Chunks ──► RETRIEVAL VERIFICATION
                                ├── Strong Evidence ─────► LLM Generation (Grounded Answer)
                                ├── Weak Evidence ───────► Secondary Retrieval Pass
                                ├── Conflicting Data ────► Flag Conflict & Display Comparison
                                └── No Evidence ─────────► Abstain / Ask User Clarification
```

---

## 🛡️ Cross-Cutting Governance Controls

- **End-to-End Encryption**: AES-256 for resting object storage and TLS 1.3 for in-transit network calls.
- **Subsidiary-Level RBAC**: Multi-tenant data partition ensuring ECL, BCCL, CCL, NCL, WCL, SECL, MCL, and CMPDI records remain strictly isolated.
- **SHA-256 File Checksums**: Every document is hashed upon upload to prevent tampering and guarantee legal audit compliance.
- **Immutable Provenance Trail**: Every AI response stores an audit record linking the prompt, generated answer, exact source document ID, page number, bounding box coordinates, and reviewer timestamp.
