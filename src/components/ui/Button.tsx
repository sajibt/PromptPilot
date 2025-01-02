import React from 'react';

type ButtonVariant = 'ghost' | 'solid' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps {
    variant: ButtonVariant;
    size: ButtonSize;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant, size, onClick, children, className, disabled }) => {
    const variantClass = variant === 'ghost' ?
        'bg-transparent border text-foreground' :
        variant === 'solid' ?
            'bg-primary text-primary-foreground' :
            'bg-transparent border-2 text-foreground';

    const sizeClass = size === 'sm' ? 'py-2 px-4 text-sm' :
        size === 'md' ? 'py-3 px-6 text-base' :
            size === 'lg' ? 'py-4 px-8 text-lg' :
                size === 'icon' ? 'p-2' : '';

    return (
        <button
            className={`${variantClass} ${sizeClass} rounded-md ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onClick}
            disabled={disabled} // Apply the disabled prop here
        >
            {children}
        </button>
    );
};

