import React, { useState } from 'react';
import type { User } from '../../types';
import { Role } from '../../types';
import Button from '../shared/Button';
import SparklesIcon from '../icons/SparklesIcon';
import DoubtBuddy from '../student/DoubtBuddy';
import MessageSquareIcon from '../icons/MessageSquareIcon';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../shared/LanguageSwitcher';

interface DashboardLayoutProps {
    user: User;
    onLogout: () => void;
    children: React.ReactNode;
}

const XPBar: React.FC<{ currentXP: number; levelXP: number; level: number }> = ({ currentXP, levelXP, level }) => {
    const { t } = useLanguage();
    const progress = (currentXP / levelXP) * 100;
    return (
        <div className="w-full" title={`${t('level')} ${level}: ${currentXP} / ${levelXP} XP`}>
            <div className="hidden sm:flex justify-between items-center mb-1 text-xs">
                <span className="font-bold text-primary">{t('level')} ${level}</span>
                <span className="text-gray-500 dark:text-gray-400">{currentXP} / {levelXP} XP</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout, children }) => {
    const { t } = useLanguage();
    // Mock data - in a real app, this would come from the user object or context
    const levelXP = 1000;
    const streak = 12;
    const [isDoubtBuddyOpen, setIsDoubtBuddyOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
            <header className="bg-white/70 dark:bg-dark-light/70 backdrop-blur-lg sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 gap-4">
                        <div className="flex items-center gap-2 text-2xl font-bold text-primary flex-shrink-0">
                            <SparklesIcon />
                            <span className="hidden md:inline">attention.ai</span>
                        </div>
                        
                        {user.role === Role.Student && (
                            <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-grow justify-end md:justify-center min-w-0 px-2">
                                <div className="flex items-center font-bold text-accent" title={`${streak} ${t('dayStreak')}`}>
                                    <span>🔥 {streak}</span>
                                </div>
                                <div className="w-24 sm:w-32 md:w-48 lg:w-full lg:max-w-xs">
                                    <XPBar currentXP={user.xp || 0} levelXP={levelXP} level={user.level || 1} />
                                </div>
                            </div>
                        )}

                        {user.role === Role.Teacher && (
                           <div className="flex-grow"></div>
                        )}

                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                            <div className="text-right hidden sm:block">
                                <p className="font-semibold text-gray-800 dark:text-gray-100 truncate" title={user.name}>{user.name}</p>
                                <p className="text-sm capitalize text-gray-500 dark:text-gray-400">{t(user.role)}</p>
                            </div>
                            <LanguageSwitcher />
                            <Button onClick={onLogout} variant="ghost" className="!px-3 !py-2 text-sm">{t('logout')}</Button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>
            {user.role === Role.Student && (
                <>
                    <button
                        onClick={() => setIsDoubtBuddyOpen(true)}
                        className="fixed bottom-8 right-8 bg-primary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center animate-pulse-glow hover:bg-primary-focus transition-transform hover:scale-110 z-40"
                        aria-label={t('aiDoubtBuddy')}
                        title={t('aiDoubtBuddy')}
                    >
                        <MessageSquareIcon className="w-8 h-8" />
                    </button>
                    <DoubtBuddy isOpen={isDoubtBuddyOpen} onClose={() => setIsDoubtBuddyOpen(false)} />
                </>
            )}
        </div>
    );
};

export default DashboardLayout;