import React from 'react';

interface InputProps {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    className?: string;
}

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, className }) => {
    return (
        <input
            type="text"
            className={`border rounded-md p-2 w-full bg-input text-foreground placeholder:text-muted-foreground ${className}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

