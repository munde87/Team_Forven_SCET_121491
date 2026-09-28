import React, { createContext, useContext, useState, useEffect } from "react";
import { DEMO_USERS } from "../data/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sankalan_auth") || localStorage.getItem("geovani_auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Match with latest definition in DEMO_USERS
        const matched = DEMO_USERS.find((u) => u.username === parsed.username);
        return matched || parsed;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("sankalan_auth", JSON.stringify(user));
    } else {
      localStorage.removeItem("sankalan_auth");
      localStorage.removeItem("geovani_auth");
    }
  }, [user]);

  const login = (username, password) => {
    const found = DEMO_USERS.find(
      (u) => (u.username.toLowerCase() === username.trim().toLowerCase() || u.email.toLowerCase() === username.trim().toLowerCase()) && u.password === password
    );

    if (found) {
      setUser(found);
      return { success: true, user: found };
    }
    return { success: false, error: "Invalid credentials. Please enter valid demo account details." };
  };

  const loginAsPreset = (accountKey) => {
    const found = DEMO_USERS.find((u) => u.key === accountKey);
    if (found) {
      setUser(found);
      return { success: true, user: found };
    }
    return { success: false, error: "Preset demo account not found." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sankalan_auth");
    localStorage.removeItem("geovani_auth");
  };

  const isAuthenticated = !!user;
  const currentOrg = user?.organization || null;
  const currentRole = user?.role || null;

  const permissions = {
    canUpload: currentRole ? currentRole.canUpload !== false : false,
    canGenerateReports: currentRole ? currentRole.canGenerateReports !== false : false,
    canManageUsers: currentRole ? currentRole.canManageUsers === true : false,
    canViewAllOrgs: currentRole ? currentRole.canViewAllOrgs === true : false,
    isViewer: currentRole ? currentRole.id === "viewer" : false
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentOrg,
        currentRole,
        permissions,
        isAuthenticated,
        login,
        loginAsPreset,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
