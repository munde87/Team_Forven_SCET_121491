import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DEMO_USERS } from "../data/users";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsPreset } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fromPath = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username/email and password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(username, password);
      setIsLoading(false);
      if (res.success) {
        navigate(fromPath, { replace: true });
      } else {
        setError(res.error);
      }
    }, 400);
  };

  const handleSelectPreset = (userKey) => {
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      const res = loginAsPreset(userKey);
      setIsLoading(false);
      if (res.success) {
        navigate(fromPath, { replace: true });
      } else {
        setError(res.error);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden font-body-md text-on-surface">
      
      {/* Subtle Background Watermark Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-5xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-highest overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Branding Side (5 Cols) */}
        <div className="lg:col-span-5 p-8 bg-surface-container-low border-b lg:border-b-0 lg:border-r border-surface-container-high flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md">
                <span className="material-symbols-outlined text-[24px]">layers</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-extrabold uppercase tracking-tight text-on-surface">SANKALAN AI</span>
                <span className="text-xs text-secondary font-semibold uppercase tracking-wider">Mining Intelligence Platform</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-on-surface tracking-tight leading-snug">
                Sovereign Energy & Multimodal Mining RAG
              </h2>
              <p className="text-xs text-secondary leading-relaxed">
                Ingest heterogeneous mining records, statutory filings, and CMPDI boreholes with 100% evidence verification and page citation provenance.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-on-surface font-semibold">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span>Role-Scoped Subsidiary Data Protection</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-surface font-semibold">
                <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
                <span>Anti-Hallucination Retrieval Verification</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-surface font-semibold">
                <span className="material-symbols-outlined text-primary text-[18px]">summarize</span>
                <span>Automated Statutory Report Generation</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-container border border-surface-container-high text-[11px] text-secondary font-mono leading-relaxed">
            <span className="font-bold text-primary block mb-0.5">Prototype Authentication Environment</span>
            Role-based access simulation for SIH prototype demonstration. Sample data only.
          </div>
        </div>

        {/* Right Form & Preset Login Cards Side (7 Cols) */}
        <div className="lg:col-span-7 p-8 space-y-6 flex flex-col justify-between">
          
          <div>
            <div className="space-y-1 mb-6">
              <h1 className="text-2xl font-bold text-on-surface tracking-tight">Welcome to Sankalan AI</h1>
              <p className="text-xs text-secondary font-medium">
                Mining Intelligence & Evidence Platform — Enter credentials or select a demo role.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Standard Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                  Email / Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. cil.admin or ecl.analyst"
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 px-3 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                <span className="material-symbols-outlined text-[18px]">login</span>
              </button>
            </form>
          </div>

          {/* 1-Click SIH Presentation Demo Account Selector */}
          <div className="pt-4 border-t border-surface-container-high space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                Demo Access (1-Click SIH Presentation Login)
              </span>
              <span className="text-[11px] text-primary font-mono font-semibold">Click to Sign In</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.key}
                  type="button"
                  onClick={() => handleSelectPreset(u.key)}
                  className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-on-surface font-mono">{u.organization.shortName}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${u.badgeColor}`}>
                        {u.role.name.split(" ")[1] || u.role.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-secondary font-medium block truncate">{u.name}</span>
                  </div>
                  <span className="text-[10px] text-primary font-mono font-bold mt-1 group-hover:underline">
                    Login →
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
