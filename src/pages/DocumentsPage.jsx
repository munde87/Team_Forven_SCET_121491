import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { useApp } from "../context/AppContext";

export const DocumentsPage = () => {
  const navigate = useNavigate();
  const {
    scopedDocuments,
    currentOrg,
    canUpload,
    deleteDocument,
    setIsUploadOpen,
    showToast,
    setIsReportWizardOpen,
    setSelectedReportDocId
  } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filteredDocs = scopedDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.mine && doc.mine.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All" || doc.type === selectedType || doc.category === selectedType;
    return matchesSearch && matchesType;
  });

  const handleUploadClick = () => {
    if (!canUpload) {
      showToast("Upload requires an authorized analyst or administrator role.", "warning");
      return;
    }
    setIsUploadOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-space-lg animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <span>Sovereign Document Registry</span>
              <span>•</span>
              <span className="text-primary font-bold">{currentOrg.shortName} Scope</span>
            </div>
            <h1 className="font-display-sm text-display-sm font-bold text-on-surface tracking-tight mt-0.5">
              Enterprise Mining Document Library
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 font-mono text-xs font-bold">
              PROTOTYPE DEMO MODE
            </span>
            <button
              onClick={handleUploadClick}
              disabled={!canUpload}
              className={`inline-flex items-center gap-2 px-4 h-9 rounded-lg font-bold text-xs shadow-sm transition-all ${
                canUpload
                  ? "bg-primary text-on-primary hover:bg-primary-container"
                  : "bg-surface-container/50 text-secondary cursor-not-allowed opacity-60"
              }`}
              title={!canUpload ? "Upload requires an authorized analyst or administrator role." : "Upload Document"}
            >
              <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[20px]">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search title, filename, or mine site..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40 border border-surface-container-high"
            />
          </div>

          <div className="flex items-center gap-space-sm w-full md:w-auto text-xs">
            <span className="text-secondary font-bold">Document Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface font-semibold"
            >
              <option value="All">All Types</option>
              <option value="Safety Report">Safety Report</option>
              <option value="Production Report">Production Report</option>
              <option value="Geological Report">Geological Report</option>
              <option value="Hydrogeological Report">Hydrogeological Report</option>
              <option value="Equipment Report">Equipment Report</option>
              <option value="Parliamentary Query">Parliamentary Query</option>
            </select>
          </div>
        </div>

        {/* DEMO SAMPLE PDF DOWNLOAD HELPER BANNER */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-700">
              <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
            </span>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase block">TEST DEMO UPLOAD & REPORT GENERATION</span>
              <p className="text-xs text-secondary">
                Download these sample PDF files to your computer, then click <strong>"Upload Document"</strong> to test live ingestion & automated report compilation!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <a
              href="/sample-pdfs/GEOVANI_Demo_Mining_Report.docx"
              download="GEOVANI_Demo_Mining_Report.docx"
              className="px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-amber-500/30 text-on-surface hover:text-primary text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-blue-600">description</span>
              <span>Download Mining DOCX</span>
            </a>
            <a
              href="/sample-pdfs/GEOVANI_Demo_Ventilation_Safety_Report.pdf"
              download="GEOVANI_Demo_Ventilation_Safety_Report.pdf"
              className="px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-amber-500/30 text-on-surface hover:text-primary text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-600">picture_as_pdf</span>
              <span>Download Ventilation PDF</span>
            </a>
            <a
              href="/sample-pdfs/Sample_Production_Summary_2025.pdf"
              download="Sample_Production_Summary_2025.pdf"
              className="px-3 py-1.5 rounded-xl bg-surface-container-lowest border border-amber-500/30 text-on-surface hover:text-primary text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-amber-600">picture_as_pdf</span>
              <span>Download Production PDF</span>
            </a>
          </div>
        </div>

        {/* Documents Table */}
        <div className="rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-surface-container-high text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="p-space-md">Document Name</th>
                  <th className="p-space-md">Organization & Mine</th>
                  <th className="p-space-md">Category</th>
                  <th className="p-space-md">Pages / Size</th>
                  <th className="p-space-md">OCR Confidence</th>
                  <th className="p-space-md text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high font-body-sm text-body-sm text-on-surface">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-space-md">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-8 h-8 rounded bg-surface-container text-primary flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[18px]">
                              {doc.type.includes("XLSX") ? "table_chart" : doc.type.includes("CSV") ? "database" : "picture_as_pdf"}
                            </span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-md text-label-md font-bold text-on-surface truncate">
                              {doc.title}
                            </span>
                            <span className="font-body-sm text-body-sm text-secondary truncate">
                              {doc.filename} • {doc.size}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-space-md">
                        <div className="flex flex-col">
                          <span className="font-bold text-primary">{doc.organization || doc.subsidiary}</span>
                          <span className="text-secondary text-[12px]">{doc.mine} ({doc.year})</span>
                        </div>
                      </td>
                      <td className="p-space-md">
                        <span className="px-2 py-0.5 rounded bg-surface-container-low border border-surface-container-high text-secondary font-label-sm text-label-sm">
                          {doc.type}
                        </span>
                      </td>
                      <td className="p-space-md">
                        <span className="font-semibold">{doc.pages} pages</span> ({doc.size})
                      </td>
                      <td className="p-space-md">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="font-semibold text-primary">{doc.ocrConfidence || "99.4%"}</span>
                        </div>
                      </td>
                      <td className="p-space-md text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedReportDocId(doc.id);
                              setIsReportWizardOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-colors flex items-center gap-1 shadow-2xs"
                            title="Generate report from this document"
                          >
                            <span className="material-symbols-outlined text-[14px]">summarize</span>
                            <span>Generate Report</span>
                          </button>

                          <button
                            onClick={() => navigate("/document-intelligence", { state: { selectedDocId: doc.id } })}
                            className="px-2.5 py-1 rounded bg-surface-container text-primary font-label-sm text-label-sm font-bold hover:bg-surface-container-high transition-colors"
                          >
                            Inspect
                          </button>
                          {canUpload && (
                            <button
                              onClick={() => deleteDocument(doc.id)}
                              className="p-1 rounded hover:bg-error-container text-secondary hover:text-on-error-container transition-colors"
                              title="Delete document"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-space-xl text-center text-secondary">
                      No documents matched your filter for current scope ({currentOrg.shortName}).
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
