import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem("language") as Language;
    return saved || "en";
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.sponsors": "Sponsors",
    "nav.donation": "Donate",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.language": "हिंदी",

    // Homepage
    "home.marquee.alt": "Gallery image",
    "home.instructionsHindi.title": "परीक्षा निर्देश",
    "home.instructionsHindi.description":
      "विस्तृत परीक्षा निर्देश और दिशानिर्देश डाउनलोड करें",
    "home.instructionsHindi.download": "निर्देश डाउनलोड करें",
    "home.instructionsHindi.notAvailable": "उपलब्ध नहीं",

    "home.instructions.title": "Exam Instructions",
    "home.instructions.description":
      "Download exam instructions and guidelines",
    "home.instructions.download": "Download Instructions",
    "home.instructions.notAvailable": "Instructions Not Available",

    "home.howToParticipate.title": "How to Participate",
    "home.howToParticipate.subtitle": "कैसे भाग लें",
    "home.howToParticipate.description":
      "Steps to participate in the scholarship exam",
    "home.howToParticipate.download": "Download Guide",
    "home.howToParticipate.notAvailable": "Guide Not Available",

    "home.results.title": "Results",
    "home.results.description":
      "View exam results and scholarship announcements",
    "home.results.view": "View Results",
    "home.results.notPublished": "Results Not Published",

    "home.importantInfo.title": "Important Information",
    "home.importantInfo.connection":
      "Ensure you have a stable internet connection during the exam",
    "home.importantInfo.download":
      "Download and review the question paper before the exam date",
    "home.importantInfo.results":
      "Results will be published on this page after evaluation",
    "home.importantInfo.queries":
      "For any queries, please visit our Contact page",
  },
  hi: {
    // Header
    "nav.home": "मुख्य",
    "nav.about": "हमारे बारे में",
    "nav.sponsors": "प्रायोजक",
    "nav.donation": "दान करें",
    "nav.faq": "सामान्य प्रश्न",
    "nav.contact": "संपर्क",
    "nav.language": "English",

    // Homepage
    "home.marquee.alt": "गैलरी छवि",
    "home.instructionsHindi.title": "परीक्षा निर्देश",
    "home.instructionsHindi.description":
      "विस्तृत परीक्षा निर्देश और दिशानिर्देश डाउनलोड करें",
    "home.instructionsHindi.download": "निर्देश डाउनलोड करें",
    "home.instructionsHindi.notAvailable": "उपलब्ध नहीं",

    "home.instructions.title": "परीक्षा निर्देश",
    "home.instructions.description":
      "विस्तृत परीक्षा निर्देश और दिशानिर्देश डाउनलोड करें",
    "home.instructions.download": "निर्देश डाउनलोड करें",

    "home.howToParticipate.title": "कैसे भाग लें",
    "home.howToParticipate.subtitle": "How to Participate",
    "home.howToParticipate.description":
      "छात्रवृत्ति परीक्षा में भाग लेने के चरण जानें",
    "home.howToParticipate.download": "गाइड डाउनलोड करें",
    "home.howToParticipate.notAvailable": "गाइड उपलब्ध नहीं",
    "home.instructions.notAvailable": "निर्देश उपलब्ध नहीं",

    "home.results.title": "परिणाम",
    "home.results.description":
      "परीक्षा परिणाम और छात्रवृत्ति की घोषणाएं देखें",
    "home.results.view": "परिणाम देखें",
    "home.results.notPublished": "परिणाम प्रकाशित नहीं",

    "home.importantInfo.title": "महत्वपूर्ण जानकारी",
    "home.importantInfo.connection":
      "परीक्षा के दौरान स्थिर इंटरनेट कनेक्शन सुनिश्चित करें",
    "home.importantInfo.download":
      "परीक्षा तिथि से पहले प्रश्न पत्र डाउनलोड करें और समीक्षा करें",
    "home.importantInfo.results":
      "मूल्यांकन के बाद परिणाम इस पृष्ठ पर प्रकाशित किए जाएंगे",
    "home.importantInfo.queries":
      "किसी भी प्रश्न के लिए, कृपया हमारा संपर्क पृष्ठ देखें",
  },
};
