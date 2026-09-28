import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_DOCUMENTS } from "../data/documents";
import { INITIAL_REPORTS } from "../data/reports";
import { PRIMARY_ORGANIZATION } from "../data/organizations";
import { ROLES } from "../data/roles";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const auth = useAuth();
  
  // Use authenticated organization & role from AuthContext (fallback to CIL Admin if null)
  const currentOrg = auth?.currentOrg || PRIMARY_ORGANIZATION;
  const currentRole = auth?.currentRole || ROLES[0];
  const permissions = auth?.permissions || { canUpload: true, canGenerateReports: true, isViewer: false, canViewAllOrgs: true };

  // Documents state (persisted)
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem("sankalan_documents") || localStorage.getItem("geovani_documents");
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  // Reports state (persisted)
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("sankalan_reports") || localStorage.getItem("geovani_reports");
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  // Query History state
  const [recentQueries, setRecentQueries] = useState(() => {
    const saved = localStorage.getItem("sankalan_queries") || localStorage.getItem("geovani_queries");
    return saved ? JSON.parse(saved) : [
      "What safety issues were identified in the selected mine reports?",
      "What production trends were reported during FY 2024–25?",
      "What geological exploration activities were reported?"
    ];
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Active Source Viewer Drawer State
  const [activeSource, setActiveSource] = useState(null);

  // Modal Visibility States & Selected Report Doc
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isReportWizardOpen, setIsReportWizardOpen] = useState(false);
  const [selectedReportDocId, setSelectedReportDocId] = useState("all");

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("sankalan_documents", JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem("sankalan_reports", JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem("sankalan_queries", JSON.stringify(recentQueries));
  }, [recentQueries]);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const canUpload = permissions.canUpload;
  const canGenerateReport = permissions.canGenerateReports;
  const isViewer = permissions.isViewer;

  // Filter documents by active auth org scope
  const getScopedDocuments = () => {
    if (currentOrg.id === "CIL" || permissions.canViewAllOrgs) {
      return documents;
    }
    return documents.filter((d) => d.organization === currentOrg.id || d.organization === "CIL");
  };

  // Filter reports by active auth org scope
  const getScopedReports = () => {
    if (currentOrg.id === "CIL" || permissions.canViewAllOrgs) {
      return reports;
    }
    return reports.filter((r) => r.subsidiary?.includes(currentOrg.shortName) || r.organization === currentOrg.id);
  };

  const addDocument = (newDoc) => {
    if (!canUpload) {
      showToast("Your current role does not have permission to perform this action.", "warning");
      return;
    }
    const docWithOrg = { ...newDoc, organization: currentOrg.id, subsidiary: currentOrg.name };
    setDocuments((prev) => [docWithOrg, ...prev]);
    showToast(`Document "${newDoc.title}" indexed under ${currentOrg.shortName}!`, "success");
  };

  const deleteDocument = (docId) => {
    if (!canUpload) {
      showToast("Your current role does not have permission to perform this action.", "warning");
      return;
    }
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    showToast("Document removed from scope library", "info");
  };

  const addReport = (newReport) => {
    if (!canGenerateReport) {
      showToast("Your current role does not have permission to perform this action.", "warning");
      return;
    }
    const reportWithOrg = { ...newReport, organization: currentOrg.id, subsidiary: currentOrg.name };
    setReports((prev) => [reportWithOrg, ...prev]);
    showToast(`Report "${newReport.title}" generated & saved!`, "success");
  };

  const deleteReport = (reportId) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
    showToast("Report deleted from history", "info");
  };

  const addQueryToHistory = (query) => {
    if (!recentQueries.includes(query)) {
      setRecentQueries((prev) => [query, ...prev.slice(0, 9)]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentOrg,
        currentRole,
        documents,
        scopedDocuments: getScopedDocuments(),
        reports,
        scopedReports: getScopedReports(),
        recentQueries,
        toast,
        activeSource,
        isUploadOpen,
        isReportWizardOpen,
        selectedReportDocId,
        setSelectedReportDocId,
        canUpload,
        canGenerateReport,
        isViewer,
        showToast,
        addDocument,
        deleteDocument,
        addReport,
        deleteReport,
        addQueryToHistory,
        setActiveSource,
        setIsUploadOpen,
        setIsReportWizardOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
