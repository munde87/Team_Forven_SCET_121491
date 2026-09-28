import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAppShell = location.pathname !== "/";
  const { user, currentOrg, currentRole, isAuthenticated, logout } = useAuth();
  const { lang, toggleLanguage, t } = useLanguage();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container-highest/80 shadow-[0_1px_8px_rgba(10,25,47,0.05)]">
      <div className="h-16 w-full px-margin-desktop flex items-center justify-between gap-space-md">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm group">
            <img
              src="/sankalan_logo.png"
              alt="Sankalan AI Logo"
              className="w-10 h-10 rounded-lg object-contain shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface font-black text-primary">SANKALAN AI</span>
              <span className="font-label-sm text-[10px] tracking-wide text-secondary uppercase font-bold">{t.platformTitle}</span>
            </div>
          </Link>

          <div className="h-6 w-px bg-surface-container-highest hidden lg:block"></div>

          {/* Org & Role Active Scope Badge */}
          {isAppShell && isAuthenticated && currentOrg && currentRole && (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-surface-container-low border border-surface-container-highest">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="font-bold text-xs text-on-surface font-mono">{currentOrg.shortName}</span>
                <span className="text-secondary text-xs">•</span>
                <span className="text-xs text-secondary font-medium">{currentRole.name}</span>
              </div>
              <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 font-mono text-[10px] font-bold">
                <span>{t.demoMode}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Actions & Profile Menu */}
        <div className="flex items-center gap-space-md relative">
          
          {/* Multilingual Toggle Button (as in user screenshot) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-highest text-on-surface font-bold text-xs transition-colors shadow-2xs"
            title="Switch Language / भाषा बदलें"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">g_translate</span>
            <span className="font-mono">{lang === "en" ? "HI 🇮🇳" : "EN 🇬🇧"}</span>
          </button>

          {/* System Active Badge */}
          <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded-lg border border-surface-container-highest">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">{t.systemActive}</span>
          </div>

          {/* Launch / Home / Login Navigation */}
          {!isAppShell ? (
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="inline-flex items-center justify-center gap-space-xs px-space-lg h-9 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary-container transition-all active:scale-95"
            >
              <span>{isAuthenticated ? "Launch Platform" : "Sign In to Platform"}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-space-xs px-space-md h-9 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm border border-surface-container-highest hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span className="hidden sm:inline">Landing</span>
            </Link>
          )}

          {/* Profile Dropdown Trigger */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-full bg-surface-container hover:bg-surface-container-high border border-surface-container-highest transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-bold font-mono">
                  {(user?.name || "U").slice(0, 2).toUpperCase()}
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-11 w-72 bg-surface-container-lowest rounded-xl shadow-2xl border border-surface-container-highest p-3 z-50 space-y-3 animate-fade-in">
                  
                  {/* User Profile Header info */}
                  <div className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface truncate">{user?.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px] font-bold">
                        {currentOrg?.shortName}
                      </span>
                    </div>
                    <p className="text-[11px] text-secondary">{user?.email}</p>
                    <div className="pt-1 border-t border-surface-container-high flex items-center justify-between text-[10px]">
                      <span className="text-secondary">Role: <strong>{currentRole?.name}</strong></span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Authenticated
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">logout</span>
                      <span>Logout</span>
                    </button>
                  </div>

                  <div className="border-t border-surface-container-high pt-2 text-center">
                    <span className="text-[10px] text-secondary font-mono">
                      Sankalan AI SIH Demo Access • Active Session
                    </span>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1 px-3 h-8 rounded bg-primary/10 text-primary font-bold text-xs hover:bg-primary/20 transition-colors"
            >
              <span>Sign In</span>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};
