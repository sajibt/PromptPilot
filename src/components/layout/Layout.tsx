import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '../../hooks/use-theme';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Header />
            <main className="flex-1 w-full py-6">
                {children}
            </main>
            <Footer />
        </div>
    );
}

