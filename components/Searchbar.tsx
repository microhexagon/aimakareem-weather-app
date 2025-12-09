'use client';
import Link from "next/link"; 
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ city, setCity }) {

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && city.trim() !== '') {
            window.location.href = `/weather/${city}`;
        }
    };

    return (
        <div className="flex items-center space-x-2 w-full">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className='flex-1 px-6 py-4 rounded-2xl bg-gray-800 
                text-white border border-blue-400 focus:outline-none 
                focus:border-blue-500 placeholder-gray-500'
                onKeyPress={handleKeyPress}
            />

            <Link href={`/weather/${city}`}>
                <button
                    className=" bg-blue-500 text-white font-medium text-xl 
                    rounded-2xl  px-6 py-4 flex items-center justify-center 
                    hover:bg-gray-700 hover:scale-105 transition-transform"
                >
                    <FaSearch />
                    Search
                    
                </button>
            </Link>
        </div>
    );
}
