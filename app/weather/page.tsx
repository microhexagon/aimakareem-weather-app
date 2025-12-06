import react from'react';
import Link from'next/link';
import Image from 'next/image';
export default function Weather() {
return (
    <div className='flex  justify-center items-center h-screen'>
        <div className=' flex flex-col  justify-center items-center min-h-screen gap-4 sm:gap-6 border border-blue-400 bg-gradient-to-b from-blue-950 to-gray-700 rounded-3xl p-5 sm:p-8 md:p-10'>
        <Image
        src="/assets/app-logo.png" 
        alt="Weather Icon"
        width={100}
        height={100}
        />
        <h1 className='font-medium sm:text-2xl md:text-3xl'>Daily Weather</h1>
        <p className='text-gray-500 text-sm sm:text-base md:text-lg text-center max-w-xs sm:max-w-sm md:max-w-md'>Our app will accurately diplay current weather conditions in no time</p>
        <Link href="/">
        <button className='font-medium text-xl cursor-pointer bg-blue-400 h-10 w-48 rounded-2xl hover:bg-blue-500  hover:scale-110 transition'>
            Get Started
        </button>
        </Link>
    </div>
    </div>
);
};





