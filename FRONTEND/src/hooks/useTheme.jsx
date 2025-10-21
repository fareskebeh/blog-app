import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if(theme){
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const darkSys = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if(!stored) {
        setTheme(darkSys ? "dark": "light")

    }
    if(stored==="light" || stored==="dark") {
        setTheme(stored)
    }
    
  }, []);

  

  const changeTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));

  if (theme)
    return (
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        {children}
      </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);