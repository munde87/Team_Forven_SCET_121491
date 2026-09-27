import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { useApp } from "../context/AppContext";

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    currentOrg,
    currentRole,
    scopedDocuments,
    scopedReports,
    recentQueries,
    setIsUploadOpen,
    setIsReportWizardOpen,
    canUpload,
    canGenerateReport,
    isViewer,
    showToast
  } = useApp();

  const handleUploadClick = () => {
    if (!canUpload) {
      showToast("Your current role does not have permission to perform this action.", "warning");
      return;
    }
    setIsUploadOpen(true);
  };

  const handleReportClick = () => {
    if (!canGenerateReport) {
      showToast("Your current role does not have permission to perform this action.", "warning");
      return;
    }
    setIsReportWizardOpen(true);
  };

  const kpis = [
    {
      title: "Documents Indexed",
      value: scopedDocuments.length.toString(),
      icon: "description",
      sub: `${currentOrg.shortName} Repository`,
      color: "text-primary"
    },
    {
      title: "Mines Covered",
      value: `${currentOrg.mines?.length || 4} Sites`,
      icon: "landscape",
      sub: currentOrg.shortName === "CIL" ? "All Subsidiary Sectors" : `${currentOrg.state}`,
      color: "text-primary"
    },
    {
      title: "Evidence Answers",
      value: "3,240+",
      icon: "verified",
      sub: "100% Citation Bounding Box",
      color: "text-emerald-600"
    },
    {
      title: "Statutory Reports",
      value: scopedReports.length.toString(),
      icon: "summarize",
      sub: "DGMS / IBM Compliant",
      color: "text-primary"
    }
  ];

  return (
    <AppShell>
      <div className="space-y-space-lg animate-fade-in">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <span>Organization Scope:</span>
              <span className="text-primary font-bold">{currentOrg.name} ({currentOrg.shortName})</span>
              <span>•</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                {currentRole.name}
              </span>
            </div>
            <h1 className="font-display-sm text-display-sm font-bold text-on-surface tracking-tight mt-0.5">
              {currentOrg.shortName === "CIL" ? "CIL Enterprise Intelligence Hub" : `${currentOrg.shortName} Mining Intelligence Hub`}
            </h1>
          </div>

          <div className="flex items-center gap-space-xs">
            <button
              onClick={handleUploadClick}
              disabled={!canUpload}
              className={`inline-flex items-center gap-space-xs px-space-md h-9 rounded-lg border font-label-md text-label-md transition-colors ${
                canUpload
                  ? "bg-surface-container-low text-on-surface border-surface-container-highest hover:bg-surface-container"
                  : "bg-surface-container-low/50 text-secondary border-surface-container-high cursor-not-allowed opacity-60"
              }`}
              title={!canUpload ? "Your current role does not have permission to perform this action." : "Upload Document"}
            >
              <span className="material-symbols-outlined text-primary text-[18px]">
                {canUpload ? "cloud_upload" : "lock"}
              </span>
              <span>{canUpload ? "Upload Document" : "🔒 Upload Restricted"}</span>
            </button>
            <Link
              to="/ai-query"
              className="inline-flex items-center gap-space-xs px-space-lg h-9 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              <span>Ask GEOVANI</span>
            </Link>
          </div>
        </div>

        {/* Prototype Disclaimer Pill */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">info</span>
            <span>PROTOTYPE AUTHENTICATION ENVIRONMENT — Active Scope: {currentOrg.name} ({currentRole.name}). All metrics and queries are simulated for presentation.</span>
          </div>
          <span className="font-mono uppercase text-[10px] bg-amber-500/20 px-2 py-0.5 rounded">Sample Data</span>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-secondary">
                <span className="font-label-sm text-label-sm font-semibold">{kpi.title}</span>
                <span className={`p-1.5 rounded-lg bg-surface-container-low ${kpi.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{kpi.icon}</span>
                </span>
              </div>
              <div className="font-metric-display text-metric-display font-bold text-on-surface mt-space-xs">
                {kpi.value}
              </div>
              <span className="font-body-sm text-body-sm text-secondary mt-1">{kpi.sub}</span>
            </div>
          ))}
        </div>

        {/* System Pipeline Interactive Visualization */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm">
          <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container-high">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">account_tree</span>
              <span className="font-label-lg text-label-lg font-bold text-on-surface">Evidence-First Deterministic Pipeline</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm font-bold">
              Core Axiom: Evidence First → Generation Second
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm text-center">
            {[
              { title: "INGEST", sub: "PDF, XLSX, Scans", icon: "cloud_upload", route: "/documents" },
              { title: "DOC INTEL", sub: "Layout & Spatial OCR", icon: "document_scanner", route: "/document-intelligence" },
              { title: "MULTIMODAL RAG", sub: "Dense Vector Graph", icon: "hub", route: "/mining-intelligence" },
              { title: "VERIFICATION", sub: "Dual-Key Candidate Audit", icon: "fact_check", route: "/ai-query" },
              { title: "AI OUTPUT", sub: "100% Source Citation", icon: "verified", route: "/ai-query" }
            ].map((pStep, pIdx) => (
              <div
                key={pIdx}
                onClick={() => navigate(pStep.route)}
                className="p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-all cursor-pointer flex flex-col items-center gap-1 group"
              >
                <div className="w-9 h-9 rounded-full bg-surface-container group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-[20px]">{pStep.icon}</span>
                </div>
                <span className="font-label-md text-label-md font-bold text-on-surface mt-1">{pStep.title}</span>
                <span className="font-body-sm text-body-sm text-secondary">{pStep.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Split: Recent Ingested Documents & Recent Queries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          
          {/* Left: Recent Ingested Documents Table */}
          <div className="lg:col-span-7 p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high">
                <span className="font-label-lg text-label-lg font-bold text-on-surface">
                  Scoped Ingestion Records ({currentOrg.shortName})
                </span>
                <Link to="/documents" className="font-label-sm text-label-sm text-primary font-bold hover:underline">
                  View All ({scopedDocuments.length})
                </Link>
              </div>

              <div className="divide-y divide-surface-container-high">
                {scopedDocuments.slice(0, 4).map((doc) => (
                  <div key={doc.id} className="py-2.5 flex items-center justify-between gap-space-sm">
                    <div className="flex items-center gap-space-sm min-w-0">
                      <span className="p-2 rounded bg-surface-container text-primary">
                        <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                      </span>
                      <div className="flex flex-col truncate">
                        <span className="font-label-md text-label-md font-semibold text-on-surface truncate">
                          {doc.title}
                        </span>
                        <span className="font-body-sm text-body-sm text-secondary">
                          {doc.organization || doc.subsidiary} • {doc.pages} pages • OCR: {doc.ocrConfidence}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm font-bold shrink-0">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-surface-container-high flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary">Spatial Layout Engine Scoped to {currentOrg.shortName}</span>
              <button
                onClick={handleUploadClick}
                disabled={!canUpload}
                className={`font-label-sm text-label-sm font-bold flex items-center gap-1 ${
                  canUpload ? "text-primary hover:underline" : "text-secondary cursor-not-allowed opacity-60"
                }`}
                title={!canUpload ? "Your current role does not have permission to perform this action." : "Ingest New File"}
              >
                <span className="material-symbols-outlined text-[16px]">{canUpload ? "add" : "lock"}</span>
                <span>{canUpload ? "Ingest New File" : "🔒 Restricted"}</span>
              </button>
            </div>
          </div>

          {/* Right: Quick Launch AI Queries */}
          <div className="lg:col-span-5 p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container-high">
                <span className="font-label-lg text-label-lg font-bold text-on-surface">Suggested AI Queries</span>
                <Link to="/ai-query" className="font-label-sm text-label-sm text-primary font-bold hover:underline">
                  Open Console
                </Link>
              </div>

              <div className="space-y-space-xs">
                {recentQueries.slice(0, 3).map((qText, qIdx) => (
                  <div
                    key={qIdx}
                    onClick={() => navigate("/ai-query", { state: { presetQuery: qText } })}
                    className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-all cursor-pointer flex items-start gap-space-xs group"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">search</span>
                    <p className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                      "{qText}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-surface-container-high flex items-center justify-between">
              <button
                onClick={handleReportClick}
                disabled={!canGenerateReport}
                className={`w-full py-2 rounded-lg text-label-sm font-bold flex items-center justify-center gap-1 transition-colors ${
                  canGenerateReport
                    ? "bg-surface-container hover:bg-surface-container-high text-primary"
                    : "bg-surface-container/50 text-secondary cursor-not-allowed opacity-60"
                }`}
                title={!canGenerateReport ? "Your current role does not have permission to perform this action." : "Compile Statutory Report"}
              >
                <span className="material-symbols-outlined text-[18px]">{canGenerateReport ? "add_chart" : "lock"}</span>
                <span>{canGenerateReport ? "Compile Statutory Report" : "🔒 Report Generation Restricted"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
