export const ROLES = [
  {
    id: "cil_admin",
    name: "CIL Administrator",
    scope: "Apex Enterprise",
    description: "Full administrative access across CIL Apex HQ and all 9 subsidiary organizations.",
    canViewAllOrgs: true,
    canUpload: true,
    canGenerateReports: true,
    canManageUsers: true,
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20"
  },
  {
    id: "cil_analyst",
    name: "CIL Analyst",
    scope: "Apex Enterprise",
    description: "Cross-subsidiary analytics, document intelligence, query execution, and report generation.",
    canViewAllOrgs: true,
    canUpload: true,
    canGenerateReports: true,
    canManageUsers: false,
    badgeColor: "bg-primary/10 text-primary border-primary/20"
  },
  {
    id: "sub_admin",
    name: "Subsidiary Administrator",
    scope: "Subsidiary Scope",
    description: "Administrative access scoped specifically to the selected subsidiary organization.",
    canViewAllOrgs: false,
    canUpload: true,
    canGenerateReports: true,
    canManageUsers: true,
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  },
  {
    id: "sub_analyst",
    name: "Subsidiary Analyst",
    scope: "Subsidiary Scope",
    description: "Analytical access for reviewing documents, executing queries, and generating subsidiary reports.",
    canViewAllOrgs: false,
    canUpload: true,
    canGenerateReports: true,
    canManageUsers: false,
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  },
  {
    id: "viewer",
    name: "Viewer",
    scope: "Read-Only Scope",
    description: "Read-only preview access to view indexed documents, topics, and existing report summaries. Upload and report generation disabled.",
    canViewAllOrgs: false,
    canUpload: false,
    canGenerateReports: false,
    canManageUsers: false,
    badgeColor: "bg-secondary/10 text-secondary border-secondary/20"
  }
];
