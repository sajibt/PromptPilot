export function Footer() {
    return (
        <footer className="w-full py-6 border-t border-border/40 bg-background">
            <div className="container mx-auto flex justify-center items-center">
                <p className="text-sm sm:text-base text-center text-muted-foreground">
                    <span
                        className="font-semibold text-lg text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 ease-in-out"
                    >
                        ©PromptPilot
                    </span>
                    <span className="ml-2 font-semibold text-black dark:text-white">
                        {new Date().getFullYear()}
                    </span>
                </p>
            </div>
        </footer>
    );
}

