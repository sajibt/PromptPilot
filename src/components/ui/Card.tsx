import React from 'react';
import { useTheme } from '../../hooks/use-theme';

// Interface for reusable Card components
interface CardProps {
    className?: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
    const { theme } = useTheme(); // Access the current theme

    return (
        <div
            className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
                } shadow-md rounded-md p-4 ${className}`}
        >
            {children}
        </div>
    );
};

export const CardHeader: React.FC<CardProps> = ({ className, children }) => {
    const { theme } = useTheme(); // Access the current theme

    return <div className={`${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 ${className}`}>{children}</div>;
};

export const CardContent: React.FC<CardProps> = ({ className, children }) => {
    const { theme } = useTheme(); // Access the current theme

    return <div className={`${theme === 'dark' ? 'text-white' : 'text-black'} ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardProps> = ({ children, className }) => {
    const { theme } = useTheme(); // Access the current theme

    return <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} ${className}`}>{children}</h2>;
};

