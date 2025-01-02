import { useContext } from "react";
import { ThemeProviderContext } from "../components/theme/theme-provider";

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    console.log("useTheme context:", context);

    return context;
};

