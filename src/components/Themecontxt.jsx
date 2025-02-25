import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isLight, setIsLight] = useState(true);

    useEffect(() => {
        document.body.setAttribute("data-theme", isLight ? "light" : "dark");
    }, [isLight]);

    const toggleTheme = () => {
        setIsLight((prevTheme) => !prevTheme);
    };

    return (
        <ThemeContext.Provider value={{ isLight, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};