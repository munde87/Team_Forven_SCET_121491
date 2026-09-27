export const SAMPLE_RETRIEVAL_RESULTS = {
  "cil-production-2025": {
    query: "What is the production number of CIL in 2025 and its 5-year growth rate percentage?",
    intent: "Quantitative Extraction & 5-Year Production Trajectory Analysis",
    answer: "In FY 2024–25 (2025), Coal India Limited (CIL) achieved a total raw coal production of **773.60 Million Tonnes (MT)**. Over the last 5 years (from FY 2019–20 at 602.14 MT to FY 2024–25 at 773.60 MT), CIL's annual coal production rate increased by **+28.48%** (a net volume addition of +171.46 MT).",
    confidence: 0.998,
    candidates: [
      {
        id: "cand-prod-01",
        docId: "doc-cil-09",
        docTitle: "CIL Consolidated Enterprise Operational Brief 2024–25",
        page: 6,
        section: "Section 1.2 • 5-Year Production Trajectory & Growth Analysis",
        snippet: "...Coal India Limited achieved record raw coal production of 773.60 MT in FY 2024–25 compared to 602.14 MT in FY 2019–20, marking a 5-year cumulative production rate increase of +28.48% (+171.46 MT)...",
        similarityScore: 0.99,
        status: "VERIFIED",
        verificationReason: "Direct quantitative alignment verified against CIL Apex HQ official audit ledger.",
        boundingBox: { x: 120, y: 340, w: 580, h: 90 }
      }
    ]
  },
  "production-trends": {
    query: "What were the major production-related trends across the selected opencast mines during 2024-25?",
    intent: "Quantitative Extraction & Production Trend Analysis",
    answer: "Based on cross-subsidiary extraction registries for FY 2024–25, the selected opencast sectors achieved an aggregate raw coal output of **8.42M Metric Tonnes**, reflecting a **+7.8% annualized extraction gain** centered at Sector B (North Pit Alpha and Valley Basin South).\n\nKey corroborated factors include:\n- Optimal matching of **240T dumpers with 42 Cu.M electric shovels** reduced idle queuing wait time by **14.2%**.\n- Composite stripping ratio improved from **1:3.12 to 1:2.84** following bench reprofiling at Level -40m.\n- Dewatering slurry sumps minimized monsoon downtime, sustaining 91.4% fleet availability.",
    confidence: 0.994,
    candidates: [
      {
        id: "cand-01",
        docId: "doc-001",
        docTitle: "Annual Mining Operations Review 2024–25",
        page: 42,
        section: "Section 4.2 • Opencast Production Performance",
        snippet: "...composite raw output across Western & Southern open pits totaled 8.42 MT with average stripping ratio stabilizing at 1:2.84 compared to 1:3.12 in FY23...",
        similarityScore: 0.98,
        status: "VERIFIED",
        verificationReason: "Direct quantitative alignment; verified against pit weighbridge hash ledger.",
        boundingBox: { x: 120, y: 340, w: 580, h: 90 }
      },
      {
        id: "cand-02",
        docId: "doc-002",
        docTitle: "Coal Extraction Survey & Geo-Hydro Audit Q3",
        page: 118,
        section: "Subsidiary IV • Equipment Availability Log",
        snippet: "...shovel-dumper pairing efficiencies yield a 14.2% curtailment in roundtrip queuing delay at the primary crusher siding during peak Shift B operations...",
        similarityScore: 0.94,
        status: "VERIFIED",
        verificationReason: "Corroborated by independent telemetry sensor log.",
        boundingBox: { x: 140, y: 520, w: 600, h: 80 }
      },
      {
        id: "cand-03",
        docId: "doc-005",
        docTitle: "Pre-1990 Archival Seam VII Lithology Log",
        page: 14,
        section: "Historical Coal Quality Note (1988)",
        snippet: "...historical seam output reached 1.2 MT using manual loading underground haulage systems...",
        similarityScore: 0.62,
        status: "REJECTED",
        verificationReason: "Temporal mismatch (1988 archival record does not match target FY 2024-25 scope).",
        boundingBox: { x: 90, y: 200, w: 500, h: 70 }
      },
      {
        id: "cand-04",
        docId: "doc-004",
        docTitle: "DGMS Quarterly Slope Monitoring Q4",
        page: 8,
        section: "Prism Bench Safety Telemetry",
        snippet: "...horizontal displacement of prism sensor P-04 measured less than 1.2mm per 24-hour cycle...",
        similarityScore: 0.48,
        status: "REJECTED",
        verificationReason: "Topic mismatch (Geotechnical slope safety metric, not production output tonnage).",
        boundingBox: { x: 100, y: 150, w: 520, h: 65 }
      }
    ]
  },

  "safety-issues": {
    query: "What are the major safety issues and slope stability alerts identified in the selected mine reports?",
    intent: "Hazard Identification & Compliance Monitoring",
    answer: "Safety monitoring across Eastern Ridge Pit and Valley Basin South indicates **zero critical structural failures**, but flagged two key operational slope risks for immediate remediation:\n\n1. **Bench Slope Tension Cracks**: Prism sensor P-04 at Bench Level -60m recorded a localized **2.4mm lateral displacement** following heavy precipitation in Q3, requiring slope reprofiling.\n2. **Hydraulic Dewatering Capacity**: Groundwater inflow at Seam VII base stabilized at **124 L/min**, prompting installation of dual standby 150 HP submersible sumps to prevent bench undercut erosion.",
    confidence: 0.986,
    candidates: [
      {
        id: "cand-11",
        docId: "doc-004",
        docTitle: "DGMS Quarterly Slope Monitoring Q4",
        page: 14,
        section: "Section 3.1 • Slope Stability Telemetry",
        snippet: "...Prism P-04 on Bench Level -60m recorded lateral displacement of 2.4mm post-rain event. Factor of safety evaluated at 1.34; reprofiling recommended...",
        similarityScore: 0.97,
        status: "VERIFIED",
        verificationReason: "DGMS certified telemetry data; matches sensor coordinates.",
        boundingBox: { x: 110, y: 280, w: 590, h: 85 }
      },
      {
        id: "cand-12",
        docId: "doc-002",
        docTitle: "Coal Extraction Survey & Geo-Hydro Audit Q3",
        page: 28,
        section: "Section 2.4 • Hydrogeological Inflow Assessment",
        snippet: "...Hydrostatic discharge monitored at Seam VII base: stabilized at 124 L/min under continuous depressurization pumping. No artesian risk...",
        similarityScore: 0.93,
        status: "VERIFIED",
        verificationReason: "Verified against hydrogeological survey log.",
        boundingBox: { x: 140, y: 490, w: 610, h: 85 }
      },
      {
        id: "cand-13",
        docId: "doc-006",
        docTitle: "Weighbridge Rail Siding Telemetry Log Q4",
        page: 1,
        section: "Rake Overload Exception Log",
        snippet: "...wagon BOXN-22108 registered 2.1% axle overload at siding weighbridge scale 3...",
        similarityScore: 0.55,
        status: "REJECTED",
        verificationReason: "Scope mismatch (Rail transport overload log, not mining pit slope safety).",
        boundingBox: { x: 80, y: 100, w: 450, h: 50 }
      }
    ]
  },

  "geological-exploration": {
    query: "What geological exploration activities and seam lithology details were reported during FY 2024–25?",
    intent: "Subsurface Stratigraphy & Lithology Extraction",
    answer: "Geological exploratory drilling conducted across North Pit Alpha and Kargali Horizon logged **84 diamond core boreholes** penetrating down to depth **142m**.\n\nKey stratigraphic findings:\n- **Seam IV Thick Seam Horizon**: Average thickness confirmed at **8.42m** with low ash content (14.2% Grade G3 coal).\n- **Sandstone/Shale Roof Interbeds**: Massive Barakar sandstone roof formation exhibiting High RQD (>82%), providing favorable bench stability for deep open pit deepening.",
    confidence: 0.991,
    candidates: [
      {
        id: "cand-21",
        docId: "doc-003",
        docTitle: "Pit Alpha Geotechnical CoreLog 2025",
        page: 14,
        section: "Borehole BH-09 • Stratigraphic Column Summary",
        snippet: "...Seam IV thickness logged at 8.42m at RL +180m collar level. Core recovery 94.2% with massive sandstone roof (RQD 84%)...",
        similarityScore: 0.99,
        status: "VERIFIED",
        verificationReason: "Direct geological log extract verified with collar elevation coordinate.",
        boundingBox: { x: 130, y: 220, w: 620, h: 95 }
      },
      {
        id: "cand-22",
        docId: "doc-001",
        docTitle: "Annual Mining Operations Review 2024–25",
        page: 68,
        section: "Geological Reserve Reconciliation",
        snippet: "...exploratory drilling program completed 84 diamond core holes validating Grade G3 coal reserves in Sector B...",
        similarityScore: 0.92,
        status: "VERIFIED",
        verificationReason: "Cross-checked with reserve estimation annexure.",
        boundingBox: { x: 150, y: 410, w: 580, h: 75 }
      }
    ]
  }
};
