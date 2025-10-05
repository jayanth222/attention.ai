import React, { useState } from 'react';
import type { User } from '../../types';
import { Role } from '../../types';
import Button from '../shared/Button';
import Card from '../shared/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import UserIcon from '../icons/UserIcon';
import LockIcon from '../icons/LockIcon';

interface LoginPageProps {
    onLogin: (user: User) => void;
    role: Role;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, role }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{name?: string, password?: string}>({});
    const { t } = useLanguage();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: {name?: string, password?: string} = {};
        if (!name.trim()) {
            newErrors.name = t('nameError');
        }
        if (!password.trim()) {
            newErrors.password = t('passwordError');
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const user: User = {
            name,
            role: role,
            ...(role === Role.Student && { level: 1, xp: 0 }),
        };
        onLogin(user);
    };

    const title = role === Role.Student ? t('studentLogin') : t('teacherLogin');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-900 dark:to-indigo-900 p-4 animate-fade-in relative">
            <div className="absolute top-4 right-4">
                <LanguageSwitcher />
            </div>
            <Card className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary">{title}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{t('loginSubtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{t('fullName')}</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <UserIcon className="w-5 h-5 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-dark border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder={t('namePlaceholder')}
                            />
                        </div>
                         {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{t('password')}</label>
                         <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockIcon className="w-5 h-5 text-gray-400" />
                            </span>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-dark border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder={t('passwordPlaceholder')}
                            />
                        </div>
                         {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                    </div>
                    
                    <Button type="submit" className="w-full !mt-8" glow>
                        {t('enterDashboard')}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;