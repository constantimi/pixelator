'use client';

import { useEffect, useState, ReactNode } from 'react';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props extends ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children, ...props }: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
