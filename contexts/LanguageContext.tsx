import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface LanguageContextType {
    language: string;
    setLanguage: (language: string) => void;
    t: (key: string, options?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState(localStorage.getItem('language') || 'en');
    const [translations, setTranslations] = useState<Record<string, string>>({});

    const fetchTranslations = useCallback(async (lang: string) => {
        try {
            // Use relative paths for module resolution
            const response = await fetch(`/locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load translations for ${lang}`);
            }
            const data = await response.json();
            setTranslations(data);
        } catch (error) {
            console.error(error);
            // Fallback to English if translations are missing
            if (lang !== 'en') {
                await fetchTranslations('en');
            }
        }
    }, []);

    useEffect(() => {
        fetchTranslations(language);
    }, [language, fetchTranslations]);
    
    const setLanguage = (lang: string) => {
        localStorage.setItem('language', lang);
        setLanguageState(lang);
    };

    const t = (key: string, options: Record<string, string> = {}): string => {
        let translation = translations[key] || key;
        Object.keys(options).forEach(optionKey => {
            translation = translation.replace(`{{${optionKey}}}`, options[optionKey]);
        });
        return translation;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
