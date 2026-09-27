import React, { useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { useApp } from "../context/AppContext";
import { downloadReportAsPDF, downloadReportAsDOCX } from "../services/exportUtils";

export const ReportsPage = () => {
  const {
    scopedReports,
    currentOrg,
    canGenerateReport,
    setIsReportWizardOpen,
    deleteReport,
    setActiveSource,
    showToast
  } = useApp();

  const [selectedReport, setSelectedReport] = useState(scopedReports[0] || null);
  const [isExporting, setIsExporting] = useState(false);

  const handleOpenWizard = () => {
    if (!canGenerateReport) {
      showToast("Access restricted for the current demo role.", "warning");
      return;
    }
    setIsReportWizardOpen(true);
  };

  const handleExportPDF = async () => {
    if (!selectedReport) return;
    setIsExporting(true);
    showToast(`Generating PDF for "${selectedReport.title}"...`, "info");
    const success = await downloadReportAsPDF("report-preview-canvas", selectedReport.title);
    setIsExporting(false);
    if (success) {
      showToast("PDF downloaded successfully!", "success");
    } else {
      showToast("PDF download failed.", "error");
    }
  };

  const handleExportDOCX = async () => {
    if (!selectedReport) return;
    setIsExporting(true);
    showToast(`Generating DOCX for "${selectedReport.title}"...`, "info");
    const success = await downloadReportAsDOCX(selectedReport, selectedReport.title);
    setIsExporting(false);
    if (success) {
      showToast("DOCX downloaded successfully!", "success");
    } else {
      showToast("DOCX download failed.", "error");
    }
  };

  return (
    <AppShell>
      <div className="space-y-space-lg animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <span>Sovereign Compliance Registry</span>
              <span>•</span>
              <span className="text-primary font-bold">{currentOrg.shortName} Scope</span>
            </div>
            <h1 className="font-display-sm text-display-sm font-bold text-on-surface tracking-tight mt-0.5">
              Automated Report Generation & History
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 font-mono text-xs font-bold">
              PROTOTYPE DEMO MODE
            </span>
            <button
              onClick={handleOpenWizard}
              disabled={!canGenerateReport}
              className={`inline-flex items-center gap-2 px-4 h-9 rounded-lg font-bold text-xs shadow-sm transition-all ${
                canGenerateReport
                  ? "bg-primary text-on-primary hover:bg-primary-container"
                  : "bg-surface-container/50 text-secondary cursor-not-allowed opacity-60"
              }`}
              title={!canGenerateReport ? "Report generation restricted for Viewer role" : "Compile new report"}
            >
              <span className="material-symbols-outlined text-[18px]">add_chart</span>
              <span>Generate Report Wizard</span>
            </button>
          </div>
        </div>

        {/* Split Grid: Reports History & Report Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          
          {/* Left: Report History Library */}
          <div className="lg:col-span-5 p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <span className="font-bold text-sm text-on-surface">
                  Report History ({scopedReports.length})
                </span>
                <span className="text-xs text-secondary font-mono">Scoped to {currentOrg.shortName}</span>
              </div>

              {scopedReports.length === 0 ? (
                <div className="p-8 text-center text-secondary space-y-2">
                  <span className="material-symbols-outlined text-3xl">summarize</span>
                  <p className="text-xs font-semibold">No generated reports in current scope.</p>
                </div>
              ) : (
                <div className="divide-y divide-surface-container-high mt-2 max-h-[500px] overflow-y-auto">
                  {scopedReports.map((rep) => {
                    const isSelected = selectedReport?.id === rep.id;
                    return (
                      <div
                        key={rep.id}
                        onClick={() => setSelectedReport(rep)}
                        className={`p-3 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? "bg-primary/10 border border-primary/40 shadow-sm"
                            : "hover:bg-surface-container-low"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-primary font-mono">{rep.type}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold text-[10px]">
                            {rep.status || "Approved"}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-on-surface line-clamp-1">
                          {rep.title}
                        </h4>
                        <p className="text-[11px] text-secondary mt-1">
                          {rep.subsidiary} • Period: {rep.period}
                        </p>

                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-surface-container-high text-[11px]">
                          <span className="text-secondary font-mono">Generated: {rep.createdAt}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteReport(rep.id);
                              }}
                              className="p-1 text-secondary hover:text-red-600 transition-colors"
                              title="Delete Report"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={handleOpenWizard}
              disabled={!canGenerateReport}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
                canGenerateReport
                  ? "bg-surface-container hover:bg-surface-container-high text-primary"
                  : "bg-surface-container/50 text-secondary cursor-not-allowed opacity-60"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Compile New Report</span>
            </button>
          </div>

          {/* Right: Printable Report Preview Canvas */}
          <div className="lg:col-span-7 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-md p-space-lg flex flex-col justify-between">
            {selectedReport ? (
              <div className="space-y-4">
                
                {/* Preview Toolbar */}
                <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                    <span className="font-bold text-sm text-on-surface">REPORT PREVIEW & EXPORT</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportDOCX}
                      disabled={isExporting}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs flex items-center gap-1 border border-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Download DOCX</span>
                    </button>

                    <button
                      onClick={handleExportPDF}
                      disabled={isExporting}
                      className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-bold text-xs flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                {/* Printable A4 Paper Container (Target for html2canvas PDF Export) */}
                <div id="report-preview-canvas" className="p-8 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-sm space-y-5 font-sans">
                  
                  {/* Formal Letterhead Header */}
                  <div className="text-center pb-4 border-b-2 border-primary/30">
                    <div className="flex items-center justify-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
                      <span className="material-symbols-outlined text-[18px]">layers</span>
                      GEOVANI — SOVEREIGN MINING INTELLIGENCE
                    </div>
                    <h2 className="text-lg font-black uppercase text-gray-900 tracking-tight">
                      {selectedReport.title}
                    </h2>
                    <p className="text-xs text-gray-600 font-mono mt-0.5">
                      {selectedReport.subsidiary} • Mine: {selectedReport.mine}
                    </p>
                  </div>

                  {/* Metadata Table */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 border border-gray-200">
                    <div><strong className="text-gray-900">Organization:</strong> {selectedReport.subsidiary}</div>
                    <div><strong className="text-gray-900">Reporting Period:</strong> {selectedReport.period}</div>
                    <div><strong className="text-gray-900">Report Category:</strong> {selectedReport.type}</div>
                    <div><strong className="text-gray-900">Generated At:</strong> {selectedReport.createdAt}</div>
                  </div>

                  {/* Executive Summary Section */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase text-primary tracking-wider border-b border-gray-200 pb-1">
                      1. Executive Summary
                    </h3>
                    <p className="text-xs text-gray-800 leading-relaxed font-normal">
                      {selectedReport.executiveSummary}
                    </p>
                  </div>

                  {/* Key Findings Section */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase text-primary tracking-wider border-b border-gray-200 pb-1">
                      2. Key Corroborated Findings
                    </h3>
                    <ul className="space-y-1 text-xs text-gray-800">
                      {(selectedReport.keyFindings || []).map((kf, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary font-bold">•</span>
                          <span>{kf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sources & Cited Evidence Section */}
                  <div className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase text-primary tracking-wider border-b border-gray-200 pb-1">
                      3. Sources & Cited Evidence
                    </h3>
                    <div className="space-y-1 text-xs">
                      <div
                        onClick={() =>
                          setActiveSource({
                            docTitle: `${selectedReport.subsidiary} Statutory Safety Review`,
                            page: 42,
                            section: "Section 3.2 — Slope & Safety Observations",
                            snippet: "Highwall piezometer monitoring confirmed slope displacement velocity below critical threshold.",
                            status: "VERIFIED"
                          })
                        }
                        className="p-2 rounded bg-gray-50 border border-gray-200 hover:border-primary cursor-pointer text-gray-800 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-primary">[1] {selectedReport.subsidiary} Statutory Review</span>
                          <span className="text-gray-500 block text-[11px]">Page 42 • Section 3.2 (Slope Observations)</span>
                        </div>
                        <span className="text-primary font-bold text-[11px] underline">View Source</span>
                      </div>

                      <div
                        onClick={() =>
                          setActiveSource({
                            docTitle: `${selectedReport.subsidiary} Operational Dispatch Summary`,
                            page: 18,
                            section: "Section 4.1 — Haul Road & Dispatch",
                            snippet: "Automated weighbridge telemetry registered 100% compliance across active transport corridors.",
                            status: "VERIFIED"
                          })
                        }
                        className="p-2 rounded bg-gray-50 border border-gray-200 hover:border-primary cursor-pointer text-gray-800 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-primary">[2] Opencast Operational Dispatch Summary</span>
                          <span className="text-gray-500 block text-[11px]">Page 18 • Section 4.1 (Logistics Findings)</span>
                        </div>
                        <span className="text-primary font-bold text-[11px] underline">View Source</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Disclaimer */}
                  <div className="pt-4 border-t border-gray-200 text-center text-[10px] text-gray-500 font-mono">
                    <p className="font-bold text-gray-700">Prototype demonstration using sample data. Not an operational CIL/CMPDI report.</p>
                    <p>Evidence-backed report generated via GEOVANI Multimodal RAG Engine.</p>
                  </div>

                </div>

              </div>
            ) : (
              <div className="p-12 text-center text-secondary">
                Select a report from the history list to preview and export.
              </div>
            )}
          </div>

        </div>

      </div>
    </AppShell>
  );
};
