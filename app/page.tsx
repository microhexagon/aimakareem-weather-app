
import Link from'next/link';
import Image from 'next/image';
export default function Home() {
return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4'>
        <div className='flex flex-col justify-center items-center h-[700px] gap-6 border border-blue-400 bg-gradient-to-b from-blue-950 to-gray-700 rounded-3xl p-8 sm:p-10 w-full max-w-lg'>
            <Image
            className='mb-4'
            src="/assets/logo image.png" 
            alt="Weather Icon"
            width={300}
            height={300}
            />
            <div className='flex flex-col items-center text-center -mt-2'>
                <h1 className='font-medium text-2xl sm:text-3xl md:text-4xl text-white leading-tight'>Daily</h1>
                <h1 className='font-medium text-2xl sm:text-3xl md:text-4xl text-white leading-tight'>Weather</h1>
            </div>
            <p className='text-gray-400 text-sm sm:text-base text-center max-w-xs leading-relaxed -mt-2'>Our app will accurately display current weather conditions in no time</p>
            
            <Link href="/" className='mt-2'>
            <button className='font-medium text-xl mt-10 cursor-pointer bg-blue-400 px-12 py-3 rounded-3xl border border-blue-800 hover:bg-blue-500 hover:scale-105 transition-all duration-300'>
                Get Started
            </button>
            </Link>
        </div>
    </div>
);
};



