import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { generateReportFromConfig, REPORT_STAGES } from "../../services/mockReports";
import { ALL_ORGANIZATIONS } from "../../data/organizations";

export const ReportWizardModal = () => {
  const {
    isReportWizardOpen,
    setIsReportWizardOpen,
    addReport,
    currentOrg,
    scopedDocuments,
    canGenerateReport,
    showToast,
    selectedReportDocId,
    setSelectedReportDocId
  } = useApp();

  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    reportType: "Production Intelligence Report",
    organization: currentOrg.id,
    subsidiary: currentOrg.name,
    mine: currentOrg.mines?.[0] || "All Mine Sectors",
    period: "FY 2024–25",
    topic: "Production",
    selectedDocId: selectedReportDocId || "all"
  });

  useEffect(() => {
    if (selectedReportDocId) {
      setConfig((prev) => ({ ...prev, selectedDocId: selectedReportDocId }));
    }
  }, [selectedReportDocId]);

  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState({ step: 0, stage: null, progress: 0 });

  if (!isReportWizardOpen) return null;

  const handleStartGeneration = async () => {
    if (!canGenerateReport) {
      showToast("Report generation restricted for the current demo role.", "warning");
      setIsReportWizardOpen(false);
      return;
    }

    setIsCompiling(true);

    const selectedDoc = config.selectedDocId !== "all"
      ? scopedDocuments.find((d) => d.id === config.selectedDocId)
      : null;

    const fullConfig = {
      ...config,
      selectedDoc
    };

    const generated = await generateReportFromConfig(fullConfig, (progressData) => {
      setCompileProgress(progressData);
    });

    addReport(generated);
    setIsCompiling(false);
    setStep(1);
    setCompileProgress({ step: 0, stage: null, progress: 0 });
    setIsReportWizardOpen(false);
  };

  const selectedOrgObj = ALL_ORGANIZATIONS.find((o) => o.id === config.organization) || ALL_ORGANIZATIONS[0];
  const availableMines = selectedOrgObj.mines || ["All Mine Sectors"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-on-surface/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-surface-container-highest flex flex-col">
        
        {/* Header */}
        <div className="p-space-lg bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-space-xs text-primary font-bold">
            <span className="material-symbols-outlined text-[22px]">summarize</span>
            <span className="font-label-lg text-label-lg text-on-surface">Automated Report Generator Wizard</span>
          </div>
          {!isCompiling && (
            <button
              onClick={() => setIsReportWizardOpen(false)}
              className="p-1 rounded hover:bg-surface-container text-secondary"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Body Wizard Steps */}
        <div className="p-space-lg space-y-space-md">
          {!isCompiling ? (
            <>
              {/* Stepper Dots */}
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container-high">
                {["1. Report Format", "2. Organization & Mine", "3. Time Horizon", "4. Sources & Verification"].map((stTitle, idx) => (
                  <span
                    key={idx}
                    className={`font-label-sm text-label-sm font-bold uppercase tracking-wider ${
                      step === idx + 1 ? "text-primary" : step > idx + 1 ? "text-secondary" : "text-outline-variant"
                    }`}
                  >
                    {stTitle}
                  </span>
                ))}
              </div>

              {/* Step 1: Report Type */}
              {step === 1 && (
                <div className="space-y-space-sm">
                  <span className="font-label-md text-label-md font-bold text-on-surface block">
                    Select Report Type:
                  </span>
                  {[
                    "Production Intelligence Report",
                    "Safety Intelligence Report",
                    "Geological Intelligence Report",
                    "Operational Intelligence Report",
                    "Executive Mining Brief"
                  ].map((rpt) => (
                    <label
                      key={rpt}
                      className={`flex items-center justify-between p-space-md rounded-xl border cursor-pointer transition-all ${
                        config.reportType === rpt
                          ? "border-primary bg-surface-container text-primary font-bold shadow-sm"
                          : "border-surface-container-high hover:bg-surface-container-low text-on-surface"
                      }`}
                    >
                      <div className="flex items-center gap-space-sm">
                        <input
                          type="radio"
                          name="reportType"
                          checked={config.reportType === rpt}
                          onChange={() => setConfig({ ...config, reportType: rpt })}
                          className="text-primary focus:ring-primary"
                        />
                        <span>{rpt}</span>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-normal font-mono">Verified Evidence Backed</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Step 2: Organization & Mine */}
              {step === 2 && (
                <div className="space-y-space-md">
                  <div>
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block mb-1">
                      Target Organization:
                    </label>
                    <select
                      value={config.organization}
                      onChange={(e) => {
                        const org = ALL_ORGANIZATIONS.find((o) => o.id === e.target.value);
                        setConfig({
                          ...config,
                          organization: e.target.value,
                          subsidiary: org?.name || e.target.value,
                          mine: org?.mines?.[0] || "All Mine Sectors"
                        });
                      }}
                      className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-body-sm text-on-surface font-semibold"
                    >
                      {ALL_ORGANIZATIONS.map((org) => (
                        <option key={org.id} value={org.id}>
                          {org.name} ({org.shortName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block mb-1">
                      Target Mine Site:
                    </label>
                    <select
                      value={config.mine}
                      onChange={(e) => setConfig({ ...config, mine: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-body-sm text-on-surface font-semibold"
                    >
                      <option value="All Mine Sectors">All Mine Sectors</option>
                      {availableMines.map((m, idx) => (
                        <option key={idx} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Period */}
              {step === 3 && (
                <div className="space-y-space-md">
                  <div>
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block mb-1">
                      Reporting Period:
                    </label>
                    <select
                      value={config.period}
                      onChange={(e) => setConfig({ ...config, period: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-body-sm text-on-surface font-semibold"
                    >
                      <option value="FY 2024–25">FY 2024–25 (Full Year)</option>
                      <option value="FY 2023–24">FY 2023–24 (Historical)</option>
                      <option value="FY 2022–23">FY 2022–23 (Historical Archive)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Overview & Document Source Selection */}
              {step === 4 && (
                <div className="space-y-space-md">
                  <div>
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block mb-1">
                      Select Primary Source Document (Including Uploaded Files):
                    </label>
                    <select
                      value={config.selectedDocId}
                      onChange={(e) => setConfig({ ...config, selectedDocId: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-surface-container-high font-body-sm text-on-surface font-semibold"
                    >
                      <option value="all">🌐 Synthesize All Indexed Documents ({scopedDocuments.length} Documents Scope)</option>
                      <optgroup label="Uploaded & Available Statutory Documents">
                        {scopedDocuments.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            📄 {doc.title} ({doc.organization} — {doc.mine} | {doc.filename})
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-high text-body-sm text-on-surface space-y-1">
                    <span className="font-bold text-primary block mb-1">Report Generation Configuration:</span>
                    <p>Format: <strong>{config.reportType}</strong></p>
                    <p>Organization: <strong>{config.subsidiary}</strong></p>
                    <p>Target Mine: <strong>{config.mine}</strong></p>
                    <p>Time Horizon: <strong>{config.period}</strong></p>
                    <p>Evidence Source: <strong>{config.selectedDocId === "all" ? "All Indexed Documents Scope" : scopedDocuments.find(d => d.id === config.selectedDocId)?.title || "Selected Document"}</strong></p>
                  </div>

                  <p className="font-body-sm text-body-sm text-secondary">
                    Click "GENERATE REPORT" to query the multimodal RAG index, audit verified evidence from your selected source, compile executive charts, and format the final document.
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Compilation Progress Stepper */
            <div className="space-y-space-md py-6 text-center">
              <span className="material-symbols-outlined text-[42px] text-primary animate-spin">
                sync
              </span>
              <div className="space-y-1">
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface block">
                  Compiling {config.reportType}
                </span>
                <span className="font-body-sm text-body-sm text-primary font-semibold">
                  {compileProgress.stage?.text}
                </span>
              </div>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${compileProgress.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!isCompiling && (
          <div className="p-space-md bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
            <button
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="px-space-md h-9 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high disabled:opacity-40 transition-colors"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-space-lg h-9 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleStartGeneration}
                className="px-space-xl h-9 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-md hover:bg-primary-container transition-colors"
              >
                GENERATE REPORT
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
