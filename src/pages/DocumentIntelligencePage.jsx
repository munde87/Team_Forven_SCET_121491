import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { useApp } from "../context/AppContext";
import { DOCUMENT_INTELLIGENCE_EXTRACTS } from "../data/entities";

export const DocumentIntelligencePage = () => {
  const location = useLocation();
  const { documents, setActiveSource } = useApp();
  
  const [selectedDocId, setSelectedDocId] = useState(
    location.state?.selectedDocId || documents[0]?.id || "doc-001"
  );
  
  const [activeTab, setActiveTab] = useState("ocr"); // ocr, tables, figures, entities, topics

  const doc = documents.find((d) => d.id === selectedDocId) || documents[0];
  const intel = DOCUMENT_INTELLIGENCE_EXTRACTS[doc?.id] || DOCUMENT_INTELLIGENCE_EXTRACTS["doc-001"];

  return (
    <AppShell>
      <div className="space-y-space-lg animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <span>Subsurface Document Vision</span>
              <span>•</span>
              <span className="text-primary font-bold">Spatial Extraction Workbench</span>
            </div>
            <h1 className="font-display-sm text-display-sm font-bold text-on-surface tracking-tight mt-0.5">
              Document Intelligence Workbench
            </h1>
          </div>

          <div className="flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm text-secondary font-bold">Select Document:</span>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="h-10 px-3 rounded-xl bg-surface-container-lowest border border-surface-container-highest font-body-sm text-on-surface shadow-sm"
            >
              {documents.map((d) => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-Column Split Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          
          {/* Left Column: Document Page Viewer Canvas */}
          <div className="lg:col-span-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm p-space-lg space-y-space-md flex flex-col justify-between">
            <div className="space-y-space-md">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high text-label-sm font-label-sm">
                <span className="font-bold text-on-surface">DOCUMENT CANVAS PREVIEW</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-bold">
                  Page 42 of {doc?.pages || 144}
                </span>
              </div>

              {/* Document Visual Preview Box */}
              <div className="relative bg-surface-container-low p-space-lg rounded-xl border border-surface-container-high font-mono text-body-sm text-on-surface overflow-hidden space-y-3">
                <div className="absolute right-3 top-3 border-2 border-primary/40 text-primary px-2 py-0.5 rotate-6 font-bold text-xs uppercase opacity-80">
                  CIL Govt Approved Archive
                </div>

                <p className="text-secondary font-sans font-bold text-label-sm uppercase">
                  {doc?.title}
                </p>
                <hr className="border-surface-container-high" />

                <p className="text-secondary">PROJECT: {doc?.subsidiary}</p>
                <p className="text-secondary">HASH: {doc?.hash?.slice(0, 32)}...</p>

                <div className="p-space-md rounded-lg bg-surface-container border-2 border-primary/40 shadow-sm relative">
                  <span className="absolute -top-3 left-3 px-2 py-0.5 rounded bg-primary text-on-primary font-sans font-bold text-[10px] uppercase">
                    BOUNDING BOX [X: 120, Y: 340, W: 580, H: 90]
                  </span>
                  <p className="font-body-md text-body-md font-semibold text-on-surface italic pt-1">
                    "Composite raw coal output across Western and Southern open pit sectors reached 8.42 Million Metric Tonnes (MT), representing a +7.8% gain year-over-year."
                  </p>
                </div>

                <p className="text-secondary">OCR Engine Confidence: {doc?.ocrConfidence}</p>
              </div>
            </div>

            <div className="pt-space-md border-t border-surface-container-high flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary">SHA-256 Provenance Ledger Verified</span>
              <button
                onClick={() => setActiveSource({ docTitle: doc?.title, page: 42, snippet: "Composite raw output reached 8.42 MT", status: "VERIFIED" })}
                className="font-label-sm text-label-sm text-primary font-bold hover:underline"
              >
                Inspect Page Bounding Box
              </button>
            </div>
          </div>

          {/* Right Column: Extracted Intelligence Tabs */}
          <div className="lg:col-span-6 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm p-space-lg space-y-space-md flex flex-col justify-between">
            <div>
              {/* Tabs */}
              <div className="flex border-b border-surface-container-high gap-space-sm mb-space-md">
                {[
                  { id: "ocr", label: "OCR Text", icon: "edit_note" },
                  { id: "tables", label: "Tables (1)", icon: "view_column" },
                  { id: "figures", label: "Figures (1)", icon: "photo_size_select_large" },
                  { id: "entities", label: "Entities (4)", icon: "label" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-1.5 pb-2 font-label-md text-label-md border-b-2 transition-all ${
                      activeTab === t.id
                        ? "border-primary text-primary font-bold"
                        : "border-transparent text-secondary hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab 1: OCR Text */}
              {activeTab === "ocr" && (
                <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high font-mono text-body-sm text-on-surface whitespace-pre-wrap max-h-[380px] overflow-y-auto">
                  {intel.ocrText}
                </div>
              )}

              {/* Tab 2: Tables */}
              {activeTab === "tables" && (
                <div className="space-y-space-sm">
                  {intel.tables.map((tbl, idx) => (
                    <div key={idx} className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
                      <span className="font-label-md text-label-md font-bold text-on-surface block">{tbl.title}</span>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-body-sm text-body-sm">
                          <thead>
                            <tr className="border-b border-surface-container-high text-secondary">
                              {tbl.headers.map((h, i) => (
                                <th key={i} className="p-1.5">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-surface-container-high">
                            {tbl.rows.map((r, ri) => (
                              <tr key={ri}>
                                {r.map((c, ci) => (
                                  <td key={ci} className="p-1.5 font-medium">{c}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Figures */}
              {activeTab === "figures" && (
                <div className="space-y-space-sm">
                  {intel.figures.map((fig, idx) => (
                    <div key={idx} className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
                      <div className="flex items-center justify-between text-label-sm font-label-sm">
                        <span className="font-bold text-on-surface">{fig.title}</span>
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-bold">{fig.type}</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary">{fig.caption}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Entities */}
              {activeTab === "entities" && (
                <div className="grid grid-cols-2 gap-space-xs">
                  {intel.entities.map((ent, idx) => (
                    <div key={idx} className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col justify-between">
                      <span className="font-label-md text-label-md font-bold text-on-surface">{ent.name}</span>
                      <span className="font-body-sm text-body-sm text-primary">{ent.category}</span>
                      <span className="text-[11px] text-secondary">Page {ent.page} • {ent.section}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-space-md border-t border-surface-container-high flex items-center justify-between text-secondary font-label-sm text-label-sm">
              <span>Automatic Layout Parser Active</span>
              <span>100% Page Anchored</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
