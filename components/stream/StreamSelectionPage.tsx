import React from 'react';
import BrainCircuitIcon from '../icons/BrainCircuitIcon';
import { useLanguage } from '../../contexts/LanguageContext';

interface StreamSelectionPageProps {
    onStreamSelect: () => void;
}

const StreamSelectionPage: React.FC<StreamSelectionPageProps> = ({ onStreamSelect }) => {
    const { t } = useLanguage();

    const streams = [
        { nameKey: 'streamML', enabled: true },
        { nameKey: 'streamAI', enabled: false },
        { nameKey: 'streamDS', enabled: false },
        { nameKey: 'streamDL', enabled: false },
        { nameKey: 'streamMLOps', enabled: false },
        { nameKey: 'streamLLMs', enabled: false },
        { nameKey: 'streamLLMOps', enabled: false },
        { nameKey: 'streamCV', enabled: false },
    ];

    const handleCardClick = (enabled: boolean) => {
        if (enabled) {
            onStreamSelect();
        } else {
            alert(t('streamComingSoonAlert'));
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-900 dark:to-indigo-900 p-4 animate-fade-in">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">{t('chooseStream')}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{t('streamSubtitle')}</p>
            </div>
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {streams.map((stream) => (
                    <div
                        key={stream.nameKey}
                        onClick={() => handleCardClick(stream.enabled)}
                        className={`
                            p-6 rounded-2xl border-2 transition-all duration-300 transform 
                            flex flex-col items-center justify-center text-center
                            ${stream.enabled
                                ? 'bg-white/60 dark:bg-dark-light/60 border-primary cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:border-primary-focus'
                                : 'bg-gray-200/50 dark:bg-dark/50 border-gray-300 dark:border-gray-700 cursor-not-allowed opacity-60'
                            }
                        `}
                    >
                        <div className={`p-3 rounded-full mb-4 ${stream.enabled ? 'bg-primary/20 text-primary' : 'bg-gray-400/20 text-gray-500'}`}>
                            <BrainCircuitIcon className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t(stream.nameKey)}</h3>
                        {!stream.enabled && <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('comingSoon')}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StreamSelectionPage;