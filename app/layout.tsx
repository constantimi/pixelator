import '@/styles/globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/features/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </body>
    </html>
);

export default RootLayout;
