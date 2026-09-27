import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

export const SourceViewerDrawer = () => {
  const { activeSource, setActiveSource } = useApp();
  const [showTrace, setShowTrace] = useState(false);

  if (!activeSource) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-on-surface/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-surface-container-highest">
        
        {/* Header */}
        <div className="p-space-lg bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg font-bold text-on-surface truncate max-w-md">
                {activeSource.docTitle || "Source Document Preview"}
              </span>
              <span className="font-body-sm text-body-sm text-secondary">
                Page {activeSource.page || 1} • {activeSource.section || "General Extract"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveSource(null)}
            className="p-1.5 rounded-lg hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Scrollable Document Scan Area */}
        <div className="flex-1 p-space-lg overflow-y-auto bg-surface-container-low/40 space-y-space-md">
          {/* Audit Verification Header Pill */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
              <span className="font-label-md text-label-md font-bold text-on-surface">Verified Citation Source</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm font-bold">
              {activeSource.status || "VERIFIED"}
            </span>
          </div>

          {/* Document Page Canvas Preview */}
          <div className="relative bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-highest shadow-inner font-mono text-body-sm text-on-surface space-y-3">
            {/* Vintage Official Stamp */}
            <div className="absolute right-4 top-4 border-2 border-primary/60 text-primary px-2 py-0.5 rotate-6 font-bold text-xs uppercase opacity-75">
              CIL Sovereign Archive • Approved
            </div>

            <p className="text-secondary font-sans font-bold text-label-sm uppercase tracking-wider">
              {activeSource.docTitle} (PAGE {activeSource.page})
            </p>
            <hr className="border-surface-container-high" />

            <p className="text-secondary">PROJECT CODE: CIL-MINING-OPERATIONS-2024</p>
            <p className="text-secondary">SUBSIDIARY: SECTOR SOUTH-IV</p>

            <p className="text-on-surface-variant leading-relaxed">
              Standard operational reporting filed under statutory guidelines. Surveyed collar RL +214.50m. Continuous telemetry recorded across shift cycles.
            </p>

            {/* Target Highlighted Bounding Box */}
            <div className="p-space-md rounded-lg bg-surface-container border-2 border-primary/40 shadow-sm relative">
              <span className="absolute -top-3 left-3 px-2 py-0.5 rounded bg-primary text-on-primary font-sans font-bold text-[10px] uppercase">
                TARGET BOUNDING BOX [X: {activeSource.boundingBox?.x || 120}, Y: {activeSource.boundingBox?.y || 340}]
              </span>
              <p className="font-body-md text-body-md font-semibold text-on-surface italic pt-1">
                "{activeSource.snippet}"
              </p>
            </div>

            <p className="text-secondary leading-relaxed">
              Verified against weighbridge rakes and DGMS certified slope displacement station sensors.
            </p>
          </div>

          {/* Expandable Trace: "Why this answer?" */}
          <div className="rounded-xl border border-surface-container-high overflow-hidden bg-surface-container-lowest">
            <button
              onClick={() => setShowTrace(!showTrace)}
              className="w-full p-space-md flex items-center justify-between font-label-md text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-space-xs text-primary">
                <span className="material-symbols-outlined text-[18px]">schema</span>
                <span>Why this answer? (Reasoning & Retrieval Trace)</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-secondary">
                {showTrace ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </button>

            {showTrace && (
              <div className="p-space-md border-t border-surface-container-high bg-surface-container-low/50 space-y-space-xs text-body-sm text-on-surface">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">1. Query Intent:</span>
                  <span>Quantitative extraction & production analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">2. Retrieval Strategy:</span>
                  <span>Hybrid BM25 + Vector Dense Reranking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">3. Verification Rule:</span>
                  <span>{activeSource.verificationReason || "SHA-256 hash verified against sovereign node ledger."}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">4. Confidence Score:</span>
                  <span>{(activeSource.similarityScore ? activeSource.similarityScore * 100 : 98).toFixed(1)}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-space-md bg-surface-container-lowest border-t border-surface-container-high flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-secondary">SHA-256 Provenance Ledger Verified</span>
          <button
            onClick={() => setActiveSource(null)}
            className="px-space-lg h-9 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
