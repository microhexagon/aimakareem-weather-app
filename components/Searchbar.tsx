'use client';

import Link from "next/link"; 
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    city: string;
    setCity: (city: string) => void;
    handleSearch: () => void;
}

export default function SearchBar({ city, setCity, handleSearch }: SearchBarProps) {

    // Enter key press handler - ab ye handleSearch ko call karega
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && city.trim() !== '') {
            handleSearch();
        }
    };

    return (
    <div>
        <div>
            <h3 className="flex justify-center mb-6 font-medium text-3xl ">
                Weather Dashboard
            </h3>
        </div>
        <div className="flex items-center space-x-2 w-full">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name"
                className="flex-1 px-6 py-4 rounded-2xl bg-gray-800 text-white border border-blue-400 focus:outline-none focus:border-blue-500 placeholder-gray-500"
            />
            <button
                className="bg-blue-500 text-white font-medium text-xl px-6 py-4 flex items-center justify-center gap-2 rounded-2xl hover:bg-gray-700 hover:scale-105 transition-all duration-300"
                onClick={handleSearch}
            >
                <FaSearch />
                Search
            </button>
        </div>
    </div>
    );
}