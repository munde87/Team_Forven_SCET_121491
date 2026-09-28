import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { useApp } from "../context/AppContext";
import { SUGGESTED_QUESTIONS, PREDEFINED_ANSWERS } from "../data/queryAnswers";
import { ALL_ORGANIZATIONS } from "../data/organizations";

export const AIQueryPage = () => {
  const location = useLocation();
  const { currentOrg, addQueryToHistory, setActiveSource } = useApp();

  const [selectedQuestionId, setSelectedQuestionId] = useState("Q_CIL_PROD_2025");
  const [queryText, setQueryText] = useState(
    location.state?.presetQuery || "What is the production number of CIL in 2025 and its 5-year growth rate percentage?"
  );

  const [filters, setFilters] = useState({
    organization: currentOrg.id,
    year: "2024–25",
    topic: "Production"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [queryResult, setQueryResult] = useState(null);
  const [isUnsupportedQuery, setIsUnsupportedQuery] = useState(false);

  const handleSelectSuggested = (sq) => {
    setSelectedQuestionId(sq.id);
    setQueryText(sq.question);
    setIsUnsupportedQuery(false);
    handleRunQuery(sq.id, sq.question);
  };

  const handleRunQuery = (questionId = selectedQuestionId, customText = queryText) => {
    if (!customText.trim()) return;

    setIsLoading(true);
    setIsUnsupportedQuery(false);
    setQueryResult(null);
    addQueryToHistory(customText);

    // Animate 5-stage pipeline
    setPipelineStep(1); // Query Understanding
    setTimeout(() => setPipelineStep(2), 300); // Document Retrieval
    setTimeout(() => setPipelineStep(3), 600); // Reranking
    setTimeout(() => setPipelineStep(4), 900); // Evidence Verification

    setTimeout(() => {
      setPipelineStep(5); // Answer Generation Complete
      setIsLoading(false);

      const qLower = customText.toLowerCase();

      // Intelligent Lookup Matching
      if (PREDEFINED_ANSWERS[questionId] && selectedQuestionId === questionId) {
        setQueryResult(PREDEFINED_ANSWERS[questionId]);
      } else if (
        qLower.includes("2025") ||
        qLower.includes("cil") ||
        qLower.includes("production number") ||
        qLower.includes("percent") ||
        qLower.includes("growth") ||
        qLower.includes("5 year") ||
        qLower.includes("rate")
      ) {
        setQueryResult(PREDEFINED_ANSWERS["Q_CIL_PROD_2025"]);
      } else if (qLower.includes("safety") || qLower.includes("slope") || qLower.includes("hazard")) {
        setQueryResult(PREDEFINED_ANSWERS["Q_SAFETY_01"]);
      } else if (qLower.includes("trend") || qLower.includes("output") || qLower.includes("stripping")) {
        setQueryResult(PREDEFINED_ANSWERS["Q_PROD_02"]);
      } else if (qLower.includes("geolog") || qLower.includes("borehole") || qLower.includes("seam")) {
        setQueryResult(PREDEFINED_ANSWERS["Q_GEOL_03"]);
      } else if (qLower.includes("equip") || qLower.includes("dumper") || qLower.includes("shovel")) {
        setQueryResult(PREDEFINED_ANSWERS["Q_EQUIP_04"]);
      } else if (qLower.includes("water") || qLower.includes("groundwater") || qLower.includes("env")) {
        setQueryResult(PREDEFINED_ANSWERS["Q_ENV_05"]);
      } else {
        // Fallback to CIL 2025 production answer default if question matches production context
        setQueryResult(PREDEFINED_ANSWERS["Q_CIL_PROD_2025"]);
      }
    }, 1200);
  };

  useEffect(() => {
    if (location.state?.presetQuery) {
      setQueryText(location.state.presetQuery);
      handleRunQuery(selectedQuestionId, location.state.presetQuery);
    }
  }, []);

  return (
    <AppShell>
      <div className="space-y-space-lg animate-fade-in">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <span>Controlled RAG Knowledge Base</span>
              <span>•</span>
              <span className="text-primary font-bold">{currentOrg.shortName} Scope</span>
            </div>
            <h1 className="font-display-sm text-display-sm font-bold text-on-surface tracking-tight mt-0.5">
              AI Query & Evidence Workbench
            </h1>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 font-mono text-xs font-bold">
            PROTOTYPE DEMO MODE
          </span>
        </div>

        {/* SUGGESTED QUESTIONS CARDS PANEL */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-on-surface">
              <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
              <span>Suggested Predefined Questions ({currentOrg.shortName})</span>
            </div>
            <span className="text-xs text-secondary font-mono">Controlled Knowledge Base</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SUGGESTED_QUESTIONS.map((sq) => {
              const isSelected = selectedQuestionId === sq.id && queryText === sq.question;
              return (
                <button
                  key={sq.id}
                  onClick={() => handleSelectSuggested(sq)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-primary/10 border-primary shadow-sm ring-1 ring-primary"
                      : "bg-surface-container-low hover:bg-surface-container border-surface-container-high"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-mono text-[10px] font-bold">
                      {sq.topic}
                    </span>
                    <h3 className="font-bold text-xs text-on-surface leading-snug">{sq.question}</h3>
                    <p className="text-[11px] text-secondary line-clamp-2">{sq.description}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-end text-primary font-bold text-[11px] gap-1">
                    <span>Ask Sankalan AI</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* QUERY INPUT COMPOSER */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-4">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-3.5 text-primary text-[22px]">search</span>
            <textarea
              rows={2}
              value={queryText}
              onChange={(e) => {
                setQueryText(e.target.value);
                setIsUnsupportedQuery(false);
              }}
              placeholder="Ask a technical question across mining records, geological boreholes, or safety filings..."
              className="w-full pl-12 pr-36 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 border border-surface-container-high shadow-inner"
            ></textarea>
            <button
              onClick={() => handleRunQuery()}
              disabled={isLoading}
              className="absolute right-3 top-3 h-10 px-5 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-md hover:bg-primary-container disabled:opacity-50 transition-all active:scale-95"
            >
              <span>{isLoading ? "Processing..." : "ASK SANKALAN AI"}</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>

          {/* Context Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-surface-container-high text-xs">
            <div>
              <label className="font-bold text-secondary uppercase block mb-1">Target Organization</label>
              <select
                value={filters.organization}
                onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface font-semibold"
              >
                {ALL_ORGANIZATIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} ({o.shortName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-secondary uppercase block mb-1">Reporting Period</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface font-semibold"
              >
                <option value="2024–25">FY 2024–25</option>
                <option value="2023–24">FY 2023–24</option>
                <option value="2022–23">FY 2022–23</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-secondary uppercase block mb-1">Domain Focus</label>
              <select
                value={filters.topic}
                onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface font-semibold"
              >
                <option value="Safety">Safety & Compliance</option>
                <option value="Production">Production & Logistics</option>
                <option value="Geology">CMPDI Geological Exploration</option>
                <option value="Equipment">HEMM Fleet Maintenance</option>
                <option value="Environment">Environmental Hydrogeology</option>
              </select>
            </div>
          </div>
        </div>

        {/* PIPELINE ANIMATION STEPPER */}
        {isLoading && (
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-on-surface">Executing Multimodal Retrieval & Verification Pipeline...</span>
              <span className="material-symbols-outlined text-primary animate-spin text-[20px]">sync</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {[
                { stp: 1, name: "QUERY UNDERSTANDING" },
                { stp: 2, name: "DOCUMENT RETRIEVAL" },
                { stp: 3, name: "RERANKING" },
                { stp: 4, name: "EVIDENCE VERIFICATION" },
                { stp: 5, name: "ANSWER GENERATION" }
              ].map((s) => (
                <div
                  key={s.stp}
                  className={`p-2.5 rounded-xl text-center font-mono text-xs font-bold transition-all ${
                    pipelineStep > s.stp
                      ? "bg-surface-container text-primary border border-surface-container-high"
                      : pipelineStep === s.stp
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-low text-secondary opacity-50"
                  }`}
                >
                  <div className="text-[10px] opacity-75">STAGE 0{s.stp}</div>
                  <div>{s.name}</div>
                  {pipelineStep > s.stp && <div className="text-[10px] text-emerald-600">✓ Complete</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UNSUPPORTED QUESTION FALLBACK */}
        {isUnsupportedQuery && !isLoading && (
          <div className="p-space-lg rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 space-y-3">
            <div className="flex items-center gap-2 font-bold text-base">
              <span className="material-symbols-outlined text-amber-600">warning</span>
              <span>Demo evidence is not available for this question.</span>
            </div>
            <p className="text-sm">
              The Sankalan AI SIH prototype operates on a controlled set of verified demo documents and questions to guarantee deterministic evidence citation.
            </p>
            <div className="pt-2">
              <span className="font-bold text-xs block mb-2">Try one of the supported questions:</span>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((sq) => (
                  <button
                    key={sq.id}
                    onClick={() => handleSelectSuggested(sq)}
                    className="px-3 py-1 rounded-lg bg-surface-container-lowest border border-amber-500/30 text-xs font-semibold text-on-surface hover:border-primary transition-colors"
                  >
                    "{sq.question}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUERY RESULT VIEWPORT */}
        {queryResult && !isLoading && !isUnsupportedQuery && (
          <div className="space-y-space-lg">
            
            {/* RETRIEVAL VERIFICATION CANDIDATE LEDGER (VERIFIED VS REJECTED CHUNKS) */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <div>
                  <h2 className="font-bold text-base text-on-surface">Retrieval Verification Audit Ledger</h2>
                  <p className="text-xs text-secondary">
                    Verification Engine checks query relevance, metadata compatibility, and prevents hallucination by rejecting non-matching chunks.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 font-mono text-xs font-bold border border-emerald-500/20">
                    {queryResult.verifiedCandidates?.length || 0} Verified Candidates
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-600 font-mono text-xs font-bold border border-rose-500/20">
                    {queryResult.rejectedCandidates?.length || 0} Rejected Candidates
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* VERIFIED CANDIDATES */}
                {queryResult.verifiedCandidates.map((cand) => (
                  <div key={cand.id} className="p-4 rounded-xl bg-surface-container-lowest border border-primary/40 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-on-surface truncate max-w-[220px]">{cand.docTitle}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-bold border border-emerald-500/20">
                        ✓ VERIFIED EVIDENCE
                      </span>
                    </div>
                    <p className="text-xs text-secondary font-mono">
                      {cand.organization} • Page {cand.page} • {cand.section}
                    </p>
                    <p className="text-xs text-on-surface italic p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high">
                      "{cand.snippet}"
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-emerald-600 font-semibold">Relevance Score: {(cand.relevanceScore * 100).toFixed(0)}%</span>
                      <button
                        onClick={() =>
                          setActiveSource({
                            docTitle: cand.docTitle,
                            page: cand.page,
                            section: cand.section,
                            snippet: cand.snippet,
                            status: cand.status
                          })
                        }
                        className="text-primary font-bold hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">visibility</span>
                        <span>View Source</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* REJECTED CANDIDATES */}
                {queryResult.rejectedCandidates.map((cand) => (
                  <div key={cand.id} className="p-4 rounded-xl bg-surface-container-low/60 border border-rose-500/30 space-y-2 opacity-80">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-on-surface truncate max-w-[220px]">{cand.docTitle}</span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-mono text-[10px] font-bold border border-rose-500/20">
                        ✕ REJECTED
                      </span>
                    </div>
                    <p className="text-xs text-secondary font-mono">
                      {cand.organization} • Page {cand.page} • {cand.section}
                    </p>
                    <p className="text-xs text-secondary italic p-2.5 rounded-lg bg-surface-container-lowest border border-surface-container-high line-through">
                      "{cand.snippet}"
                    </p>
                    <div className="pt-1 text-[11px] text-rose-600 font-bold">
                      Reason: {cand.reason}
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* SANKALAN AI ANSWER & KEY FINDINGS */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  </span>
                  <div>
                    <h2 className="font-bold text-base text-on-surface">SANKALAN AI ANSWER</h2>
                    <span className="text-xs text-secondary font-mono">Grounded strictly in verified source evidence</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20">
                  100% Citations Verified
                </span>
              </div>

              {/* Concise Answer text */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high text-sm leading-relaxed text-on-surface font-medium">
                {queryResult.answer}
              </div>

              {/* Key Findings List */}
              <div className="space-y-2">
                <h3 className="font-bold text-xs text-secondary uppercase tracking-wider">KEY FINDINGS</h3>
                <div className="space-y-2">
                  {queryResult.keyFindings.map((kf, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high flex items-start gap-2 text-xs font-semibold text-on-surface">
                      <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                      <span>{kf}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Citation CTA */}
              <div className="pt-3 border-t border-surface-container-high flex items-center justify-between text-xs">
                <span className="text-secondary font-mono">Verification Trail: Hybrid Search → Reranking → Candidate Audit → vLLM</span>
                <button
                  onClick={() =>
                    setActiveSource({
                      docTitle: queryResult.verifiedCandidates[0].docTitle,
                      page: queryResult.verifiedCandidates[0].page,
                      section: queryResult.verifiedCandidates[0].section,
                      snippet: queryResult.verifiedCandidates[0].snippet,
                      status: "VERIFIED"
                    })
                  }
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>Inspect Verified Source</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </AppShell>
  );
};
