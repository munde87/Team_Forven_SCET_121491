import React from "react";
import { useApp } from "../../context/AppContext";

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in flex items-center gap-space-sm px-space-lg py-space-md rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-xl text-on-surface">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isSuccess ? "bg-emerald-100 text-emerald-700" : "bg-primary/10 text-primary"}`}>
        <span className="material-symbols-outlined text-[20px]">
          {isSuccess ? "check_circle" : "info"}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-label-md text-label-md font-bold text-on-surface">System Notification</span>
        <span className="font-body-sm text-body-sm text-secondary">{toast.message}</span>
      </div>
    </div>
  );
};
