export const SAMPLE_ENTITIES = [
  { id: "ent-1", name: "North Pit Alpha", type: "Mine Sector", count: 142, category: "Mines", confidence: "99.2%" },
  { id: "ent-2", name: "Valley Basin South", type: "Mine Sector", count: 98, category: "Mines", confidence: "98.5%" },
  { id: "ent-3", name: "Eastern Ridge Pit", type: "Mine Sector", count: 74, category: "Mines", confidence: "97.8%" },
  { id: "ent-4", name: "Seam IV (Barakar)", type: "Coal Seam", count: 210, category: "Seams", confidence: "99.6%" },
  { id: "ent-5", name: "Seam VII (Raniganj)", type: "Coal Seam", count: 165, category: "Seams", confidence: "99.1%" },
  { id: "ent-6", name: "Kargali Deep Horizon", type: "Coal Seam", count: 88, category: "Seams", confidence: "98.0%" },
  { id: "ent-7", name: "240T CAT Dump Truck", type: "Equipment", count: 320, category: "Equipment", confidence: "99.8%" },
  { id: "ent-8", name: "42 Cu.M Electric Shovel", type: "Equipment", count: 184, category: "Equipment", confidence: "99.4%" },
  { id: "ent-9", name: "P-04 Prism Sensor", type: "Sensor Node", count: 62, category: "Sensors", confidence: "97.5%" },
  { id: "ent-10", name: "DGMS Safety Standard 100", type: "Regulation", count: 95, category: "Compliance", confidence: "100%" },
  { id: "ent-11", name: "Siding No. 4 Rail Yard", type: "Logistics Node", count: 130, category: "Logistics", confidence: "99.0%" }
];

export const MINING_ENTITIES = SAMPLE_ENTITIES;

export const DOCUMENT_INTELLIGENCE_EXTRACTS = {
  "doc-001": {
    ocrText: `GOVERNMENT OF INDIA / MINISTRY OF COAL / CIL SUBSIDIARY REVIEW
PROJECT CODE: COAL-STRATA-JH-44
FORMATION: BARAKAR FORMATION (LOWER GONDWANA)

Section 4.2: Opencast Production Performance (FY 2024-25)
Composite raw coal output across Western and Southern open pit sectors reached 8.42 Million Metric Tonnes (MT), representing a +7.8% gain year-over-year. The average composite stripping ratio stabilized at 1:2.84 Cu.M/T down from 1:3.12 in FY 2023-24.

Shovel-Dumper Matching Index:
Optimized allocation of 42 Cu.M electric rope shovels with 240T heavy dump trucks resulted in a 14.2% reduction in crusher cycle queuing delays.

Compliance Signoff:
Verified by Chief Mining Engineer (CME), Regional Circle IV. Hash provenance verified on sovereign CIL Node.`,
    tables: [
      {
        title: "Table 4.1: Subsidiary-Wise Production & Stripping Ratio Summary (FY 24-25)",
        headers: ["Mine Sector", "Raw Coal (MT)", "Overburden (M Cu.M)", "Stripping Ratio", "Fleet Availability"],
        rows: [
          ["North Pit Alpha", "2.41 MT", "6.84 M Cu.M", "1 : 2.83", "94.2%"],
          ["Valley Basin South", "3.18 MT", "9.03 M Cu.M", "1 : 2.84", "89.8%"],
          ["Eastern Ridge Pit", "1.65 MT", "4.70 M Cu.M", "1 : 2.85", "92.1%"],
          ["Southern Strata", "1.18 MT", "3.33 M Cu.M", "1 : 2.82", "86.4%"]
        ]
      }
    ],
    figures: [
      {
        title: "Figure 4.3: Bench Profile Elevation & Seam IV Dip Gradient Diagram",
        caption: "Cross-sectional elevation schematic at Bench Level -40m showing overburden terrace benches and Seam IV floor dip angle (7° South-West).",
        type: "Vector Contour & Stratigraphy Map"
      }
    ],
    entities: [
      { name: "North Pit Alpha", category: "Mine Sector", page: 42, section: "Sec 4.2" },
      { name: "8.42 MT", category: "Production Metric", page: 42, section: "Sec 4.2" },
      { name: "1:2.84", category: "Stripping Ratio", page: 43, section: "Sec 4.2" },
      { name: "42 Cu.M Shovel", category: "Equipment", page: 44, section: "Sec 4.3" }
    ],
    topics: ["Production Performance", "Stripping Ratio", "Fleet Efficiency", "Overburden Stripping"]
  }
};
