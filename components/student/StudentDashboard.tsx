import React, { useState } from 'react';
import type { User } from '../../types';
import DashboardLayout from '../dashboard/DashboardLayout';
import Card from '../shared/Card';
import Button from '../shared/Button';
import ProgressChart from './ProgressChart';
import ZapIcon from '../icons/ZapIcon';
import BarChartIcon from '../icons/BarChartIcon';
import ClockIcon from '../icons/ClockIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import CodeIcon from '../icons/CodeIcon';
import QuizPage from './QuizPage';
import { linearRegressionQuiz } from '../../data/quizData';
import type { Question } from '../../data/quizData';
import { useLanguage } from '../../contexts/LanguageContext';
import UsersIcon from '../icons/UsersIcon';
import GroupChat from './GroupChat';
import DownloadIcon from '../icons/DownloadIcon';


interface StudentDashboardProps {
    user: User;
    onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
    const [activeQuiz, setActiveQuiz] = useState<Question[] | null>(null);
    const [isGroupChatOpen, setGroupChatOpen] = useState(false);
    const { t } = useLanguage();

    const quizResults = [
        { name: t('quiz1Python'), shortName: t('quiz1PythonShort'), score: 95 },
        { name: t('quiz2Pandas'), shortName: t('quiz2PandasShort'), score: 88 },
        { name: t('quiz3LinReg'), shortName: t('quiz3LinRegShort'), score: 72 },
    ];

    const chartData = quizResults.map(({ shortName, score }) => ({
        name: shortName,
        score,
        avg: Math.max(50, score - Math.floor(Math.random() * 15) - 5), // Mock class average
    }));

    const handleQuizComplete = (answers: (string | null)[]) => {
        console.log("Quiz answers:", answers); // In a real app, you'd process these for scoring
        alert("Quiz submitted successfully! Check your results in the 'Recent Quiz Results' section soon.");
        setActiveQuiz(null);
    };

    const handleDownloadNotes = (className: string) => {
        alert(`${t('downloadingNotesFor')} ${className}`);
    };
    
    return (
        <DashboardLayout user={user} onLogout={onLogout}>
            {activeQuiz ? (
                <QuizPage quiz={linearRegressionQuiz} onComplete={handleQuizComplete} />
            ) : (
                <>
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('welcomeBack', { name: user.name })}</h1>
                        <p className="text-gray-500 dark:text-gray-400">{t('studentDashboardSubtitle')}</p>
                    </div>
                    <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        {/* Layer 1: Upcoming Classes */}
                        <Card title={t('upcomingClasses')} icon={<ClockIcon className="w-6 h-6" />}>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{t('neuralNetworksIntro')}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('todayAt4')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" className="!px-3 !py-2 text-sm !rounded-lg" onClick={() => handleDownloadNotes(t('neuralNetworksIntro'))}>
                                            <DownloadIcon className="w-4 h-4" />
                                            <span className="hidden sm:inline">{t('downloadNotes')}</span>
                                        </Button>
                                        <Button variant="secondary" className="px-4 py-2 text-sm !rounded-lg">{t('joinNow')}</Button>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{t('decisionTrees')}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('tomorrowAt2')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" className="!px-3 !py-2 text-sm !rounded-lg" onClick={() => handleDownloadNotes(t('decisionTrees'))}>
                                            <DownloadIcon className="w-4 h-4" />
                                            <span className="hidden sm:inline">{t('downloadNotes')}</span>
                                        </Button>
                                    </div>
                                </li>
                            </ul>
                        </Card>

                        {/* Layer 2: Quizzes and Challenges */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card title={t('availableQuizzes')} icon={<CodeIcon className="w-6 h-6" />}>
                                <ul className="space-y-3">
                                    <li className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                                        <div>
                                            <p className="font-semibold">{t('quiz4LinearRegression')}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('quizDetails')}</p>
                                        </div>
                                        <Button variant="secondary" className="px-4 py-2 text-sm !rounded-lg" onClick={() => setActiveQuiz(linearRegressionQuiz)}>{t('startQuiz')}</Button>
                                    </li>
                                </ul>
                            </Card>
                            <Card title={t('dailyChallenges')} icon={<ZapIcon className="w-6 h-6"/>}>
                                <ul className="space-y-3">
                                    <li className="flex items-center justify-between p-3 bg-primary/5 rounded-lg"><span>{t('challenge1')}</span> <span className="font-bold text-green-500">+50 XP</span></li>
                                    <li className="flex items-center justify-between p-3 bg-primary/5 rounded-lg"><span>{t('challenge2')}</span> <span className="font-bold text-yellow-500">+30 XP</span></li>
                                </ul>
                            </Card>
                        </div>

                        {/* Layer 3: Results and Performance */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card title={t('recentQuizResults')} icon={<CheckCircleIcon className="w-6 h-6" />}>
                                <ul className="space-y-3">
                                    {quizResults.map((result, index) => (
                                         <li key={index} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                                            <span>{result.name}</span>
                                            <span className={`font-bold ${result.score >= 80 ? 'text-green-500' : result.score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                                                {result.score}%
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                            <Card title={t('quizPerformanceBreakdown')} icon={<BarChartIcon className="w-6 h-6"/>}>
                                <ProgressChart data={chartData} />
                            </Card>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => setGroupChatOpen(true)}
                        className="fixed bottom-8 left-8 bg-secondary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center animate-pulse-glow hover:bg-secondary-focus transition-transform hover:scale-110 z-40"
                        aria-label={t('classChat')}
                        title={t('classChat')}
                    >
                        <UsersIcon className="w-8 h-8" />
                    </button>
                </>
            )}
            <GroupChat isOpen={isGroupChatOpen} onClose={() => setGroupChatOpen(false)} currentUser={user} />
        </DashboardLayout>
    );
};

export default StudentDashboard;