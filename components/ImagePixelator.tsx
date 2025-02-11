'use client';

import type React from 'react';
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import FileSaver from 'file-saver';
import { ThemeSwitcher } from './theme-switcher';

const pixelSizes = [4, 8, 16, 32, 64];

const ImagePixelator: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
        null
    );
    const [pixelSize, setPixelSize] = useState<number>(4);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setOriginalImage(img);
                    pixelateImage(img, pixelSize);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const pixelateImage = useCallback((img: HTMLImageElement, size: number) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw original image
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Pixelate
        for (let y = 0; y < img.height; y += size) {
            for (let x = 0; x < img.width; x += size) {
                // Get the pixel color at the current position
                const pixelData = ctx.getImageData(x, y, 1, 1).data;
                ctx.fillStyle = `rgb(${pixelData[0]},${pixelData[1]},${pixelData[2]})`;
                ctx.fillRect(x, y, size, size);
            }
        }
    }, []);

    const handlePixelSizeChange = useCallback(
        (newSize: number) => {
            setPixelSize(newSize);
            if (originalImage) {
                pixelateImage(originalImage, newSize);
            }
        },
        [originalImage, pixelateImage]
    );

    const handleExport = () => {
        if (canvasRef.current) {
            canvasRef.current.toBlob((blob) => {
                if (blob) {
                    FileSaver.saveAs(blob, 'pixelated_image.png');
                }
            });
        }
    };

    const handleClear = () => {
        setOriginalImage(null);
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx?.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
        }
        // Reset the file input
        const fileInput = document.getElementById(
            'image-upload'
        ) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <div className='flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground'>
            <div className='fixed top-4 right-4 z-50'>
                <ThemeSwitcher />
            </div>
            <div className='w-full max-w-md flex flex-col items-center gap-6'>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                    id='image-upload'
                />
                <label
                    htmlFor='image-upload'
                    className='cursor-pointer border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-8 w-full text-center hover:border-gray-500 dark:hover:border-gray-500 transition-colors'
                >
                    Click to upload an image
                </label>
                <div className='relative w-full aspect-square rounded-lg overflow-hidden bg-black'>
                    <canvas
                        ref={canvasRef}
                        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full'
                    />
                </div>
                <div className='flex gap-4 justify-center'>
                    {pixelSizes.map((size) => (
                        <Button
                            key={size}
                            onClick={() => handlePixelSizeChange(size)}
                            variant={pixelSize === size ? 'default' : 'outline'}
                            className='font-mono text-sm'
                        >
                            {size}PX
                        </Button>
                    ))}
                </div>
                <div className='flex gap-2 w-full'>
                    <Button
                        onClick={handleExport}
                        className='flex-1 font-mono'
                        variant='outline'
                    >
                        EXPORT PNG
                    </Button>
                    <Button
                        onClick={handleClear}
                        className='flex-1 font-mono'
                        variant='outline'
                    >
                        CLEAR ALL
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ImagePixelator;
