import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ALL_ORGANIZATIONS, PRIMARY_ORGANIZATION } from "../../data/organizations";
import { ROLES } from "../../data/roles";

export const RoleSelectionModal = () => {
  const { isRoleModalOpen, setIsRoleModalOpen, currentOrg, currentRole, switchOrg, switchRole } = useApp();
  const [selectedOrgId, setSelectedOrgId] = useState(currentOrg.id);
  const [selectedRoleId, setSelectedRoleId] = useState(currentRole.id);

  if (!isRoleModalOpen) return null;

  const handleConfirm = () => {
    const orgObj = ALL_ORGANIZATIONS.find((o) => o.id === selectedOrgId) || PRIMARY_ORGANIZATION;
    const roleObj = ROLES.find((r) => r.id === selectedRoleId) || ROLES[0];
    switchOrg(orgObj);
    switchRole(roleObj);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-highest overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-surface-container-low border-b border-surface-container-high flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">shield_person</span>
              DEMO ACCESS MODE • PROTOTYPE SIMULATION
            </div>
            <h2 className="text-2xl font-black text-on-surface tracking-tight">Welcome to Sankalan AI</h2>
            <p className="text-secondary text-sm font-medium mt-1">
              Select your organization and access scope to continue into the demo platform.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Step 1: Select Organization */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-3">
              1. Select Organization / Subsidiary Scope
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ALL_ORGANIZATIONS.map((org) => {
                const isSelected = selectedOrgId === org.id;
                return (
                  <button
                    key={org.id}
                    type="button"
                    onClick={() => setSelectedOrgId(org.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-primary/10 border-primary text-on-surface shadow-sm ring-1 ring-primary"
                        : "bg-surface-container-lowest border-surface-container-high hover:border-surface-container-highest text-secondary hover:text-on-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold font-mono text-sm text-on-surface">{org.shortName}</span>
                      {org.isApex && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 font-mono text-[10px] font-bold">
                          APEX HQ
                        </span>
                      )}
                    </div>
                    <span className="text-xs truncate text-secondary font-medium">{org.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Role Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-secondary mb-3">
              2. Select User Role & Permission Scope
            </label>
            <div className="space-y-2.5">
              {ROLES.map((role) => {
                const isSelected = selectedRoleId === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRoleId(role.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? "bg-primary/10 border-primary shadow-sm ring-1 ring-primary"
                        : "bg-surface-container-lowest border-surface-container-high hover:border-surface-container-highest"
                    }`}
                  >
                    <div className={`mt-0.5 p-2 rounded-lg border text-xs font-bold ${role.badgeColor}`}>
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-on-surface">{role.name}</span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-container text-secondary font-semibold">
                          {role.scope}
                        </span>
                      </div>
                      <p className="text-xs text-secondary mt-1 leading-relaxed">{role.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <span className="text-xs text-secondary font-mono">
            * Demonstration mode. No real authentication required.
          </span>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:opacity-90 transition-opacity shadow-md flex items-center gap-2"
          >
            <span>Enter Platform Scope</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  );
};
