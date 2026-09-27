import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { useApp } from "../context/AppContext";
import { ALL_ORGANIZATIONS } from "../data/organizations";
import { DEMO_TOPIC_DICTIONARY } from "../data/wordCloudData";
import { MINING_ENTITIES } from "../data/entities";
import { getKeywordIntelligence } from "../data/keywordIntelligenceData";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

export const MiningIntelligencePage = () => {
  const navigate = useNavigate();
  const { currentOrg, currentRole, scopedDocuments, setActiveSource, setIsReportWizardOpen } = useApp();

  // Custom Keyword Search State — Initialized with Slope Stability for rich initial demo data
  const [keywordInput, setKeywordInput] = useState("Slope Stability");
  const [activeSearchKeyword, setActiveSearchKeyword] = useState("Slope Stability");

  // Existing Filter States
  const [filterOrg, setFilterOrg] = useState(currentOrg.id);
  const [filterMine, setFilterMine] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterTopic, setFilterTopic] = useState("All");

  const isApexAdmin = currentRole?.canViewAllOrgs === true;

  // Selected Organization Object
  const selectedOrgObj = useMemo(() => {
    return ALL_ORGANIZATIONS.find((o) => o.id === (isApexAdmin ? filterOrg : currentOrg.id)) || ALL_ORGANIZATIONS[0];
  }, [filterOrg, currentOrg.id, isApexAdmin]);

  // Mines list for selected organization
  const availableMines = useMemo(() => {
    return selectedOrgObj.mines || ["All Mines"];
  }, [selectedOrgObj]);

  // Handle Search Submission
  const handleRunSearch = (termToSearch = keywordInput) => {
    const trimmed = termToSearch.trim();
    setActiveSearchKeyword(trimmed);
    setKeywordInput(trimmed);
  };

  // Handle Clear Search
  const handleClearSearch = () => {
    setKeywordInput("");
    setActiveSearchKeyword("");
  };

  // Handle Word Cloud Term Click (Requirement 16)
  const handleWordClick = (wordText) => {
    setKeywordInput(wordText);
    handleRunSearch(wordText);
  };

  // Filtered Documents Calculation (Requirement 11 & 18)
  const filteredDocs = useMemo(() => {
    return scopedDocuments.filter((doc) => {
      // Org filter check
      if (isApexAdmin && filterOrg !== "All" && doc.organization !== filterOrg) return false;

      // Dropdown filters
      if (filterMine !== "All" && doc.mine !== filterMine) return false;
      if (filterYear !== "All" && doc.year !== filterYear) return false;
      if (filterType !== "All" && doc.type !== filterType) return false;
      if (filterTopic !== "All" && !doc.topics?.includes(filterTopic)) return false;

      // Custom Keyword Search Match across title, summary, keywords, topics
      if (activeSearchKeyword) {
        const query = activeSearchKeyword.toLowerCase();
        const inTitle = doc.title?.toLowerCase().includes(query);
        const inSummary = doc.summary?.toLowerCase().includes(query);
        const inKeywords = doc.keywords?.some((k) => k.toLowerCase().includes(query));
        const inTopics = doc.topics?.some((t) => t.toLowerCase().includes(query));
        const inMine = doc.mine?.toLowerCase().includes(query);

        if (!inTitle && !inSummary && !inKeywords && !inTopics && !inMine) {
          return false;
        }
      }

      return true;
    });
  }, [scopedDocuments, isApexAdmin, filterOrg, filterMine, filterYear, filterType, filterTopic, activeSearchKeyword]);

  // Dynamic Word Cloud Terms Recalculation (Requirement 12)
  const dynamicWordCloud = useMemo(() => {
    let rawTerms = [];

    // If searching active keyword, generate related concept words around it
    if (activeSearchKeyword) {
      const q = activeSearchKeyword.toLowerCase();
      if (q.includes("ventilation") || q.includes("safety") || q.includes("hazard")) {
        rawTerms = DEMO_TOPIC_DICTIONARY.Safety;
      } else if (q.includes("coal") || q.includes("production") || q.includes("stripping")) {
        rawTerms = DEMO_TOPIC_DICTIONARY.Production;
      } else if (q.includes("geology") || q.includes("seam") || q.includes("borehole")) {
        rawTerms = DEMO_TOPIC_DICTIONARY.Geology;
      } else if (q.includes("equipment") || q.includes("dumper") || q.includes("shovel")) {
        rawTerms = DEMO_TOPIC_DICTIONARY.Equipment;
      } else if (q.includes("water") || q.includes("groundwater") || q.includes("environment")) {
        rawTerms = DEMO_TOPIC_DICTIONARY.Environment;
      } else {
        Object.values(DEMO_TOPIC_DICTIONARY).forEach((list) => rawTerms.push(...list));
      }
    } else if (filterTopic !== "All" && DEMO_TOPIC_DICTIONARY[filterTopic]) {
      rawTerms = DEMO_TOPIC_DICTIONARY[filterTopic];
    } else {
      Object.values(DEMO_TOPIC_DICTIONARY).forEach((list) => rawTerms.push(...list));
    }

    const multiplier = Math.max(0.7, filteredDocs.length / Math.max(1, scopedDocuments.length));
    return rawTerms.slice(0, 20).map((t) => ({
      ...t,
      calcWeight: Math.round(t.weight * multiplier)
    }));
  }, [activeSearchKeyword, filterTopic, filteredDocs.length, scopedDocuments.length]);

  // Related Topics calculated from filtered document matches (Requirement 15)
  const matchedRelatedTopics = useMemo(() => {
    const set = new Set();
    filteredDocs.forEach((d) => {
      d.topics?.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, [filteredDocs]);

  // Trend Chart Data
  const trendChartData = useMemo(() => {
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    return months.map((m, idx) => ({
      month: m,
      rawCoal: Math.round(50 + Math.sin(idx) * 10 + filteredDocs.length * 3),
      overburden: Math.round(130 + Math.cos(idx) * 20 + filteredDocs.length * 5)
    }));
  }, [filteredDocs.length]);

  // Active Keyword Intelligence Data (Telemetry, Key Metrics, Facts, Sample Extracts)
  const activeKeywordIntelligence = useMemo(() => {
    if (!activeSearchKeyword) return null;
    return getKeywordIntelligence(activeSearchKeyword);
  }, [activeSearchKeyword]);

  return (
    <AppShell>
      <div className="space-y-space-lg animate-fade-in">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-wider">
              <span>Sovereign Intelligence Workbench</span>
              <span>•</span>
              <span className="text-primary font-bold">{currentOrg.shortName} Scope</span>
            </div>
            <h1 className="font-display-sm text-display-sm font-bold text-on-surface tracking-tight mt-0.5">
              Document & Topic Intelligence
            </h1>
            <p className="text-secondary text-sm">
              Explore patterns, topics, custom keywords and relationships across the selected document collection.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 font-mono text-xs font-bold">
            PROTOTYPE DEMO MODE
          </span>
        </div>

        {/* PROMINENT CUSTOM KEYWORD SEARCH BAR (Requirement 10 & 11) */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-primary">
              Explore a Topic or Keyword
            </label>
            <p className="text-xs text-secondary">
              Enter any keyword, topic, mine, equipment, or geological term to search across your accessible demo document collection.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-primary text-[20px]">search</span>
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRunSearch()}
                placeholder="Enter a keyword, topic, mine, equipment, geological term... (e.g. ventilation, coal, safety)"
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface text-sm font-semibold border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-inner"
              />
            </div>

            <button
              onClick={() => handleRunSearch()}
              className="px-6 h-11 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-container transition-all flex items-center gap-1.5"
            >
              <span>Search</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {activeSearchKeyword && (
              <button
                onClick={handleClearSearch}
                className="px-4 h-11 rounded-xl bg-surface-container text-secondary hover:text-on-surface font-bold text-xs transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
                <span>Clear Search</span>
              </button>
            )}
          </div>

          {/* Filter Bar (Requirement 13) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-3 border-t border-surface-container-high text-xs">
            <div>
              <label className="font-bold text-secondary uppercase block mb-1">Organization Scope</label>
              <select
                value={isApexAdmin ? filterOrg : currentOrg.id}
                disabled={!isApexAdmin}
                onChange={(e) => setFilterOrg(e.target.value)}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface font-semibold disabled:opacity-75"
              >
                {isApexAdmin ? (
                  ALL_ORGANIZATIONS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.shortName} — {o.name}
                    </option>
                  ))
                ) : (
                  <option value={currentOrg.id}>{currentOrg.shortName} ({currentOrg.name})</option>
                )}
              </select>
            </div>

            <div>
              <label className="font-bold text-secondary uppercase block mb-1">Mine Site</label>
              <select
                value={filterMine}
                onChange={(e) => setFilterMine(e.target.value)}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface font-semibold"
              >
                <option value="All">All Mines</option>
                {availableMines.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-secondary uppercase block mb-1">Reporting Year</label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface font-semibold"
              >
                <option value="All">All Years</option>
                <option value="2024–25">2024–25</option>
                <option value="2023–24">2023–24</option>
                <option value="2022–23">2022–23</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-secondary uppercase block mb-1">Document Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface font-semibold"
              >
                <option value="All">All Types</option>
                <option value="Safety Report">Safety Report</option>
                <option value="Production Report">Production Report</option>
                <option value="Geological Report">Geological Report</option>
                <option value="Hydrogeological Report">Hydrogeological Report</option>
                <option value="Equipment Report">Equipment Report</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-secondary uppercase block mb-1">Topic Category</label>
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="w-full h-9 px-2 rounded-lg bg-surface-container-low border border-surface-container-high text-on-surface font-semibold"
              >
                <option value="All">All Topics</option>
                <option value="Safety">Safety</option>
                <option value="Production">Production</option>
                <option value="Geology">Geology</option>
                <option value="Equipment">Equipment</option>
                <option value="Environment">Environment</option>
              </select>
            </div>
          </div>
        </div>

        {/* DYNAMIC CLICKABLE WORD CLOUD SECTION (Requirement 12 & 16) */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
            <div>
              <h2 className="font-bold text-base text-on-surface">
                Key Topics & Terms (Interactive Clickable Word Cloud)
              </h2>
              <p className="text-xs text-secondary">
                Click any term to automatically populate the search box and load its telemetry, insights, metrics and source documents.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-surface-container text-primary font-bold">
              {dynamicWordCloud.length} Terms Rendered
            </span>
          </div>

          <div className="min-h-48 p-6 rounded-xl bg-surface-container-low/60 border border-surface-container-high flex flex-wrap items-center justify-center gap-3">
            {dynamicWordCloud.map((term, idx) => {
              const isSelected = activeSearchKeyword.toLowerCase() === term.text.toLowerCase();
              const fontSize = Math.max(12, Math.min(32, Math.round(term.calcWeight / 3)));
              return (
                <button
                  key={idx}
                  onClick={() => handleWordClick(term.text)}
                  style={{ fontSize: `${fontSize}px` }}
                  className={`px-3.5 py-1.5 rounded-xl transition-all font-bold ${
                    isSelected
                      ? "bg-primary text-on-primary shadow-lg scale-110 ring-2 ring-primary-container"
                      : "bg-surface-container-lowest text-on-surface border border-surface-container-high hover:border-primary hover:text-primary"
                  }`}
                  title={`Click to view data for: ${term.text}`}
                >
                  {term.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* DETAILED KEYWORD INTELLIGENCE & DUMMY DATA PANEL */}
        {activeKeywordIntelligence && (
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border-2 border-primary/30 shadow-md space-y-5 animate-fade-in">
            {/* Header with Title & Category */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary text-on-primary shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">analytics</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                      KEYWORD INTELLIGENCE & TELEMETRY DATA
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold">
                      {activeKeywordIntelligence.category}
                    </span>
                  </div>
                  <h2 className="font-display-xs text-lg font-black text-on-surface tracking-tight">
                    {activeKeywordIntelligence.keyword}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <button
                  onClick={() => {
                    setIsReportWizardOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary font-extrabold text-xs shadow-md hover:bg-primary-container transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  <span>Generate Sovereign Report for "{activeKeywordIntelligence.keyword}"</span>
                </button>

                <span className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-secondary font-mono">
                  Matched Docs: <strong className="text-primary">{filteredDocs.length}</strong>
                </span>
                <span className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container-high text-secondary font-mono">
                  Citations: <strong className="text-primary">{filteredDocs.length * 3}</strong>
                </span>
              </div>
            </div>

            {/* Keyword Definition Overview */}
            <p className="text-xs text-secondary leading-relaxed bg-surface-container-low/70 p-3 rounded-xl border border-surface-container-high">
              <span className="font-bold text-on-surface">Domain Overview: </span>
              {activeKeywordIntelligence.definition}
            </p>

            {/* Key Metrics Grid */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-secondary mb-2.5">
                Target Telemetry & Benchmark Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {activeKeywordIntelligence.metrics.map((metric, midx) => (
                  <div
                    key={midx}
                    className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high space-y-1"
                  >
                    <span className="text-[11px] font-bold text-secondary block truncate">{metric.label}</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-base font-black text-on-surface font-mono">{metric.value}</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-bold">
                        {metric.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-secondary/80 block font-mono">Target: {metric.target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2-SubColumn Layout: Extracted Insights + Sample Citation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1">
              
              {/* Extracted Findings List */}
              <div className="md:col-span-7 space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-secondary">
                  Extracted Operational Insights & Verified Facts
                </h3>
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high space-y-2.5">
                  {activeKeywordIntelligence.facts.map((fact, fidx) => (
                    <div key={fidx} className="flex items-start gap-2.5 text-xs text-on-surface">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                      <span className="leading-snug">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Evidence Snippet & Linked Entities */}
              <div className="md:col-span-5 space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-secondary">
                  Sample Source Citation & Bounding Box
                </h3>
                
                {activeKeywordIntelligence.sampleExtract && (
                  <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container-high space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-primary font-bold">
                      <span className="truncate">{activeKeywordIntelligence.sampleExtract.docTitle}</span>
                      <span className="font-mono text-secondary shrink-0">Page {activeKeywordIntelligence.sampleExtract.page}</span>
                    </div>
                    <p className="text-xs text-on-surface italic line-clamp-3 bg-surface-container-lowest p-2 rounded-lg border border-surface-container-high">
                      "{activeKeywordIntelligence.sampleExtract.text}"
                    </p>
                    <button
                      onClick={() =>
                        setActiveSource({
                          docTitle: activeKeywordIntelligence.sampleExtract.docTitle,
                          page: activeKeywordIntelligence.sampleExtract.page,
                          section: activeKeywordIntelligence.sampleExtract.section,
                          snippet: activeKeywordIntelligence.sampleExtract.text,
                          status: "VERIFIED"
                        })
                      }
                      className="w-full py-1.5 rounded-lg bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-primary-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      <span>Inspect Source Page in Drawer</span>
                    </button>
                  </div>
                )}

                {/* Related Entities */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-secondary uppercase block">Linked Domain Entities:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeKeywordIntelligence.entities.map((ent, eidx) => (
                      <span
                        key={eidx}
                        className="px-2 py-1 rounded-lg bg-surface-container text-on-surface font-semibold text-[11px] border border-surface-container-high flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[12px] text-primary">tag</span>
                        <span>{ent.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* 2-COLUMN INTELLIGENCE RESULTS & SOURCE DOCUMENTS (Requirement 15 & 17) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          
          {/* Left Column: Related Matched Documents */}
          <div className="lg:col-span-7 p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <span className="font-bold text-sm text-on-surface">
                Matched Document Collection ({filteredDocs.length})
              </span>
              <span className="text-xs text-secondary font-mono">100% Citation Provenance</span>
            </div>

            {filteredDocs.length === 0 ? (
              <div className="p-8 text-center bg-surface-container-low rounded-xl border border-surface-container-high text-secondary space-y-2">
                <span className="material-symbols-outlined text-3xl">folder_off</span>
                <p className="text-sm font-semibold">No documents match the keyword query "{activeSearchKeyword}".</p>
                <button
                  onClick={handleClearSearch}
                  className="px-3 py-1 rounded bg-primary text-on-primary font-bold text-xs"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() =>
                      setActiveSource({
                        docTitle: doc.title,
                        page: 18,
                        section: doc.topics?.[0] || "General Extract",
                        snippet: doc.summary,
                        status: "VERIFIED"
                      })
                    }
                    className="p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container-high transition-all cursor-pointer flex items-start justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-surface-container group-hover:bg-primary group-hover:text-on-primary text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors truncate">
                          {doc.title}
                        </h3>
                        <p className="text-[11px] text-secondary">
                          {doc.organization} • Mine: {doc.mine} • Year: {doc.year} • {doc.pages} pages
                        </p>
                        <p className="text-xs text-on-surface italic line-clamp-2 pt-0.5">
                          "{doc.summary}"
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {(doc.keywords || []).slice(0, 3).map((kw, kidx) => (
                            <span
                              key={kidx}
                              className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-secondary text-[10px] font-mono border border-surface-container-high"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-surface-container text-primary font-bold text-xs shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">visibility</span>
                      <span>View Source</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Trend Chart & Extracted Subsurface Entities */}
          <div className="lg:col-span-5 space-y-space-md">
            
            {/* Dynamic Trend Chart */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-3">
              <span className="font-bold text-sm text-on-surface block pb-2 border-b border-surface-container-high">
                Production & Stripping Velocity ({currentOrg.shortName})
              </span>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dde9ff" />
                    <XAxis dataKey="month" stroke="#515f78" fontSize={10} />
                    <YAxis stroke="#515f78" fontSize={10} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rawCoal" name="Raw Coal (MT)" stroke="#0037b0" strokeWidth={2} />
                    <Line type="monotone" dataKey="overburden" name="Overburden (M Cu.M)" stroke="#006387" strokeWidth={2} strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Extracted Subsurface Entities */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container-highest shadow-sm space-y-3">
              <span className="font-bold text-sm text-on-surface block pb-2 border-b border-surface-container-high">
                Extracted Subsurface Entities
              </span>
              <div className="space-y-2">
                {MINING_ENTITIES.slice(0, 4).map((entity) => (
                  <div key={entity.id} className="p-2.5 rounded-lg bg-surface-container-low border border-surface-container-high flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-on-surface">{entity.name}</span>
                      <span className="text-[10px] text-secondary block font-mono">{entity.category}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-bold text-[10px]">
                      {entity.confidence} Conf.
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </AppShell>
  );
};
