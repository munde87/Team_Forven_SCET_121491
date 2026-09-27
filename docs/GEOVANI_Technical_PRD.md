# GEOVANI — Technical Product Requirements Document (PRD)

*Production-oriented technical blueprint for the GEOVANI demo and future deployable system.*

---

## 1. Technical Objective

Define the technical architecture and implementation contract for GEOVANI: an evidence-first mining intelligence platform that ingests heterogeneous mining records and structured mine data, performs document intelligence and domain enrichment, creates multimodal retrieval representations, retrieves and verifies evidence, and exposes three outputs:
1. **AI Query & Evidence**
2. **Automated Report Generation**
3. **Document & Topic Intelligence**

The frontend demo may use mock services, while the architecture remains compatible with a future production backend.

---

## 2. System Architecture

```text
                                  ┌─────────────────────────────┐
                                  │          GEOVANI            │
                                  │ Mining Knowledge & Reporting│
                                  │        Intelligence         │
                                  └──────────────┬──────────────┘
                                                 │
                                                 ↓
                                  ┌─────────────────────────────┐
                                  │        DATA SOURCES         │
                                  └──────────────┬──────────────┘
                                                 │
                    ┌────────────────────────────┼────────────────────────────┐
                    ↓                            ↓                            ↓
              USER UPLOAD                     SAP                    EXISTING DATA
                    │                     Coal Mine Data                    │
                    │                            │                          │
        ┌───────────┼────────────┐              │                          │
        ↓           ↓            ↓              ↓                          ↓
      PDF/SCAN    EXCEL/CSV    WORD       SAP RECORDS                DATABASE
      IMAGE/MAP   REPORTS      DOCS
        │           │            │              │
        └───────────┴────────────┴──────────────┴──────────────────────────┘
                                      │
                                      ↓
                         ┌────────────────────────┐
                         │ FILE / DATA DETECTION  │
                         │ PDF • Scan • Excel     │
                         │ Word • Image • SAP     │
                         └────────────┬───────────┘
                                      │
                                      ↓
                    ┌────────────────────────────────┐
                    │     DOCUMENT INTELLIGENCE      │
                    └────────────────┬───────────────┘
                                     │
                ┌────────────────────┼────────────────────┐
                ↓                    ↓                    ↓
             TEXT                 TABLES             FIGURES / MAPS
                │                    │                    │
             OCR*              Table Extraction     Image Extraction
          Layout Parsing       Row/Column Data       Caption Detection
          Page Mapping         Table Metadata        Map Metadata
                │                    │                    │
                └────────────────────┼────────────────────┘
                                     │
                                     ↓
                         ┌────────────────────────┐
                         │    DOMAIN ENRICHMENT   │
                         ├────────────────────────┤
                         │ Mine • Subsidiary      │
                         │ Location • Year        │
                         │ Production • Equipment │
                         │ Seam • Geology         │
                         │ Topic • Keywords       │
                         └────────────┬───────────┘
                                      │
                                      ↓
                         ┌────────────────────────┐
                         │   SEMANTIC CHUNKING     │
                         └────────────┬───────────┘
                                      │
                 ┌────────────────────┼────────────────────┐
                 ↓                    ↓                    ↓
             TEXT CHUNKS         TABLE CHUNKS        IMAGE / MAP
                                                        REPRESENTATION
                 └────────────────────┼────────────────────┘
                                      │
                                      ↓
                         ┌────────────────────────┐
                         │ MULTIMODAL EMBEDDINGS  │
                         └────────────┬───────────┘
                                      │
                                      ↓
                         ┌────────────────────────┐
                         │      KNOWLEDGE STORE   │
                         └────────────┬───────────┘
                                      │
              ┌───────────────────────┼────────────────────────┐
              ↓                       ↓                        ↓
        ┌────────────┐          ┌────────────┐          ┌──────────────┐
        │ PostgreSQL │          │  pgvector  │          │Object Storage│
        ├────────────┤          ├────────────┤          ├──────────────┤
        │Structured  │          │Embeddings  │          │Original PDF  │
        │SAP Data    │          │Text Vectors│          │Excel / Word  │
        │Tables      │          │Image/Map   │          │Images / Maps │
        │Metadata    │          │Vectors     │          │Source Files  │
        │Topics      │          │Chunks      │          │              │
        └──────┬─────┘          └──────┬─────┘          └──────┬───────┘
               │                       │                       │
               └───────────────────────┼───────────────────────┘
                                       ↓
                            ┌──────────────────────┐
                            │  GEOVANI RETRIEVAL   │
                            │       ENGINE         │
                            └──────────┬───────────┘
                                       │
                                       ↓
                               ┌───────────────┐
                               │   USER / TASK │
                               └───────┬───────┘
                                       │
                                       ↓
                             ┌───────────────────┐
                             │ QUERY UNDERSTAND. │
                             └─────────┬─────────┘
                                       │
                 ┌─────────────────────┼─────────────────────┐
                 ↓                     ↓                     ↓
       ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────────┐
       │  MODULE 1        │  │   MODULE 2       │  │     MODULE 3        │
       │ AI QUERY &       │  │ AUTOMATED        │  │ TOPIC & KNOWLEDGE   │
       │ RESPONSE         │  │ REPORT GENERATION│  │ EXPLORER             │
       └────────┬─────────┘  └────────┬─────────┘  └──────────┬──────────┘
                │                     │                       │
                ↓                     ↓                       ↓
       Structured Query       Report Parameters         Keyword / Topic
       + Document Query       + Filters                 + Filters
                │                     │                       │
                ↓                     ↓                       ↓
       PostgreSQL +            PostgreSQL +            PostgreSQL +
       pgvector                pgvector                pgvector
                │                     │                       │
                ↓                     ↓                       ↓
       Exact Data +            Structured Data +        Frequency / TF-IDF
       Relevant Chunks         Relevant Chunks          Topics / Relations
                │                     │                       │
                └─────────────────────┼───────────────────────┘
                                      │
                                      ↓
                             ┌─────────────────┐
                             │ RELEVANT        │
                             │ EVIDENCE SET    │
                             └────────┬────────┘
                                      │
                                      ↓
                             ┌─────────────────┐
                             │      vLLM       │
                             │ PRIVATE LLM     │
                             │ INFERENCE SERVER│
                             └────────┬────────┘
                                      │
                    ┌─────────────────┼─────────────────────┐
                    ↓                 ↓                     ↓
             ┌─────────────┐   ┌──────────────┐    ┌────────────────┐
             │   ANSWER    │   │    REPORT    │    │    INSIGHTS    │
             │             │   │              │    │                │
             │ Query       │   │ DOCX / PDF   │    │ Topics         │
             │ Response    │   │ Charts       │    │ Trends         │
             │ Citation    │   │ Tables       │    │                │
             └──────┬──────┘   └───────┬──────┘    └───────┬────────┘
                    │                  │                    │
                    └──────────────────┼────────────────────┘
                                       ↓
                         ┌─────────────────────────┐
                         │ SOURCE TRACEABILITY     │
                         ├─────────────────────────┤
                         │ Document • Page • Year  │
                         │ Section • Source        │
                         └────────────┬────────────┘
                                      │
                                      ↓
                         ┌─────────────────────────┐
                         │      REACT DASHBOARD    │
                         ├─────────────────────────┤
                         │                         │
                         │  QUERY & RESPONSE       │
                         │  REPORT GENERATION      │
                         │  TOPIC / KNOWLEDGE      │
                         │  GRAPHS • TABLES        │
                         │  WORD CLOUD             │
                         │  SOURCE DOCUMENTS       │
                         │                         │
                         └────────────┬────────────┘
                                      │
                                      ↓
                              USER GETS RESULT
```

- **Original files:** Object Storage (S3 / MinIO).
- **Structured metadata, document records, extracted entities, chunks:** PostgreSQL.
- **Vector representations:** `pgvector` inside PostgreSQL.
- **Search:** Combine metadata filtering, full-text retrieval, and vector similarity.
- **LLM inference:** Private/on-prem vLLM for production; client/mock adapters for demo.

---

## 3. Ingestion & Document Intelligence Pipeline

1. **Upload & Checksum Validation:** Accept PDF, scanned maps, XLSX, DOCX files; validate MIME type and SHA-256 checksum.
2. **Layout Analysis & OCR:** Segment documents into headings, paragraphs, tables, and figures. Run bounding-box OCR with confidence scoring.
3. **Domain Entity Extraction:** Recognize Coalfields, Blocks, Seams, Boreholes, Drilling Depths, Production Figures (MT), Offtake, Equipment Status, and Environmental Clearance parameters.
4. **Semantic Chunking:** Section-aware chunking preserving section hierarchy, table headers, and figure captions.
5. **Embedding & Indexing:** Store vector representations alongside chunk metadata (`document_id`, `page_number`, `mine`, `subsidiary`, `year`, `confidence`).

---

## 4. Hybrid Retrieval & Verification Engine

```text
User Question + Subsidiary Context
              │
              ▼
Metadata Filtering (Mine, Year, Subsidiary)
              │
              ▼
Dual Retrieval (Vector Similarity + Full-Text Search)
              │
              ▼
Candidate Merging & Cross-Encoder Reranking
              │
              ▼
Verification Check (Source Page Exists? Metadata Matches? Conflict Present?)
              │
    ┌─────────┴─────────┐
    ▼                   ▼
Verified Candidates   Evidence Insufficient Flag
    │                   │
    ▼                   ▼
Grounded AI Answer    "Evidence Unavailable" Response
```

---

## 5. Storage Schema (Core Entities)

- `documents(document_id, title, type, mine, subsidiary, year, object_uri, status, checksum, created_at)`
- `document_pages(page_id, document_id, page_number, image_uri, text, ocr_status)`
- `chunks(chunk_id, document_id, page_id, section, content, content_type, metadata_json, embedding)`
- `entities(entity_id, document_id, type, value, page_id, confidence)`
- `queries(query_id, user_id, question, filters, answer, status, created_at)`
- `reports(report_id, type, filters, source_ids, status, artifact_uri, approved_by, created_at)`
- `audit_events(event_id, actor, action, resource_id, timestamp, details)`

---

## 6. Security & Confidentiality

- **Role-Based Access Control (RBAC):** Subsidiary-isolated data boundaries.
- **On-Premise Ready:** Zero data transmission outside governed boundaries for sensitive CIL records.
- **Audit Logging:** Immutably record query traces, document views, and report generation events.

---

## 7. Technical Definition of Done

- Every chunk and answer carries verifiable source provenance.
- Hybrid retrieval and reranking are strictly decoupled from LLM inference.
- Human review is required before final report sign-off.
- Zero unsupported hallucinated answers generated when evidence is missing.
