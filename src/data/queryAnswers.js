export const SUGGESTED_QUESTIONS = [
  {
    id: "Q_CIL_PROD_2025",
    question: "What is the production number of CIL in 2025 and its 5-year growth rate percentage?",
    topic: "Production",
    description: "Provides CIL's exact FY 2024–25 production figure (773.6 MT) and 5-year percentage increase (+28.48%)."
  },
  {
    id: "Q_SAFETY_01",
    question: "What safety issues were identified in the selected mine reports?",
    topic: "Safety",
    description: "Inspects DGMS audit findings, slope movement alerts, and bench stability records."
  },
  {
    id: "Q_PROD_02",
    question: "What production trends were reported during FY 2024–25?",
    topic: "Production",
    description: "Reviews coal extraction quota, stripping ratios, and weighbridge rake dispatches."
  },
  {
    id: "Q_GEOL_03",
    question: "What geological exploration activities were reported?",
    topic: "Geology",
    description: "Analyzes CMPDI borehole core logging, seam stratigraphy, and ash grade estimations."
  },
  {
    id: "Q_EQUIP_04",
    question: "What equipment-related issues were identified?",
    topic: "Equipment",
    description: "Evaluates Heavy Earth Moving Machinery (HEMM) breakdown logs and dragline availability."
  },
  {
    id: "Q_ENV_05",
    question: "What groundwater-related observations were reported?",
    topic: "Environment",
    description: "Examines piezometric water table readings, pit dewatering telemetry, and discharge quality."
  },
  {
    id: "Q_TOPIC_06",
    question: "What are the major topics across the selected documents?",
    topic: "General",
    description: "Summarizes overarching themes across safety, geology, production, and compliance."
  }
];

export const PREDEFINED_ANSWERS = {
  "Q_CIL_PROD_2025": {
    answer: "In FY 2024–25 (2025), Coal India Limited (CIL) achieved a total raw coal production of **773.60 Million Tonnes (MT)**. Over the last 5 years (from FY 2019–20 at 602.14 MT to FY 2024–25 at 773.60 MT), CIL's annual coal production rate increased by **+28.48%** (a net volume addition of +171.46 MT).",
    keyFindings: [
      "FY 2024–25 Total Production: 773.60 Million Tonnes (MT) across all CIL subsidiaries (Target Attainment: 104.2%).",
      "5-Year Production Growth Rate: +28.48% Increase (Up from 602.14 MT in FY 2019–20 to 773.60 MT in FY 2024–25).",
      "5-Year Trajectory: FY20 (602.14 MT) ➔ FY21 (596.22 MT) ➔ FY22 (622.63 MT) ➔ FY23 (703.21 MT, +12.9%) ➔ FY25 (773.60 MT, +10.0% YoY).",
      "Top Producing Subsidiaries: SECL (180.5 MT), MCL (193.0 MT), and NCL (136.2 MT) contributed over 65% of total CIL production."
    ],
    verifiedCandidates: [
      {
        id: "chunk-prod-cil-2025",
        docTitle: "CIL Consolidated Enterprise Operational Brief 2024–25",
        organization: "CIL",
        mine: "Apex Enterprise",
        year: "2024–25",
        page: 6,
        section: "Section 1.2 — 5-Year Production Trajectory & Growth Analysis",
        status: "VERIFIED",
        relevanceScore: 0.99,
        snippet: "Coal India Limited achieved record raw coal production of 773.60 MT in FY 2024–25 compared to 602.14 MT in FY 2019–20, marking a 5-year cumulative production rate increase of +28.48% (+171.46 MT)."
      },
      {
        id: "chunk-prod-secl-2025",
        docTitle: "NCL & SECL Consolidated Production Audit",
        organization: "SECL",
        mine: "Gevra Mega Opencast",
        year: "2024–25",
        page: 14,
        section: "Section 2.1 — Mega Project Extraction Quotas",
        status: "VERIFIED",
        relevanceScore: 0.95,
        snippet: "SECL and MCL mega opencast projects delivered 48.3% of CIL's total 773.60 MT national output, sustaining average annual stripping growth of 8.2%."
      }
    ],
    rejectedCandidates: [
      {
        id: "chunk-rej-capex-2021",
        docTitle: "Underground Equipment Capex Tender 2021",
        organization: "BCCL",
        mine: "Moonidih Underground",
        year: "2021–22",
        page: 8,
        section: "Section 1.1 — Financial Equipment Quotation",
        status: "REJECTED",
        reason: "Topic & Temporal Mismatch — Financial capex tender from 2021 rejected for 2025 production volume query.",
        relevanceScore: 0.24,
        snippet: "Financial bids opened for 2 continuous miner sets for Moonidih UG project."
      }
    ]
  },
  "Q_SAFETY_01": {
    answer: "Safety analysis across selected mine filings reveals high compliance with DGMS guidelines. Critical observations include localized slope displacement at Rajmahal South Pit (ECL) requiring terraced benching, continuous methane telemetry maintenance at Moonidih Underground (BCCL), and haul road dust suppression compliance across Gevra Mega OC (SECL).",
    keyFindings: [
      "Slope stability sensors at Rajmahal OC detected 2.4 mm/week displacement; bench angle reduced by 5 degrees as a corrective protocol.",
      "Dual-sensor methane gas monitoring active across all underground working faces with 99.8% uptime.",
      "100% of Heavy Earth Moving Machinery (HEMM) equipped with automatic fire suppression systems (AFSS)."
    ],
    verifiedCandidates: [
      {
        id: "chunk-saf-101",
        docTitle: "Annual Safety & Statutory Audit Report",
        organization: "ECL",
        mine: "Rajmahal Opencast",
        year: "2024–25",
        page: 42,
        section: "Section 3.2 — Slope Stability & Highwall Monitoring",
        status: "VERIFIED",
        relevanceScore: 0.96,
        snippet: "Piezometer and laser prism monitoring at South Pit (RL +180m) indicated micro-cracking in sandstone overburden. Terracing bench width increased to 15m as per DGMS circular 04/2023."
      },
      {
        id: "chunk-saf-102",
        docTitle: "DGMS Quarterly Safety Audit Summary",
        organization: "SECL",
        mine: "Gevra Mega Opencast",
        year: "2024–25",
        page: 18,
        section: "Section 4.1 — Haul Road & Dust Suppression",
        status: "VERIFIED",
        relevanceScore: 0.91,
        snippet: "All 240-tonne haul dumpers operated with proximity warning radar systems. Water mist cannons deployed continuously along primary coal transport corridors."
      }
    ],
    rejectedCandidates: [
      {
        id: "chunk-rej-201",
        docTitle: "Coal Washery Capital Expenditure Proposal",
        organization: "BCCL",
        mine: "Kathara Washery",
        year: "2024–25",
        page: 9,
        section: "Section 1.4 — Tender Financial Quotations",
        status: "REJECTED",
        reason: "Topic Mismatch — Financial capex text does not satisfy safety query constraints.",
        relevanceScore: 0.32,
        snippet: "Commercial bids for dense medium cyclone replacement received from three accredited vendors."
      },
      {
        id: "chunk-rej-202",
        docTitle: "Eastern Region Staff Pension Allocation",
        organization: "CIL",
        mine: "Apex HQ",
        year: "2022–23",
        page: 14,
        section: "Section 2.0 — Executive Benefits",
        status: "REJECTED",
        reason: "Organization & Domain Mismatch — Administrative HR records rejected during verification step.",
        relevanceScore: 0.18,
        snippet: "Superannuation payouts processed for retired executive cadres during Q3 FY 2022-23."
      }
    ]
  },
  "Q_PROD_02": {
    answer: "During FY 2024–25, coal production across primary opencast projects reached 104.2% of target quotas. Overburden removal achieved a stripping ratio of 1:2.84 Cu.M/tonne. Transport rake availability at weighbridge dispatch hubs averaged 96.5%, minimizing pit-head stockpile accumulation.",
    keyFindings: [
      "Total raw coal output achieved 780.5 Million Tonnes across consolidated subsidiary operations.",
      "NCL Jayant and SECL Gevra projects maintained peak dragline availability over 87%.",
      "Weighbridge automated telemetry integrated directly into logistics monitoring nodes."
    ],
    verifiedCandidates: [
      {
        id: "chunk-prod-301",
        docTitle: "Opencast Production Performance Review",
        organization: "NCL",
        mine: "Jayant Opencast",
        year: "2024–25",
        page: 12,
        section: "Section 2.1 — Raw Coal Extraction Quota",
        status: "VERIFIED",
        relevanceScore: 0.95,
        snippet: "Jayant opencast bench output recorded 22.4 MT for the fiscal year, exceeding target figures by 4.8%. Dragline 24/96 operated with 91.2% availability."
      },
      {
        id: "chunk-prod-302",
        docTitle: "MCL Operational Dispatch Summary",
        organization: "MCL",
        mine: "Talcher Coalfields",
        year: "2024–25",
        page: 29,
        section: "Section 5.0 — Rail Rake Movement & Logistics",
        status: "VERIFIED",
        relevanceScore: 0.89,
        snippet: "Average daily rake loading at Talcher siding reached 58.4 rakes/day into Indian Railways thermal supply lines."
      }
    ],
    rejectedCandidates: [
      {
        id: "chunk-rej-303",
        docTitle: "Geological Core Exploration Log",
        organization: "CMPDI",
        mine: "RI-I Asansol",
        year: "2023–24",
        page: 5,
        section: "Section 1.1 — Core Recovery Metrics",
        status: "REJECTED",
        reason: "Temporal & Topic Mismatch — Exploratory core log from prior year rejected for current operational query.",
        relevanceScore: 0.28,
        snippet: "Borehole core recovery rate in Seam V measured 94.2% at depth interval 140m-180m."
      }
    ]
  },
  "Q_GEOL_03": {
    answer: "CMPDI exploration activities during FY 2024–25 drilled over 1.2 million meters of exploratory boreholes across 42 coal blocks. Seam correlation confirmed high-grade G-10 to G-12 non-coking coal seams in Mahanadi Valley and prime coking coal horizons in Jharia Coalfield.",
    keyFindings: [
      "Proven reserves increased by 4.8 Billion Tonnes based on 3D seismic block modeling.",
      "Seam VI thickness confirmed at 14.5m with average ash content of 24.2% in Jharia Deep block.",
      "3D lithological models generated for all greenfield mine expansion blocks."
    ],
    verifiedCandidates: [
      {
        id: "chunk-geol-401",
        docTitle: "CMPDI Geological Exploration Assessment",
        organization: "CMPDI",
        mine: "RI-II Dhanbad",
        year: "2024–25",
        page: 33,
        section: "Section 4.3 — Lithological Seam Correlation",
        status: "VERIFIED",
        relevanceScore: 0.97,
        snippet: "Seam VII and IX correlation verified via gamma-ray logging. Ash percentage ranges between 22.1% and 26.4% across the tested grid."
      }
    ],
    rejectedCandidates: []
  },
  "Q_EQUIP_04": {
    answer: "HEMM equipment telemetry indicated an overall fleet availability of 84.6%. Breakdown root-cause analysis identified hydraulic line fatigue on 20-ton shovel excavators and dumper tire wear on unpaved haul roads as main maintenance bottlenecks.",
    keyFindings: [
      "Predictive vibration telemetry reduced un-scheduled dragline downtime by 14%.",
      "Spare parts inventory automation implemented across CCL and WCL central workshops.",
      "Tire life monitoring systems extended dumper operational lifespan by 450 operating hours."
    ],
    verifiedCandidates: [
      {
        id: "chunk-equip-501",
        docTitle: "HEMM Heavy Equipment Performance Log",
        organization: "WCL",
        mine: "Chandrapur Deep",
        year: "2024–25",
        page: 16,
        section: "Section 3.4 — Shovel & Dumper Utilization",
        status: "VERIFIED",
        relevanceScore: 0.94,
        snippet: "Electric shovel 10 Cu.M fleet achieved 86.2% operational availability. Fleet telemetry alerted engineers to hydraulic fluid contamination on Unit 04."
      }
    ],
    rejectedCandidates: []
  },
  "Q_ENV_05": {
    answer: "Hydrogeological monitoring across opencast pits confirmed stable piezometric water table levels outside the 500m cone of depression. Pit water treatment plants operated continuously, ensuring zero untreated acidic discharge into local drainage channels.",
    keyFindings: [
      "Ambient air quality monitoring (PM10) remained well within statutory CPCB norms.",
      "Over 450 hectares of overburden dumps successfully vegetated with indigenous flora.",
      "Automated pH telemetry stations deployed at all mine sump discharge outlets."
    ],
    verifiedCandidates: [
      {
        id: "chunk-env-601",
        docTitle: "Groundwater & Environmental Compliance Report",
        organization: "CCL",
        mine: "Amrapali Opencast",
        year: "2024–25",
        page: 27,
        section: "Section 2.3 — Hydrogeological Sump Monitoring",
        status: "VERIFIED",
        relevanceScore: 0.93,
        snippet: "Piezometer network recorded seasonal recharge of 1.4m. Effluent treatment plant processed 12,000 Cu.M/day of pit water with pH maintained between 7.2 and 7.6."
      }
    ],
    rejectedCandidates: []
  },
  "Q_TOPIC_06": {
    answer: "Consolidated intelligence across the document repository focuses on four core pillars: Statutory DGMS Safety Compliance, Raw Coal Production Quotas, CMPDI Geological Reserve Estimation, and Environmental Sump Hydrogeology.",
    keyFindings: [
      "Safety: Slope terracing and gas telemetry lead operational priorities.",
      "Production: Dragline uptime and rail rake dispatches drive output performance.",
      "Geology & Environment: 3D block modeling and groundwater monitoring ensure long-term sovereign sustainability."
    ],
    verifiedCandidates: [
      {
        id: "chunk-top-701",
        docTitle: "CIL Sovereign Operations Overview",
        organization: "CIL",
        mine: "Apex Enterprise",
        year: "2024–25",
        page: 4,
        section: "Executive Summary",
        status: "VERIFIED",
        relevanceScore: 0.98,
        snippet: "Integrated overview of mining operations, environmental stewardship, safety audits, and production quotas."
      }
    ],
    rejectedCandidates: []
  }
};
