import React from 'react';
import Button from '../shared/Button';
import SparklesIcon from '../icons/SparklesIcon';
import BookOpenIcon from '../icons/BookOpenIcon';
import ZapIcon from '../icons/ZapIcon';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import GlobeIcon from '../icons/GlobeIcon';
import { Role } from '../../types';

interface LandingPageProps {
    onNavigate: (role: Role) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center transform hover:scale-105 transition-transform duration-300">
        <div className="inline-block bg-primary/20 text-primary p-4 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white animate-gradient-bg bg-[length:200%_200%]">
            <div className="container mx-auto px-6 py-12 text-center animate-fade-in">
                {/* Header */}
                <header className="py-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">attention.ai</h1>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <LanguageSwitcher />
                        <Button onClick={() => onNavigate(Role.Student)} variant="ghost">{t('login')}</Button>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="py-20 md:py-32">
                    <SparklesIcon className="w-16 h-16 mx-auto text-accent mb-4" />
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                        {t('landingTitle1')}
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400">
                            {t('landingTitle2')}
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        {t('landingSubtitle')}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button onClick={() => onNavigate(Role.Student)} variant="primary" glow>{t('getStarted')}</Button>
                        <Button onClick={() => onNavigate(Role.Teacher)} variant="ghost" className="border-2 border-white/50 text-white hover:bg-white/20">{t('forTeachers')}</Button>
                    </div>
                </main>

                {/* Features Section */}
                <section id="features" className="py-20">
                    <h3 className="text-3xl font-bold mb-12">{t('whyEduMate')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<ZapIcon className="w-8 h-8"/>} 
                            title={t('featureGamifiedTitle')}
                            description={t('featureGamifiedDesc')}
                        />
                        <FeatureCard 
                            icon={<BookOpenIcon className="w-8 h-8"/>}
                            title={t('featureAIBuddyTitle')}
                            description={t('featureAIBuddyDesc')}
                        />
                         <FeatureCard 
                            icon={<SparklesIcon className="w-8 h-8"/>}
                            title={t('featureFeedbackTitle')}
                            description={t('featureFeedbackDesc')}
                        />
                         <FeatureCard 
                            icon={<GlobeIcon className="w-8 h-8"/>}
                            title={t('featureMultilingualTitle')}
                            description={t('featureMultilingualDesc')}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;