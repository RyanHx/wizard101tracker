import Button from 'react-bootstrap/Button';
import BootStrapIcon from './BootStrapIcon';
import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function ThemeToggle({ className = "", ...props }) {
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
            if (theme !== preferredTheme()) {
                toggleTheme(false);
            }
        });
    }, [theme, toggleTheme]);

    return (
        <Button title={`Toggle theme (${theme})`} onClick={() => toggleTheme(true)} variant="outline-primary" className={`align-items-center my-lg-0 my-1 ${className}`} aria-label={`Toggle theme (${theme})`} {...props}>
            <BootStrapIcon iconId={theme === 'dark' ? 'moon-stars-fill' : 'sun-fill'} className='opacity-75' />
            <span className="d-lg-none">Toggle theme</span>
        </Button>
    );
}

ThemeToggle.propTypes = {
    className: PropTypes.string
}