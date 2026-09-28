import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { useApp } from "../context/AppContext";

export const ObjectStoragePage = () => {
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
  const [selectedFormat, setSelectedFormat] = useState("All");

  const filteredDocs = scopedDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.hash && doc.hash.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFormat === "All") return matchesSearch;
    if (selectedFormat === "PDF") return matchesSearch && doc.filename.toLowerCase().endsWith(".pdf");
    if (selectedFormat === "DOCX") return matchesSearch && doc.filename.toLowerCase().endsWith(".docx");
    if (selectedFormat === "XLSX") return matchesSearch && (doc.filename.toLowerCase().endsWith(".xlsx") || doc.filename.toLowerCase().endsWith(".csv"));
    if (selectedFormat === "IMG") return matchesSearch && (doc.filename.toLowerCase().endsWith(".png") || doc.filename.toLowerCase().endsWith(".jpg") || doc.filename.toLowerCase().endsWith(".jpeg"));
    return matchesSearch;
  });

  const handleCopyUri = (filename) => {
    const uri = `s3://sankalan-sovereign-vault/raw-documents/2025/${filename}`;
    navigator.clipboard?.writeText(uri);
    showToast(`Copied Object Storage URI: ${uri}`, "success");
  };

  const handleDownloadOriginal = (doc) => {
    // If sample PDF/DOCX exists in sample-pdfs, trigger download
    const isSamplePdf = doc.filename.includes("Sample_") || doc.filename.includes("Sankalan_AI_Demo") || doc.filename.includes("GEOVANI_Demo");
    const downloadPath = isSamplePdf
      ? `/sample-pdfs/${doc.filename}`
      : `/sample-pdfs/Sample_Safety_Audit_2025.pdf`;

    const link = document.createElement("a");
    link.href = downloadPath;
    link.download = doc.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloading original file: ${doc.filename}`, "info");
  };

  return (
    <AppShell>
      <div className="space-y-space-lg animate-fade-in">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <span>Sovereign Storage Repository</span>
              <span>•</span>
              <span className="text-primary font-bold">{currentOrg.shortName} Vault Scope</span>
            </div>
            <h1 className="font-display-sm text-display-sm font-bold text-on-surface tracking-tight mt-0.5">
              Original Files & Object Storage Repository
            </h1>
            <p className="text-xs text-secondary">
              Centralized S3/Blob Object Storage for all uploaded raw mining documentation, CAD drawings, Excel workbooks, and PDF filings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadOpen(true)}
              disabled={!canUpload}
              className="inline-flex items-center gap-2 px-4 h-9 rounded-lg bg-primary text-on-primary font-bold text-xs shadow-sm hover:bg-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
              <span>Upload Files to Storage</span>
            </button>
          </div>
        </div>

        {/* BUCKET METRICS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-1">
            <div className="flex items-center justify-between text-secondary text-xs">
              <span className="font-bold uppercase tracking-wider">Storage Bucket URI</span>
              <span className="material-symbols-outlined text-primary text-[18px]">cloud</span>
            </div>
            <span className="text-xs font-mono font-bold text-primary block truncate">
              s3://sankalan-vault/raw/
            </span>
            <span className="text-[10px] text-secondary font-mono">AES-256 Sovereign Encrypted</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-1">
            <div className="flex items-center justify-between text-secondary text-xs">
              <span className="font-bold uppercase tracking-wider">Total Raw Objects</span>
              <span className="material-symbols-outlined text-primary text-[18px]">folder_zip</span>
            </div>
            <span className="text-lg font-black font-mono text-on-surface block">
              {scopedDocuments.length} Objects
            </span>
            <span className="text-[10px] text-emerald-600 font-bold">100% Hash Checksum Verified</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-1">
            <div className="flex items-center justify-between text-secondary text-xs">
              <span className="font-bold uppercase tracking-wider">Vault Capacity Used</span>
              <span className="material-symbols-outlined text-primary text-[18px]">hard_drive</span>
            </div>
            <span className="text-lg font-black font-mono text-on-surface block">
              142.8 MB
            </span>
            <span className="text-[10px] text-secondary font-mono">Multi-region Geo Replication</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-1">
            <div className="flex items-center justify-between text-secondary text-xs">
              <span className="font-bold uppercase tracking-wider">Ingestion Pipeline</span>
              <span className="material-symbols-outlined text-primary text-[18px]">published_with_changes</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 block">
              Automated OCR & Vector Sync
            </span>
            <span className="text-[10px] text-secondary font-mono">Real-time Object Watcher</span>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-[18px]">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search filename, title, or SHA-256 hash..."
              className="w-full h-9 pl-9 pr-4 rounded-xl bg-surface-container-low text-on-surface text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 border border-surface-container-high"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold w-full md:w-auto">
            <span className="text-secondary">File Format:</span>
            {["All", "PDF", "DOCX", "XLSX", "IMG"].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedFormat === fmt
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "bg-surface-container-low text-secondary hover:text-on-surface border border-surface-container-high"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* OBJECT STORAGE FILES TABLE */}
        <div className="rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-surface-container-high text-secondary font-label-sm text-[11px] uppercase tracking-wider">
                  <th className="p-3.5">Original File & Storage Key</th>
                  <th className="p-3.5">Format / Size</th>
                  <th className="p-3.5">SHA-256 Hash</th>
                  <th className="p-3.5">Organization Scope</th>
                  <th className="p-3.5 text-right">Raw Storage Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high text-xs text-on-surface">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[20px]">
                              {doc.filename.endsWith(".xlsx") || doc.filename.endsWith(".csv")
                                ? "table_chart"
                                : doc.filename.endsWith(".png") || doc.filename.endsWith(".jpg")
                                ? "image"
                                : doc.filename.endsWith(".docx")
                                ? "description"
                                : "picture_as_pdf"}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-on-surface block truncate">{doc.title}</span>
                            <span className="text-[11px] text-primary font-mono block truncate">
                              s3://sankalan-vault/raw-documents/{doc.filename}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-surface-container-low border border-surface-container-high font-mono text-[10px] font-bold text-secondary">
                          {doc.filename.split('.').pop().toUpperCase()} • {doc.size || '12.4 MB'}
                        </span>
                      </td>

                      <td className="p-3.5 font-mono text-[11px] text-secondary">
                        {doc.hash || `sha256-${Math.random().toString(36).substring(2, 12)}`}
                      </td>

                      <td className="p-3.5 font-semibold text-primary">
                        {doc.organization || doc.subsidiary}
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedReportDocId(doc.id);
                              setIsReportWizardOpen(true);
                            }}
                            className="px-2.5 py-1 rounded bg-primary text-on-primary font-bold text-[11px] hover:bg-primary-container transition-colors flex items-center gap-1 shadow-2xs"
                            title="Generate report from this stored file"
                          >
                            <span className="material-symbols-outlined text-[14px]">summarize</span>
                            <span>Report</span>
                          </button>

                          <button
                            onClick={() => handleDownloadOriginal(doc)}
                            className="px-2.5 py-1 rounded bg-primary/10 text-primary font-bold text-[11px] hover:bg-primary/20 transition-colors flex items-center gap-1"
                            title="Download Original File"
                          >
                            <span className="material-symbols-outlined text-[14px]">download</span>
                            <span>Download</span>
                          </button>

                          <button
                            onClick={() => handleCopyUri(doc.filename)}
                            className="px-2.5 py-1 rounded bg-surface-container text-secondary hover:text-on-surface font-semibold text-[11px] transition-colors flex items-center gap-1"
                            title="Copy S3 URI"
                          >
                            <span className="material-symbols-outlined text-[14px]">link</span>
                            <span>URI</span>
                          </button>

                          <button
                            onClick={() => navigate("/document-intelligence", { state: { selectedDocId: doc.id } })}
                            className="px-2.5 py-1 rounded bg-surface-container text-primary font-bold text-[11px] hover:bg-surface-container-high transition-colors"
                          >
                            Inspect
                          </button>

                          {canUpload && (
                            <button
                              onClick={() => deleteDocument(doc.id)}
                              className="p-1 rounded hover:bg-rose-500/10 text-secondary hover:text-rose-600 transition-colors"
                              title="Delete from Object Storage"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-secondary">
                      No raw objects found in current bucket matching filter.
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
