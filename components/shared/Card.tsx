
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
    return (
        <div className={`bg-white/50 dark:bg-dark-light/50 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
            {title && (
                <div className="flex items-center mb-4">
                    {icon && <div className="mr-3 text-primary">{icon}</div>}
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
