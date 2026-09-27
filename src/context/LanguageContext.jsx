import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("geovani_lang");
    return saved && TRANSLATIONS[saved] ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("geovani_lang", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
