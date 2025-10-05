
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    className?: string;
    glow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', glow = false, ...props }) => {
    const baseClasses = 'px-6 py-3 font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-4 flex items-center justify-center gap-2';
    
    const variantClasses = {
        primary: 'bg-primary text-white hover:bg-primary-focus focus:ring-primary/50',
        secondary: 'bg-secondary text-white hover:bg-secondary-focus focus:ring-secondary/50',
        ghost: 'bg-transparent text-primary hover:bg-primary/10',
    };

    const glowClasses = glow ? 'animate-pulse-glow' : '';

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${glowClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
