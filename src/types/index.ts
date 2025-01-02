export interface Prompt {
    category: string;
    text: string;
}

export interface PromptValues {
    [key: string]: string;
}

export interface PromptFillerState {
    template: string;
    placeholders: string[];
    values: PromptValues;
    finalPrompt: string;
    showSamples: boolean;
    searchTerm: string;
    currentPage: number;
    copySuccess: boolean;
}

export interface UsePromptFillerReturn extends PromptFillerState {
    setTemplate: (template: string) => void;
    handleInputChange: (placeholder: string, value: string) => void;
    copyToClipboard: () => Promise<void>;
    setShowSamples: (show: boolean) => void;
    setSearchTerm: (term: string) => void;
    nextPage: () => void;
    prevPage: () => void;
    usePrompt: (promptText: string) => void;
    filteredPrompts: Prompt[];
    totalPages: number;
    currentPrompts: Prompt[];
}
