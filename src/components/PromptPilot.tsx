import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card.tsx';
import { Input } from '../components/ui/Input.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/Dialog.tsx';
import { Copy, ChevronLeft, Search, Check } from 'lucide-react';
import { SAMPLE_PROMPTS } from '../data/samplePrompts';

const PROMPTS_PER_PAGE = 5;

const PromptPilot = () => {
    const [template, setTemplate] = useState('');
    const [placeholders, setPlaceholders] = useState<string[]>([]);
    const [values, setValues] = useState<{ [key: string]: string }>({});
    const [finalPrompt, setFinalPrompt] = useState('');
    const [showSamples, setShowSamples] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [copySuccess, setCopySuccess] = useState(false);

    // Extract placeholders from template
    useEffect(() => {
        const matches = template.match(/\[(.*?)\]/g) || [];
        const uniquePlaceholders = [...new Set(matches.map(m => m.slice(1, -1)))];
        setPlaceholders(uniquePlaceholders);

        const initialValues: { [key: string]: string } = {};
        uniquePlaceholders.forEach(p => {
            initialValues[p] = values[p] || '';
        });
        setValues(initialValues);
    }, [template]);

    useEffect(() => {
        let result = template;
        Object.entries(values).forEach(([key, value]) => {
            const regex = new RegExp(`\\[${key}\\]`, 'g');
            result = result.replace(regex, value);
        });

        setFinalPrompt(result);
    }, [template, values]);

    const handleInputChange = (placeholder: string, value: string) => {
        setValues(prev => ({
            ...prev,
            [placeholder]: value
        }));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(finalPrompt)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch((err) => {
                console.error('Error copying text to clipboard: ', err);
                setCopySuccess(false);
            });
    };

    const filteredPrompts = SAMPLE_PROMPTS.filter(prompt =>
        prompt.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPrompts.length / PROMPTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROMPTS_PER_PAGE;
    const endIndex = startIndex + PROMPTS_PER_PAGE;
    const currentPrompts = filteredPrompts.slice(startIndex, endIndex);

    const usePrompt = (promptText: string) => {
        setTemplate(promptText);
        setShowSamples(false);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(curr => curr + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(curr => curr - 1);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <Card className="w-full max-w-2xl mx-auto p-4 dark:bg-gray-800 dark:text-white">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold">Prompt Pilot</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setShowSamples(true)}>
                        Sample Prompts
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Template:</label>
                    <textarea
                        className="w-full p-2 border rounded-md min-h-[100px] dark:bg-gray-700 dark:text-white"
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        placeholder="Enter your template with [placeholders] or choose from sample prompts"
                    />
                </div>

                {placeholders.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Fill Placeholders:</h3>
                        {placeholders.map((placeholder) => (
                            <div key={placeholder} className="space-y-1">
                                <label className="block text-sm font-medium capitalize">{placeholder}:</label>
                                <Input
                                    value={values[placeholder] || ''}
                                    onChange={(e) => handleInputChange(placeholder, e.target.value)}
                                    placeholder={`Enter ${placeholder}`}
                                    className="dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {finalPrompt && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Final Prompt:</h3>

                            <Button
                                onClick={copyToClipboard}
                                variant="outline"
                                size="sm"
                                className={`flex items-center gap-2 ${copySuccess ? 'border-green-500 text-green-500' : 'border-gray-300'}`}
                            >
                                {copySuccess ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                                {copySuccess ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-md min-h-[100px] whitespace-pre-wrap dark:bg-gray-900 dark:text-white">
                            {finalPrompt}
                        </div>
                    </div>
                )}

                <Dialog open={showSamples} onOpenChange={setShowSamples}>
                    <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
                        <DialogHeader>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setShowSamples(false)}
                                        className="mr-2"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <DialogTitle>Prompts ({filteredPrompts.length} total)</DialogTitle>
                                </div>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="Search prompts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 w-full dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto">
                            {currentPrompts.map((prompt, index) => (
                                <div key={index} className="mb-4 p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="text-blue-600 mb-2">{prompt.category}</div>
                                            <div>{prompt.text}</div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => usePrompt(prompt.text)}
                                            className="shrink-0"
                                        >
                                            Use
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between pt-4 border-t dark:border-gray-600">
                            <div className="text-sm text-gray-500">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default PromptPilot;

