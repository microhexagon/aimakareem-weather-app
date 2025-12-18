import Link from'next/link';
import Image from 'next/image';

export default function Home() {
return (
    <div className='flex justify-center items-center h-screen w-screen bg-gradient-to-b from-gray-900 to-gray-800 p-3 sm:p-4 overflow-hidden'>
        <div className='flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-6 border border-blue-400 bg-gradient-to-b from-blue-700 to-gray-700 rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-[95vw] sm:max-w-md md:max-w-lg h-[90vh] sm:h-auto sm:max-h-[85vh]'>
            
            {/* Weather Icon Image */}
            <div className='relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0'>
                <Image
                    src="/assets/logo image.png" 
                    alt="Weather Icon"
                    fill
                    className='object-contain'
                    priority
                />
            </div>
            
            {/* Title */}
            <div className='flex flex-col items-center text-center'>
                <h1 className='font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight'>Daily</h1>
                <h1 className='font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight'>Weather</h1>
            </div>
            
            {/* Description */}
            <p className='text-gray-300 text-xs sm:text-sm md:text-base text-center max-w-[90%] sm:max-w-xs leading-relaxed px-2'>
                Our app will accurately display current weather conditions in no time
            </p>
            
            {/* Get Started Button */}
            <Link href="/weather" className='mt-auto sm:mt-4'>
                <button className='font-medium text-base sm:text-lg md:text-xl cursor-pointer bg-blue-400 px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 rounded-3xl border border-blue-800 hover:bg-blue-950 hover:scale-105 transition-all duration-300 shadow-lg'>
                    Get Started
                </button>
            </Link>
        </div>
    </div>
);
}