import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { processDocumentFile, PROCESSING_STAGES } from "../../services/mockProcessing";

export const UploadModal = () => {
  const navigate = useNavigate();
  const {
    isUploadOpen,
    setIsUploadOpen,
    addDocument,
    showToast,
    setIsReportWizardOpen,
    setSelectedReportDocId
  } = useApp();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedDocs, setCompletedDocs] = useState([]);
  const [currentProgress, setCurrentProgress] = useState({ step: 0, stage: null, progress: 0, currentFileName: "" });

  if (!isUploadOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const startUploadAndProcessing = async () => {
    if (selectedFiles.length === 0) return;
    setIsProcessing(true);
    setCompletedDocs([]);

    const newlyProcessedDocs = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setCurrentProgress({ step: 1, stage: PROCESSING_STAGES[0], progress: 10, currentFileName: file.name });

      const processedDoc = await processDocumentFile(file, (progressData) => {
        setCurrentProgress({
          ...progressData,
          currentFileName: file.name,
          overallProgress: Math.round(((i + progressData.progress / 100) / selectedFiles.length) * 100)
        });
      });

      addDocument(processedDoc);
      newlyProcessedDocs.push(processedDoc);
    }

    showToast(`Successfully processed & indexed ${selectedFiles.length} file(s) into Sovereign Vault!`, "success");

    setIsProcessing(false);
    setCompletedDocs(newlyProcessedDocs);
    setSelectedFiles([]);
    setCurrentProgress({ step: 0, stage: null, progress: 0, currentFileName: "" });
  };

  const handleGenerateReportFromUpload = (docId) => {
    setSelectedReportDocId(docId || completedDocs[0]?.id || "all");
    setIsUploadOpen(false);
    setIsReportWizardOpen(true);
    setCompletedDocs([]);
  };

  const handleCloseModal = () => {
    setIsUploadOpen(false);
    setCompletedDocs([]);
    setSelectedFiles([]);
  };

  const getFormatIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (ext === "pdf") return "picture_as_pdf";
    if (ext === "docx" || ext === "doc") return "description";
    if (ext === "xlsx" || ext === "xls" || ext === "csv") return "table_chart";
    if (ext === "png" || ext === "jpg" || ext === "jpeg") return "image";
    if (ext === "dwg" || ext === "dxf") return "architecture";
    return "draft";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-on-surface/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-surface-container-highest flex flex-col">
        
        {/* Header */}
        <div className="p-space-lg bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-space-xs text-primary font-bold">
            <span className="material-symbols-outlined text-[22px]">cloud_upload</span>
            <span className="font-label-lg text-label-lg text-on-surface">
              {completedDocs.length > 0 ? "Upload & Ingestion Complete" : "Upload Mining Records (Single / Multi-Batch)"}
            </span>
          </div>
          {!isProcessing && (
            <button
              onClick={handleCloseModal}
              className="p-1 rounded hover:bg-surface-container text-secondary"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-space-lg space-y-space-md">
          {/* STATE 1: Upload Completed View with Direct Generate Report Button */}
          {completedDocs.length > 0 ? (
            <div className="space-y-4 py-2 animate-fade-in">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[28px] shrink-0">task_alt</span>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm">File Ingestion & Spatial Vector Indexing Complete!</h3>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Uploaded file(s) have been verified, hashed, OCR-parsed and stored in your <strong>Sovereign Object Storage Vault</strong>. You can now compile a full intelligence report directly from these document(s).
                  </p>
                </div>
              </div>

              {/* List of processed documents */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-secondary uppercase block">Ingested Document Scope:</span>
                {completedDocs.map((doc) => (
                  <div key={doc.id} className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-lg bg-surface-container text-primary">
                        <span className="material-symbols-outlined text-[20px]">{getFormatIcon(doc.filename)}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-on-surface truncate">{doc.title}</h4>
                        <p className="text-[11px] text-secondary font-mono">{doc.filename} • {doc.pages} pages • OCR: {doc.ocrConfidence}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-700 font-mono text-[10px] font-bold shrink-0">Indexed</span>
                  </div>
                ))}
              </div>

              {/* HIGHLIGHTED REPORT GENERATION BUTTON */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => handleGenerateReportFromUpload(completedDocs[0]?.id)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary to-blue-700 text-on-primary font-black text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
                  <span>⚡ Generate Sovereign Intelligence Report from Uploaded Document</span>
                </button>
                <p className="text-[11px] text-center text-secondary">
                  Automatically extracts tables, production statistics, equipment metrics & safety hazards into a certified report.
                </p>
              </div>
            </div>
          ) : !isProcessing ? (
            /* STATE 2: File Select & Drag-and-Drop Zone */
            <>
              {/* Drag & Drop Zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border-2 border-dashed border-primary/40 hover:border-primary rounded-xl p-space-xl text-center bg-surface-container-low/40 hover:bg-surface-container-low transition-all cursor-pointer flex flex-col items-center justify-center gap-space-xs"
                onClick={() => document.getElementById("file-input-trigger").click()}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">upload_file</span>
                </div>
                <span className="font-label-lg text-label-lg font-bold text-on-surface">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} file(s) selected — Click or drop to add more`
                    : "Drag & drop mining documents here (Multi-file enabled)"}
                </span>
                <span className="font-body-sm text-body-sm text-secondary">
                  Supports PDF, DOCX, XLSX, CSV, PNG, JPG, CAD DWG (Single or Multiple Batch Upload)
                </span>
                <input
                  id="file-input-trigger"
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.docx,.xlsx,.csv,.png,.jpg,.jpeg,.dwg,.dxf,.txt"
                  onChange={handleFileChange}
                />
              </div>

              {/* Sample Demo Files Download Helper */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-700">
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Demo Files Ready for Test Upload & Report Generation:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/sample-pdfs/Sankalan_AI_Demo_Mining_Report.docx"
                    download="Sankalan_AI_Demo_Mining_Report.docx"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-lowest border border-amber-500/30 text-secondary hover:text-primary text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[14px] text-blue-600">description</span>
                    <span>Demo Mining DOCX</span>
                  </a>

                  <a
                    href="/sample-pdfs/Sankalan_AI_Demo_Ventilation_Safety_Report.pdf"
                    download="Sankalan_AI_Demo_Ventilation_Safety_Report.pdf"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-lowest border border-amber-500/30 text-secondary hover:text-primary text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[14px] text-amber-600">picture_as_pdf</span>
                    <span>Ventilation Safety PDF</span>
                  </a>

                  <a
                    href="/sample-pdfs/Sample_Production_Summary_2025.pdf"
                    download="Sample_Production_Summary_2025.pdf"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-lowest border border-amber-500/30 text-secondary hover:text-primary text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[14px] text-amber-600">picture_as_pdf</span>
                    <span>Production PDF</span>
                  </a>
                </div>
              </div>

              {/* Selected Files Batch List */}
              {selectedFiles.length > 0 && (
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  <span className="text-xs font-bold text-secondary uppercase block">
                    Selected Files for Ingestion Batch ({selectedFiles.length}):
                  </span>
                  {selectedFiles.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-surface-container border border-surface-container-high flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-primary text-[16px]">
                          {getFormatIcon(f.name)}
                        </span>
                        <span className="font-bold text-on-surface truncate">{f.name}</span>
                        <span className="text-secondary font-mono text-[10px]">({(f.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        onClick={() => removeFile(idx)}
                        className="text-secondary hover:text-rose-600 p-0.5"
                        title="Remove file"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* STATE 3: Animated Multi-File Processing Stepper */
            <div className="space-y-space-md py-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-label-md text-label-md font-bold text-on-surface block">
                    Batch Ingestion: {currentProgress.currentFileName}
                  </span>
                  <span className="text-xs text-secondary font-mono">
                    Multi-stage spatial OCR, table parsing & vector indexing
                  </span>
                </div>
                <span className="font-metric-display text-headline-sm font-bold text-primary">
                  {currentProgress.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${currentProgress.progress}%` }}
                ></div>
              </div>

              {/* Stage Stepper List */}
              <div className="space-y-2 pt-2">
                {PROCESSING_STAGES.map((stg) => {
                  const isDone = currentProgress.step > stg.id;
                  const isCurrent = currentProgress.step === stg.id;

                  return (
                    <div
                      key={stg.id}
                      className={`flex items-center justify-between p-2 rounded-lg font-body-sm text-body-sm ${
                        isDone
                          ? "bg-surface-container text-primary font-semibold"
                          : isCurrent
                          ? "bg-primary text-on-primary font-bold shadow-sm"
                          : "text-secondary opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">
                          {isDone ? "check_circle" : isCurrent ? "sync" : "hourglass_empty"}
                        </span>
                        <span>{stg.name}</span>
                      </div>
                      <span className="text-[11px] uppercase tracking-wider">
                        {isDone ? "Complete" : isCurrent ? "Processing" : "Pending"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!isProcessing && (
          <div className="p-space-md bg-surface-container-low border-t border-surface-container-high flex items-center justify-between gap-space-sm">
            {completedDocs.length > 0 ? (
              <>
                <button
                  onClick={() => {
                    handleCloseModal();
                    navigate("/storage");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-surface-container text-secondary hover:text-on-surface font-bold text-xs flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                  <span>View in Object Storage</span>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs"
                >
                  Close & View in Document Library
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleCloseModal}
                  className="px-space-md h-9 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={selectedFiles.length === 0}
                  onClick={startUploadAndProcessing}
                  className="px-space-lg h-9 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container disabled:opacity-50 transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                  <span>Ingest & Index Batch ({selectedFiles.length})</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
