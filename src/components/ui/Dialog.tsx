import React from 'react';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
    return (
        <div
            className={`${open ? 'block' : 'hidden'} fixed inset-0 bg-gray-500 bg-opacity-50 pt-2`}
            onClick={() => onOpenChange(false)}
        >
            <div
                className="relative w-full max-w-lg mx-auto mt-14 bg-background text-foreground p-4 rounded-md"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="mb-4">{children}</div>;
};

export const DialogContent: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <h2 className="text-xl font-bold">{children}</h2>;
};

