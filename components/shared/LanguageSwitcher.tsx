import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import GlobeIcon from '../icons/GlobeIcon';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = {
        en: 'English',
        vi: 'Tiếng Việt',
    };

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-light transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <GlobeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{languages[language as keyof typeof languages]}</span>
            </button>
            {isOpen && (
                <div 
                    className="absolute right-0 mt-2 w-32 bg-white dark:bg-dark-light rounded-md shadow-lg py-1 z-50 animate-fade-in"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {Object.entries(languages).map(([code, name]) => (
                        <button
                            key={code}
                            onClick={() => handleLanguageChange(code)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;