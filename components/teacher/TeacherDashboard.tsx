import React, { useState, useRef } from 'react';
import type { User } from '../../types';
import DashboardLayout from '../dashboard/DashboardLayout';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import UploadIcon from '../icons/UploadIcon';
import FileIcon from '../icons/FileIcon';

interface TeacherDashboardProps {
    user: User;
    onLogout: () => void;
}

const StudentProgress: React.FC<{name: string, progress: number, emotion: string}> = ({name, progress, emotion}) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-light/50 rounded-lg">
        <div className="flex items-center gap-3">
            <span className="text-2xl">{emotion}</span>
            <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{name}</p>
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full" style={{width: `${progress}%`}}></div>
                </div>
            </div>
        </div>
        <span className="font-bold text-gray-600 dark:text-gray-300">{progress}%</span>
    </div>
);


const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onLogout }) => {
    const { t } = useLanguage();
    // Recharts requires client-side rendering
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    // Mock data for insights chart based on student quizzes
    const insightsData = [
        { quizName: t('quizTopicPython'), struggles: 4 },
        { quizName: t('quizTopicPandas'), struggles: 7 },
        { quizName: t('quizTopicLinReg'), struggles: 12 },
    ];

    const [files, setFiles] = useState([
        { name: t('lectureSlides') },
        { name: t('assignment3') },
    ]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files?.[0];
        if (newFile) {
            setFiles(prevFiles => [...prevFiles, { name: newFile.name }]);
        }
    };

    return (
        <DashboardLayout user={user} onLogout={onLogout}>
            <div className="mb-8 animate-fade-in">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{t('teacherDashboard')}</h1>
                <p className="text-gray-500 dark:text-gray-400">{t('teacherDashboardSubtitle', { name: user.name })}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
                {/* Student Overview */}
                <Card title={t('studentProgress')} className="lg:col-span-2">
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        <StudentProgress name="Alice Johnson" progress={85} emotion="😊" />
                        <StudentProgress name="Bob Williams" progress={62} emotion="🤔" />
                        <StudentProgress name="Charlie Brown" progress={91} emotion="😄" />
                        <StudentProgress name="Diana Miller" progress={45} emotion="😟" />
                        <StudentProgress name="Ethan Davis" progress={78} emotion="🙂" />
                        <StudentProgress name="Fiona Garcia" progress={55} emotion="😕" />
                    </div>
                </Card>

                <div className="space-y-6">
                    {/* Real-time Alerts */}
                    <Card title={t('realTimeAlerts')}>
                        <ul className="space-y-3">
                            <li className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg">
                                <p className="font-semibold">{t('alert1')}</p>
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">{t('alert1Detail')}</p>
                            </li>
                             <li className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
                                <p className="font-semibold">{t('alert2')}</p>
                                 <p className="text-sm text-red-700 dark:text-red-300">{t('alert2Detail')}</p>
                            </li>
                        </ul>
                    </Card>

                    {/* Class Materials */}
                    <Card title={t('classMaterials')}>
                        <div className="space-y-3 mb-4">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-dark-light/50 rounded-lg">
                                    <FileIcon className="w-5 h-5 text-primary"/>
                                    <span className="text-sm text-gray-700 dark:text-gray-200 truncate">{file.name}</span>
                                </div>
                            ))}
                        </div>
                        <Button onClick={handleUploadClick} variant="secondary" className="w-full !rounded-lg text-sm">
                           <UploadIcon className="w-4 h-4 mr-2" />
                           {t('uploadFile')}
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </Card>
                </div>

                {/* Class Insights */}
                <Card title={t('quizPerformanceInsights')} className="lg:col-span-3">
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{t('quizPerformanceInsightsDesc')}</p>
                    <div style={{ width: '100%', height: 300 }}>
                        {isClient && (
                            <ResponsiveContainer>
                                <BarChart data={insightsData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
                                    <XAxis type="number" stroke="#888" />
                                    <YAxis dataKey="quizName" type="category" width={120} stroke="#888" />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                                            border: '1px solid #4B5563',
                                            borderRadius: '0.75rem'
                                        }} 
                                        labelStyle={{ color: '#F3F4F6' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="struggles" name={t('studentsStruggling')} fill="#F59E0B" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default TeacherDashboard;