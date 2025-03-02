import '@/styles/globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/features/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang='en' suppressHydrationWarning>
        <head>
            <meta charSet='UTF-8' />
            <link rel='icon' type='image/svg+xml' href='/vercel.svg' />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0'
            />
            <title>Pixelator</title>
        </head>
        <body className={inter.className}>
            <ThemeProvider
                attribute='class'
                defaultTheme='light'
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </body>
    </html>
);

export default RootLayout;
