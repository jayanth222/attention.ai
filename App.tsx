import React, { useState, useCallback } from 'react';
import type { User } from './types';
import { Page, Role } from './types';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StreamSelectionPage from './components/stream/StreamSelectionPage';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
    const [user, setUser] = useState<User | null>(null);
    const [roleForLogin, setRoleForLogin] = useState<Role>(Role.Student);

    const handleLogin = useCallback((loggedInUser: User) => {
        setUser(loggedInUser);
        setCurrentPage(Page.StreamSelection);
    }, []);

    const handleStreamSelected = useCallback(() => {
        if (user?.role === Role.Student) {
            setCurrentPage(Page.StudentDashboard);
        } else {
            setCurrentPage(Page.TeacherDashboard);
        }
    }, [user]);

    const handleLogout = useCallback(() => {
        setUser(null);
        setCurrentPage(Page.Landing);
    }, []);
    
    const navigateToLogin = useCallback((role: Role) => {
        setRoleForLogin(role);
        setCurrentPage(Page.Login);
    }, []);

    const renderContent = () => {
        switch (currentPage) {
            case Page.Landing:
                return <LandingPage onNavigate={navigateToLogin} />;
            case Page.Login:
                return <LoginPage onLogin={handleLogin} role={roleForLogin} />;
            case Page.StreamSelection:
                return <StreamSelectionPage onStreamSelect={handleStreamSelected} />;
            case Page.StudentDashboard:
                return user && <StudentDashboard user={user} onLogout={handleLogout} />;
            case Page.TeacherDashboard:
                return user && <TeacherDashboard user={user} onLogout={handleLogout} />;
            default:
                return <LandingPage onNavigate={navigateToLogin} />;
        }
    };

    return (
        <LanguageProvider>
            <div className="bg-light dark:bg-dark min-h-screen text-dark dark:text-light font-sans">
                {renderContent()}
            </div>
        </LanguageProvider>
    );
};

export default App;