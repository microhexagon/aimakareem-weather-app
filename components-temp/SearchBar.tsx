'use client';

import Link from "next/link"; 
import { FaSearch } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

interface SearchBarProps {
    city: string;
    setCity: (city: string) => void;
    handleSearch: () => void;
    handleGeolocation: () => void;
}

export default function SearchBar({ city, setCity, handleSearch, handleGeolocation }: SearchBarProps) {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white text-center mb-4">
                Weather Dashboard
            </h1>
            
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter city name"
                    className="flex-1 px-4 py-3 bg-gray-800 text-white border border-blue-400 rounded-2xl focus:outline-none focus:border-blue-500 placeholder-gray-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    🔍 Search
                </button>
            </div>

            <button
                onClick={handleGeolocation}
                className="w-full bg-blue-500 text-white px-4 py-3 rounded-2xl hover:bg-blue-600 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
                <IoLocationSharp className="text-blue-950 text-3xl font-bold"/>
                    Use My Location
            </button>
        </div>
    );
}

