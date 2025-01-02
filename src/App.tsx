import { Layout } from "./components/layout/Layout";
import PromptPilot from "./components/PromptPilot";
import { ThemeProvider } from "./components/theme/theme-provider";

const App = () => {
    return (
        <ThemeProvider>
            <div className="w-full h-full">
                <Layout>
                    <PromptPilot />
                </Layout>
            </div>
        </ThemeProvider>
    );
};

export default App;

