import Button from 'react-bootstrap/Button';
import BootStrapIcon from './BootStrapIcon';
import { useEffect, useState, useCallback } from 'react';

export default function ThemeToggle() {
    const preferredTheme = () => {
        const theme = localStorage.getItem('theme')
        if (theme !== null) {
            return theme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    const [theme, setTheme] = useState(preferredTheme());
    const toggleTheme = useCallback((save) => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        if (save) {
            localStorage.setItem('theme', newTheme);
        }
        document.documentElement.setAttribute('data-bs-theme', newTheme);
    }, [theme]);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            console.log('browser preferred theme changed');
            if (theme !== preferredTheme()) {
                toggleTheme(false);
            }
        });
    }, [theme, toggleTheme]);

    return (
        <Button id="bd-theme" onClick={() => toggleTheme(true)} variant="outline-primary" className='align-items-center' aria-label='Toggle theme (theme)'>
            <BootStrapIcon iconId={theme === 'dark' ? 'moon-stars-fill' : 'sun-fill'} className='opacity-75' />
            <span className="d-lg-none ms-2" id="bd-theme-text">Toggle theme</span>
        </Button>
    );
}