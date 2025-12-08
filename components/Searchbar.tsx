'use client';
import Link from "next/link"; 
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";


export default function WeatherPage() {
const [city, setCity] = useState('');

return (
    <main className="">
        <div className="flex flex-col items-center space-y-6">
            <h2 className='font-medium text-2xl text-white'>
                Weather Dashboard
            </h2>

          {/* Input + Button Row */}
            <div className="flex items-center space-x-2">
                <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className='border border-blue-500 rounded-lg h-12 px-4 bg-gray-700 text-white focus:outline-none'
                    />
                <Link href={`/weather/${city}`}>
                    <button 
                        className="bg-blue-400 h-12 rounded-lg px-4 flex items-center gap-2 hover:bg-blue-500 hover:scale-105 transition-all duration-300 text-white"
                    >
                        <FaSearch />
                        <span>Search</span>
                    </button>
                </Link>
            </div>
        </div>
    </main>
);
}
