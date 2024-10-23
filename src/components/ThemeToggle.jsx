import Button from 'react-bootstrap/Button';
import BootStrapIcon from './BootStrapIcon';
import { useState } from 'react';

export default function ThemeToggle() {
    const getIsDarkThemePreferred = () => {
        const isDarkThemeStored = localStorage.getItem('isDarkTheme')
        if (isDarkThemeStored !== null) {
            return isDarkThemeStored === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    const [isDarkMode, setIsDarkMode] = useState(getIsDarkThemePreferred());
    const setTheme = isDark => {
        setIsDarkMode(isDark);
        localStorage.setItem('isDarkTheme', isDark);
        document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    }
    
    return (
        <Button id="bd-theme" onClick={() => setTheme(!isDarkMode)} variant="outline-primary" className='align-items-center' aria-label={`Toggle theme (${isDarkMode ? 'dark' : 'light'})`}>
            <BootStrapIcon iconId={isDarkMode ? 'moon-stars-fill' : 'sun-fill'} className='opacity-75' />
            <span className="d-lg-none ms-2" id="bd-theme-text">Toggle theme</span>
        </Button>
    );
}