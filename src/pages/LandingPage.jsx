import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { useLanguage } from "../context/LanguageContext";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 6 Distinct High-Resolution Mining Images & Locations
  const heroSlides = [
    {
      id: 1,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvWiy-zyUU6o_vamNImi7XPf8nje7be73PZgPrE-2M4htDGyfbjbFz2dLvFEkg8Ks__LtMfZZ6BBIv-uzaHxAaiCHW9gonViS15-jBWRJh7Fuwy8x6x82LOHE5LXo7DhTyPAvv1GY7ZuvO_3yvAgvxtLmRmsCP_nN1rSsuSuZnn-nConAjWoeUcCwN7X3EVQOGl_MRtYfgDQjSz70WMxsOGcLhMwQ2sdJ6KiUOhlk2QESlISmhJy2U",
      info: t.slides[0]
    },
    {
      id: 2,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2pjdSryvuLH_43pvH4_vrn2w-1GzMUTPMrzWlRRqVE28tkw2ipwyWtBoGGgJkH-8K2X1q5I6-VvQ-7Y2C-FFkpV-FvBO7hdENySzt2wR1WQmFVQhpEr2ivjNRVJ7QSJkU8fE9HSKtr4zq3olVZ2I5XxTq3aAf01Ismy0g_zqx2AOnksBpC6njxewzZSM_QC8t4mk3IP__anNy22zBxYR65GeuyTYIYG5dIUgU7feoijfgU2yKVje1",
      info: t.slides[1]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80",
      info: t.slides[2]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
      info: t.slides[3]
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
      info: t.slides[4]
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
      info: t.slides[5]
    }
  ];

  // Right-to-Left Auto Carousel Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-on-primary">
      <Navbar />

      <main className="w-full pt-16">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION WITH CAROUSEL & TELEMETRY HUB                     */}
        {/* ========================================================================= */}
        <section id="hero" className="relative w-full overflow-hidden bg-surface-dim pt-4 pb-16 lg:pb-20">
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-margin-desktop pt-4 sm:pt-8 space-y-8">
            
            {/* TOP 6-IMAGE CAROUSEL SHOWCASE (Matching User's Reference Screenshot) */}
            <div className="relative w-full h-[280px] sm:h-[380px] rounded-2xl overflow-hidden shadow-2xl border border-surface-container-highest group">
              
              {/* Slides */}
              {heroSlides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform ${
                      isActive
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 translate-x-full scale-105"
                    }`}
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>
                );
              })}

              {/* Left & Right Circular Arrow Controls */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all z-20"
                title="Previous Slide"
              >
                <span className="material-symbols-outlined text-[24px]">chevron_left</span>
              </button>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all z-20"
                title="Next Slide"
              >
                <span className="material-symbols-outlined text-[24px]">chevron_right</span>
              </button>

              {/* Bottom Left Location Caption Badge (Matching Screenshot) */}
              <div className="absolute left-4 bottom-4 max-w-[80%] z-20 space-y-0.5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-white shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <span className="font-bold text-xs sm:text-sm font-sans tracking-tight">
                    {heroSlides[currentSlide].info.title}
                  </span>
                </div>
                <div className="text-[10px] text-white/80 font-mono pl-1">
                  {heroSlides[currentSlide].info.credit} • {heroSlides[currentSlide].info.sub}
                </div>
              </div>

              {/* Bottom Right Slide Dots Indicators (Matching Screenshot) */}
              <div className="absolute right-4 bottom-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlide ? "w-6 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                    title={`Slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>

            {/* HERO CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center pt-2">
              
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
                <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-low text-primary shadow-sm border border-surface-container-highest">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">{t.heroBadge}</span>
                </div>

                <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight mt-space-xs">
                  {t.heroTitlePrefix}
                  <span className="text-primary-container block">{t.heroTitleHighlight}</span>
                </h1>

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                  {t.heroDesc}
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-space-md mt-space-sm w-full sm:w-auto">
                  <Link
                    to="/ai-query"
                    className="inline-flex items-center justify-center gap-space-xs px-space-xl h-11 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary-container transition-all active:scale-95"
                  >
                    <span>{t.exploreBtn}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                  <a
                    href="#intelligence-demo"
                    className="inline-flex items-center justify-center gap-space-xs px-space-lg h-11 rounded-lg bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:bg-surface-container-low transition-colors border border-surface-container-highest"
                  >
                    <span className="material-symbols-outlined text-[20px] text-primary">play_circle</span>
                    <span>{t.viewDemoBtn}</span>
                  </a>
                </div>

                {/* Trust Line */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-space-md text-secondary font-label-sm text-label-sm mt-space-md pt-space-sm border-t border-surface-container-highest/60 w-full">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                    <span>{t.evidenceFirst}</span>
                  </div>
                  <span className="text-outline-variant">•</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">link</span>
                    <span>{t.sourceLinked}</span>
                  </div>
                  <span className="text-outline-variant">•</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                    <span>{t.compliant}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Floating Telemetry Card */}
              <div className="lg:col-span-5 flex flex-col justify-center mt-space-xl lg:mt-0">
                <div className="relative w-full rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md p-space-lg shadow-xl border border-surface-container-highest">
                  <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-highest/60">
                    <div className="flex items-center gap-space-xs">
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                      </span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">{t.miningCenter}</span>
                    </div>
                    <span className="px-space-xs py-0.5 rounded text-label-sm font-label-sm bg-surface-container text-secondary">
                      Sector South-IV (CIL)
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-space-sm my-space-md">
                    <div className="p-space-sm bg-surface-container-low rounded-xl">
                      <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px] text-primary">description</span>
                        <span>Documents Indexed</span>
                      </div>
                      <div className="font-metric-display text-metric-display text-on-surface mt-1">12,480<span className="text-primary text-base">+</span></div>
                      <span className="font-body-sm text-body-sm text-secondary">PDF, CAD, DWG, CSV</span>
                    </div>
                    <div className="p-space-sm bg-surface-container-low rounded-xl">
                      <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px] text-primary">hub</span>
                        <span>Sources Connected</span>
                      </div>
                      <div className="font-metric-display text-metric-display text-on-surface mt-1">06<span className="text-secondary text-base font-normal"> nodes</span></div>
                      <span className="font-body-sm text-body-sm text-secondary">SAP, IBM, SCADA, DGMS</span>
                    </div>
                    <div className="p-space-sm bg-surface-container-low rounded-xl">
                      <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px] text-primary">psychology</span>
                        <span>AI Syntheses</span>
                      </div>
                      <div className="font-metric-display text-metric-display text-on-surface mt-1">3,240<span className="text-primary text-base">+</span></div>
                      <span className="font-body-sm text-body-sm text-secondary">Multi-mine cross checks</span>
                    </div>
                    <div className="p-space-sm bg-surface-container-low rounded-xl">
                      <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                        <span>Traceability</span>
                      </div>
                      <div className="font-metric-display text-metric-display text-primary mt-1">100<span className="text-base">%</span></div>
                      <span className="font-body-sm text-body-sm text-secondary">Page & Coord anchored</span>
                    </div>
                  </div>

                  {/* Active Ingestion Ticker */}
                  <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-xl">
                    <div className="flex items-center gap-space-xs min-w-0">
                      <span className="material-symbols-outlined text-[18px] text-primary animate-spin">sync</span>
                      <div className="flex flex-col truncate">
                        <span className="font-label-sm text-label-sm text-on-surface truncate">Ingesting: Borehole_Lithology_SecB.xlsx</span>
                        <span className="font-body-sm text-body-sm text-secondary">Strata depth: 142m • Verified OCR</span>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm font-bold text-primary shrink-0 ml-2">94%</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: THE CHALLENGE                                                  */}
        {/* ========================================================================= */}
        <section id="challenge" className="w-full py-space-xl bg-surface-container-low/60 border-y border-surface-container-highest/60">
          <div className="w-full max-w-7xl mx-auto px-margin-desktop">
            <div className="max-w-3xl mb-space-xl">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">{t.challengeTag}</span>
              <h2 className="font-display-sm text-display-sm text-on-surface tracking-tight mt-1">
                {t.challengeTitle}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                {t.challengeDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
              <div className="flex flex-col p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all border border-surface-container-highest">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[24px]">folder_copy</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Scattered Documents</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  PDFs, scanned analog reports, Excel legacy workbooks, Word filings, and archival records dispersed across local servers and regional depots.
                </p>
              </div>

              <div className="flex flex-col p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all border border-surface-container-highest">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[24px]">account_tree</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Unstructured Knowledge</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Crucial seam thickness figures, stripping ratios, and water table gradients stay trapped inside dense tabular images and multi-fold maps.
                </p>
              </div>

              <div className="flex flex-col p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all border border-surface-container-highest">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[24px]">timelapse</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Slow Discovery Cycles</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Geologists and dispatch controllers spend upwards of 35% of their working hours manually reconciling discrepancy logs between shift handovers.
                </p>
              </div>

              <div className="flex flex-col p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all border border-surface-container-highest">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-space-md">
                  <span className="material-symbols-outlined text-[24px]">link_off</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Fragmented Intelligence</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Operational pit telematics, geological survey models, and historical statutory clearances remain isolated without cross-relational validation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: HOW SANKALAN AI WORKS                                          */}
        {/* ========================================================================= */}
        <section id="workflow" className="w-full py-space-xl bg-surface-container-lowest">
          <div className="w-full max-w-7xl mx-auto px-margin-desktop">
            <div className="text-center max-w-3xl mx-auto mb-space-xl">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">{t.workflowTag}</span>
              <h2 className="font-display-sm text-display-sm text-on-surface tracking-tight mt-1">
                {t.workflowTitle}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                {t.workflowDesc}
              </p>
            </div>

            {/* 5-Stage Pipeline Container */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-space-md">
              {[
                { num: "01", icon: "cloud_upload", title: "Ingest", desc: "Upload geological reports, lithology scans, Excel shifts, high-res aerial maps, and historical mine registries." },
                { num: "02", icon: "document_scanner", title: "Understand", desc: "Deep layout analysis, OCR extraction for vintage tables, figure isolation, and seam cross-section decoding." },
                { num: "03", icon: "schema", title: "Connect", desc: "Formulate high-dimensional semantic chunks, coordinate anchoring, and multimodal relational embeddings." },
                { num: "04", icon: "travel_explore", title: "Retrieve", desc: "Execute hybrid semantic, keyword, and structured SQL-grade telemetry filters across all state mine branches." },
                { num: "05", icon: "verified", title: "Verify & Synthesize", desc: "Re-rank candidate passages, cross-check against physical records, and synthesize grounded executive briefings." }
              ].map((step) => (
                <div key={step.num} className="flex flex-col p-space-md rounded-xl bg-surface-container-low shadow-sm border border-surface-container-highest hover:bg-surface-container transition-all">
                  <div className="flex items-center justify-between mb-space-md">
                    <span className="font-metric-display text-metric-display text-primary font-bold">{step.num}</span>
                    <span className="p-2 rounded-lg bg-surface-container text-primary">
                      <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                    </span>
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide font-bold">{step.title}</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: AI QUERY PREVIEW & EXECUTION CONSOLE                           */}
        {/* ========================================================================= */}
        <section id="intelligence-demo" className="w-full py-space-xl bg-surface-container-low/80 border-t border-surface-container-highest">
          <div className="w-full max-w-7xl mx-auto px-margin-desktop">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold">Interactive Prototype</span>
                <h2 className="font-display-sm text-display-sm text-on-surface tracking-tight mt-1">
                  Deterministic AI Query & Evidence Validation
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Experience how Sankalan AI answers complex technical queries with fully inspectable citations.
                </p>
              </div>
              <Link
                to="/ai-query"
                className="mt-4 md:mt-0 inline-flex items-center gap- space-xs text-primary font-label-md text-label-md font-bold hover:underline"
              >
                <span>Launch Interactive Query Console</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>

            {/* Query Sandbox Card */}
            <div className="w-full rounded-2xl bg-surface-container-lowest shadow-lg overflow-hidden border border-surface-container-highest">
              <div className="p-space-lg bg-surface-container-lowest border-b border-surface-container-high">
                <div className="relative w-full">
                  <span className="material-symbols-outlined absolute left-4 top-3 text-primary text-[22px]">search</span>
                  <input
                    className="w-full h-12 pl-12 pr-32 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none cursor-default shadow-inner"
                    readOnly
                    type="text"
                    value="What were the major production-related trends across the selected opencast mines during 2024-25?"
                  />
                  <button
                    onClick={() => navigate("/ai-query")}
                    className="absolute right-2 top-2 h-8 px-4 rounded bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1 hover:bg-primary-container transition-colors"
                  >
                    <span>Execute</span>
                    <span className="material-symbols-outlined text-[16px]">subdirectory_arrow_left</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 p-space-lg flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-surface-container-high">
                  <div>
                    <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container-high">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                        <span className="font-label-lg text-label-lg font-bold text-on-surface">Grounded Synthesis</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                        100% Corroborated
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                      Based on cross-subsidiary extraction registries for FY 2024–25, the selected opencast sectors achieved an aggregate raw coal output of <strong className="text-primary font-semibold">8.42M Metric Tonnes</strong>, reflecting a <strong className="text-on-surface font-semibold">+7.8% annualized extraction gain</strong> centered at Sector B.
                    </p>
                  </div>
                  <div className="mt-space-lg pt-space-sm border-t border-surface-container-high flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary">Export report format:</span>
                    <button
                      onClick={() => navigate("/reports")}
                      className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm hover:bg-primary-container transition-colors"
                    >
                      Executive PDF Report
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 p-space-lg bg-surface-container-low/40 flex flex-col gap-space-md">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Corroborating Evidence</span>
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-highest">
                    <div className="flex items-center justify-between text-label-sm font-label-sm text-secondary mb-1">
                      <span className="font-semibold text-primary">Annual Mining Operations Review</span>
                      <span className="px-1.5 py-0.5 rounded bg-surface-container text-primary font-bold">98% Match</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface italic">
                      “...composite raw output across Western & Southern open pits totaled 8.42 MT with average stripping ratio stabilizing at 2.84...”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: FINAL CALL TO ACTION                                          */}
        {/* ========================================================================= */}
        <section className="w-full py-space-xl bg-surface-container-low">
          <div className="w-full max-w-7xl mx-auto px-margin-desktop">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-cover bg-center p-space-xl lg:p-16 text-center bg-surface-container-high">
              <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-semibold mb-space-xs">
                  Sovereign Resource Deployment
                </span>
                <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">
                  From Data Overload to Mining Intelligence.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm mb-space-lg leading-relaxed">
                  Transform fragmented mining records, analog boreholes, and telemetry logs into evidence-linked insights with Sankalan AI.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-space-xs px-space-xl h-11 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary-container transition-all"
                >
                  <span>Launch Sankalan AI Platform</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low border-t border-surface-container-highest py-margin-desktop">
        <div className="w-full px-margin-desktop text-center text-secondary font-body-sm text-body-sm">
          © 2026 Sankalan AI — Mining Intelligence Platform. Prototype Demo — Sample Data.
        </div>
      </footer>
    </div>
  );
};
