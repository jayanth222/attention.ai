import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProgressChartProps {
    data: { name: string; score: number; avg: number }[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
    const { t } = useLanguage();
    // Recharts requires client-side rendering. This hook ensures it only renders on the client.
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="h-64 flex items-center justify-center"><p>{t('loadingChart')}</p></div>;
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
             <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 0, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                            border: '1px solid #4B5563',
                            borderRadius: '0.75rem'
                        }} 
                        labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend />
                    <Bar dataKey="score" name={t('yourScore')} fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avg" name={t('classAverage')} fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart;