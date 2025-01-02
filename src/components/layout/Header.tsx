import ThemeToggle from "../theme/theme-toggle";
import { Github } from "lucide-react";
import { Button } from "../ui/Button";
import { useTheme } from "../../hooks/use-theme";

export function Header() {
    const { theme } = useTheme();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full flex h-16 items-center px-4"> {/* Removed container class */}
                <div className="flex flex-1">
                    <a
                        className="flex items-center space-x-2 transition-transform hover:scale-105"
                        href="/"
                    >
                        {theme === 'light' ? (
                            <img
                                src="LogoLight.png"
                                alt="Logo"
                                className="w-auto h-8"
                            />
                        ) : (
                            <img
                                src="LogoDark.png"
                                alt="Logo"
                                className="w-auto h-8"
                            />
                        )}
                    </a>
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden sm:flex transition-all hover:bg-accent/20 hover:scale-105"
                        onClick={() => window.open('https://github.com/sajibt/PromptPilot', '_blank')}
                    >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Button>
                    <div className="transition-transform hover:scale-105">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}

