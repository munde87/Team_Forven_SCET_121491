import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export const Sidebar = () => {
  const location = useLocation();
  const { setIsUploadOpen, setIsReportWizardOpen } = useApp();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "AI Query & Evidence", path: "/ai-query", icon: "smart_toy", badge: "Verified" },
    { name: "Document Library", path: "/documents", icon: "description" },
    { name: "Document Intelligence", path: "/document-intelligence", icon: "category" },
    { name: "Object Storage Vault", path: "/storage", icon: "folder_zip", badge: "Raw S3" },
    { name: "Statutory Reports", path: "/reports", icon: "summarize" },
    { name: "Mining Intelligence", path: "/mining-intelligence", icon: "monitoring" }
  ];

  return (
    <aside className="w-64 shrink-0 bg-surface-container-lowest border-r border-surface-container-highest flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 z-40">
      <div className="p-space-md flex flex-col gap-space-md">
        {/* Module Nav Section Title */}
        <div className="px-space-xs flex items-center justify-between text-secondary">
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">Platform Modules</span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-space-md py-2.5 rounded-lg font-label-md text-label-md transition-all ${
                  isActive
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "text-on-surface hover:bg-surface-container-low hover:text-primary"
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? "text-on-primary" : "text-primary"}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? "bg-on-primary/20 text-on-primary" : "bg-surface-container text-primary"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <hr className="border-surface-container-high my-space-xs" />

        {/* Quick Actions Shortcuts */}
        <div className="flex flex-col gap-space-xs">
          <span className="px-space-xs font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Quick Actions
          </span>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container hover:text-primary transition-colors text-left"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">cloud_upload</span>
            <span>Upload Document</span>
          </button>
          <button
            onClick={() => setIsReportWizardOpen(true)}
            className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container hover:text-primary transition-colors text-left"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">add_chart</span>
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Footer Prototype Disclaimer Badge */}
      <div className="p-space-md border-t border-surface-container-highest bg-surface-container-low/60">
        <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm mb-1">
          <span className="material-symbols-outlined text-primary text-[16px]">info</span>
          <span className="font-bold">Prototype Demo</span>
        </div>
        <p className="font-body-sm text-body-sm text-secondary leading-tight">
          Sample Data — Evidence-first verification pipeline active.
        </p>
      </div>
    </aside>
  );
};
