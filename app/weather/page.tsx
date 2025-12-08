import Link from 'next/link';   
import SearchBar from '../../components/SearchBar';
export default function WeatherPage() {
return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4'>
        <div className='flex flex-col justify-center items-center h-[700px] gap-6 border border-blue-400 bg-gradient-to-b from-blue-950 to-gray-700 rounded-3xl p-8 sm:p-10 w-full max-w-lg'>
            < SearchBar/>
            <Link href='/' className='mt-auto text-blue-400 hover:underline'>
                Back to Home
            </Link>
        </div>
    </div>
);
}