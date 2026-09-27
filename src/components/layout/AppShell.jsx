import React from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Toast } from "../common/Toast";
import { UploadModal } from "../documents/UploadModal";
import { ReportWizardModal } from "../reports/ReportWizardModal";
import { SourceViewerDrawer } from "../common/SourceViewerDrawer";

export const AppShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-body-md text-on-surface">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main App Layout Grid */}
      <div className="flex pt-16 flex-1 w-full max-w-[1600px] mx-auto">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content Viewport */}
        <main className="flex-1 p-margin-desktop min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Modals, Toast, and Drawers */}
      <Toast />
      <UploadModal />
      <ReportWizardModal />
      <SourceViewerDrawer />
    </div>
  );
};
