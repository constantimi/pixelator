import ThemeSwitcher from '@/features/ThemeSwitcher';
import ImagePixelator from '@/features/ImagePixelator';

const Home = () => (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
        <div className='fixed top-4 right-4 z-50'>
            <ThemeSwitcher />
        </div>
        <h1 className='text-4xl font-bold mb-4'>Image Pixelator</h1>
        <ImagePixelator />
    </main>
);

export default Home;
