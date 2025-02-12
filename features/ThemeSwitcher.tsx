'use client';

import cn from 'classnames';
import { LayoutGrid, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className='flex items-center rounded-full bg-gray-200 p-1 dark:bg-[#161616] transition-colors duration-300'>
            {['system', 'light', 'dark'].map((t) => (
                <button
                    key={t}
                    type='button'
                    onClick={() => setTheme(t)}
                    className={cn(
                        'rounded-full p-2 transition-all duration-300',
                        theme === t
                            ? 'bg-white text-black shadow-sm dark:bg-[#0a0a0a] dark:text-white'
                            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                    )}
                >
                    {t === 'system' && <LayoutGrid className='h-4 w-4' />}
                    {t === 'light' && <Sun className='h-4 w-4' />}
                    {t === 'dark' && <Moon className='h-4 w-4' />}
                </button>
            ))}
        </div>
    );
};

export default ThemeSwitcher;
