# GEOVANI — Research Background & Evidence Case Study

> **SIH26023 — AI-Powered Geological, Mining and other Reporting Solution for CMPDI/CIL subsidiaries**

---

## Executive Summary & Research Background

GEOVANI is designed as an evidence-first reporting intelligence platform for Smart India Hackathon Problem Statement SIH26023. The problem requires automation of geological, mining, production and administrative reporting from scanned PDFs, digital records, spreadsheets, images and historical archives. It also requires automated report generation, word cloud/topic identification and AI-based query-response capabilities.

---

## 1. Geological Document Intelligence

Research shows that generative AI, document parsing, OCR, table extraction and information retrieval can be used to digitize and search geological documents.

This supports GEOVANI's geological-report pipeline, which preserves source pages, extracts geological entities and enables source-grounded search.

**Relevant research:**
- [Advancing Geologic Document Digitalization and Information Retrieval with Generative AI](https://www.viridiengroup.com/sites/default/files/2025-02/advancing-geologic-document-digitalization-Information-retrieval-gen-ai-viridien-tle-article-feb-2025.pdf)
- [Semantic Information Extraction and Search of Mineral Exploration Data Using Text Mining and Deep Learning Methods](https://doi.org/10.1016/j.oregeorev.2024.105863)
- [Deep Learning-Based Mineral Exploration Named Entity Recognition](https://doi.org/10.1016/j.oregeorev.2024.106367)
- [Applications of Deep Learning for Mineral Exploration and Geological Data Analysis in Mining](https://gjeta.com/sites/default/files/fulltext_pdf/GJETA-2025-0209.pdf)

---

## 2. OCR Quality & Verification

Research proves OCR noise cascades into retrieval errors in RAG systems. GEOVANI mitigates this via:
- Bounding-box OCR score checks
- Source-page previews alongside extracted text
- Low-confidence review flags for human verification

**Relevant research:**
- [OCR Hinders RAG: Evaluating the Cascading Impact of OCR on Retrieval-Augmented Generation](https://openaccess.thecvf.com/content/ICCV2025/papers/Zhang_OCR_Hinders_RAG_Evaluating_the_Cascading_Impact_of_OCR_on_ICCV_2025_paper.pdf)
- [When Good OCR Is Not Enough: Benchmarking OCR Robustness for Retrieval-Augmented Generation](https://aclanthology.org/2026.acl-industry.60/)
- [StruNRAG: Evaluation of OCR-Induced Structural Noise on RAG Robustness](https://aclanthology.org/2026.findings-acl.955.pdf)
- [Document Segmentation Matters for Retrieval-Augmented Generation](https://aclanthology.org/2025.findings-acl.422/)

---

## 3. Evidence-First RAG for Government & Parliamentary Queries

RAG must enforce strict permission checks and page citations before providing answers to government officers.

**Relevant research:**
- [Resource-efficient Retrieval-Augmented Question Answering for the Indian Lok Sabha Dataset](https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2026.1798021/full)
- [Gov-RAG: A Retrieval-Augmented Generation Framework for Enhancing E-Government Services](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5111865)
- [PolicyBot: Reliable Question Answering over Policy Documents](https://arxiv.org/abs/2511.13489)
- [IR 4.0 in Parliament: Conceptualising the Use of AI in Parliamentary Business](https://gaexcellence.com/ijlgc/article/view/2080)

---

## 4. NLP & Topic Analysis in Mining

Mining text contains recurring operational themes (production shortfall, safety, rainfall, equipment breakdown, land acquisition). TF-IDF and Neural Topic Modeling enable fast document clustering.

**Relevant research:**
- [Application of Natural Language Processing and Machine Learning for Analyzing Mining Accident Reports and Automating Root Cause Analysis](https://link.springer.com/article/10.1007/s40789-025-00822-0)
- [Research and Application of Intelligent Methods for Coal Mine Accident Cause Analysis](https://www.sciopen.com/article/10.16511/j.cnki.qhdxxb.2025.26.006)
- [BERTopic: Neural Topic Modeling with a Class-Based TF-IDF Procedure](https://arxiv.org/abs/2203.05794)

---

## 5. Coal and Mining AI Feasibility

AI-enabled platforms are actively being deployed across coal production and geological interpretation.

**Relevant research:**
- [Large Artificial Intelligence Models for Coal Mining](https://link.springer.com/article/10.1007/s12613-026-3492-8)
- [Utilization of Artificial Intelligence and Machine Learning in the Coal Mining Industry](https://pubs.aip.org/aip/acp/article-pdf/doi/10.1063/5.0240351/20291109/040002_1_5.0240351.pdf)
- [Development of an Intelligent Coal Production and Operation Management Platform](https://www.mdpi.com/1996-1073/17/20/5205)
- [A Review of the Use of AI in the Mining Industry: Insights and Ethical Considerations](https://www.sciencedirect.com/science/article/pii/S2214790X24000388)
