import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { AIQueryPage } from "./pages/AIQueryPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { DocumentIntelligencePage } from "./pages/DocumentIntelligencePage";
import { ObjectStoragePage } from "./pages/ObjectStoragePage";
import { ReportsPage } from "./pages/ReportsPage";
import { MiningIntelligencePage } from "./pages/MiningIntelligencePage";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <LanguageProvider>
          <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Application Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-query"
              element={
                <ProtectedRoute>
                  <AIQueryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <DocumentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/document-intelligence"
              element={
                <ProtectedRoute>
                  <DocumentIntelligencePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/storage"
              element={
                <ProtectedRoute>
                  <ObjectStoragePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mining-intelligence"
              element={
                <ProtectedRoute>
                  <MiningIntelligencePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
        </LanguageProvider>
      </AppProvider>
    </AuthProvider>
  );
}
