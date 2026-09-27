import { PRIMARY_ORGANIZATION, SUBSIDIARIES } from "./organizations";
import { ROLES } from "./roles";

const eclOrg = SUBSIDIARIES.find((s) => s.id === "ECL") || SUBSIDIARIES[0];
const mclOrg = SUBSIDIARIES.find((s) => s.id === "MCL") || SUBSIDIARIES[6];

export const DEMO_USERS = [
  {
    key: "cil_admin",
    name: "Rajesh Sharma",
    username: "cil.admin",
    password: "demo123",
    email: "rajesh.sharma@coalindia.in",
    organization: PRIMARY_ORGANIZATION,
    role: ROLES[0], // CIL Administrator
    description: "Apex Enterprise Admin — Full cross-subsidiary access and management capabilities.",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20"
  },
  {
    key: "cil_analyst",
    name: "Dr. Ananya Roy",
    username: "cil.analyst",
    password: "demo123",
    email: "ananya.roy@coalindia.in",
    organization: PRIMARY_ORGANIZATION,
    role: ROLES[1], // CIL Analyst
    description: "Apex Enterprise Analyst — Cross-subsidiary intelligence, queries, and reports.",
    badgeColor: "bg-primary/10 text-primary border-primary/20"
  },
  {
    key: "ecl_admin",
    name: "Sanjay Mukherjee",
    username: "ecl.admin",
    password: "demo123",
    email: "sanjay.m@easterncoal.in",
    organization: eclOrg,
    role: ROLES[2], // Subsidiary Administrator
    description: "ECL Subsidiary Admin — Administrative access scoped specifically to ECL operations.",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  },
  {
    key: "ecl_analyst",
    name: "Priyanka Banerjee",
    username: "ecl.analyst",
    password: "demo123",
    email: "priyanka.b@easterncoal.in",
    organization: eclOrg,
    role: ROLES[3], // Subsidiary Analyst
    description: "ECL Subsidiary Analyst — Document intelligence, queries, and report generation for ECL.",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  },
  {
    key: "mcl_analyst",
    name: "Alok Patnaik",
    username: "mcl.analyst",
    password: "demo123",
    email: "alok.patnaik@mahanadicoal.in",
    organization: mclOrg,
    role: ROLES[3], // Subsidiary Analyst
    description: "MCL Subsidiary Analyst — Analytical access scoped to Mahanadi Coalfields data.",
    badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
  },
  {
    key: "viewer",
    name: "Audit Inspector",
    username: "viewer",
    password: "demo123",
    email: "audit.viewer@gov.in",
    organization: PRIMARY_ORGANIZATION,
    role: ROLES[4], // Viewer
    description: "Read-Only Viewer — Preview existing documents and reports. Upload & generation disabled.",
    badgeColor: "bg-secondary/10 text-secondary border-secondary/20"
  }
];
