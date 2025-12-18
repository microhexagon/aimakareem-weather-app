import { FaSearch } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { WeatherTheme } from "./WeatherCard";

interface SearchBarProps {
    city: string;
    setCity: (city: string) => void;
    handleSearch: () => void;
    handleGeolocation: () => void;
    theme: WeatherTheme;
}

export default function SearchBar({ city, setCity, handleSearch, handleGeolocation, theme }: SearchBarProps) {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
            {/* Search Input with Button */}
            <div className="flex items-center space-x-2 w-full">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter city name"
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 ${theme.detailsBg} ${theme.textPrimary} border ${theme.detailsBorder} rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-0 ${theme.textAccent === 'text-sky-400' ? 'focus:ring-sky-400' : 'focus:ring-orange-400'} placeholder-gray-400 text-sm sm:text-base transition-all duration-300 backdrop-blur-sm`}
                />
                <button
                    onClick={handleSearch}
                    className={`${theme.btnBg} ${theme.btnHover} ${theme.btnText} px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg min-w-[80px] sm:min-w-[100px]`}
                >
                    <FaSearch className="text-sm sm:text-base" />
                    <span className="hidden sm:inline text-sm sm:text-base font-medium">Search</span>
                    <span className="sm:hidden text-sm font-medium">Go</span>
                </button>
            </div>

            {/* Geolocation Button */}
            <button
                onClick={handleGeolocation}
                className={`w-full ${theme.btnBg} ${theme.btnHover} ${theme.btnText} px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base font-medium`}
            >
                <IoLocationSharp className="text-lg sm:text-xl" />
                Use My Location
            </button>
        </div>
    );
}

