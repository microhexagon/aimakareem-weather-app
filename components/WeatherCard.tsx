
'use client';

import { IoEarth } from "react-icons/io5";

interface WeatherCardProps {
    weather: any;
    loading: boolean;
    error: string;
    theme: WeatherTheme;
}

export interface WeatherTheme {
    bgGradient: string;
    cardBg: string;
    cardBorder: string;
    detailsBg: string;
    detailsBorder: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
}

export default function WeatherCard({ weather, loading, error, theme }: WeatherCardProps) {

    // Loading State
    if (loading) {
        return (
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10`}>
                <div className='flex flex-col items-center gap-3 sm:gap-4'>
                    <div className='animate-spin text-3xl sm:text-4xl md:text-5xl'>🌀</div>
                    <p className={`${theme.textPrimary} text-sm sm:text-base md:text-lg`}>Loading weather data...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className='bg-red-500/20 border border-red-500 text-red-300 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-center text-sm sm:text-base'>
                ❌ {error}
            </div>
        );
    }

    // Weather icon selector function
    const getWeatherIcon = (main: string) => {
        const icons: any = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Fog': '🌫️',
            'Haze': '🌫️',
            'Smoke': '💨'
        };
        return icons[main] || '🌤️';
    };

    // Weather Data Display
    if (weather) {
        return (
            <div className="w-full">
                {/* Main Weather Info */}
                <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl`}>
                    <div className='text-center mb-4 sm:mb-6'>
                        <div className='text-4xl sm:text-5xl md:text-7xl mb-2 sm:mb-3'>
                            {getWeatherIcon(weather.weather[0].main)}
                        </div>
                        <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.textPrimary} mb-1 sm:mb-2 px-2`}>
                            {weather.name}, {weather.sys.country}
                        </h2>
                        <p className={`text-3xl sm:text-4xl md:text-5xl font-bold ${theme.textAccent} mb-1 sm:mb-2`}>
                            {Math.round(weather.main.temp)}°C
                        </p>
                        <p className={`text-base sm:text-lg md:text-xl ${theme.textSecondary} capitalize px-2`}>
                            {weather.weather[0].description}
                        </p>
                    </div>
                </div>

                {/* Weather Details Boxes */}
                <div className='grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 mt-3 sm:mt-4 md:mt-5'>
                    {/* Humidity */}
                    <div className={`${theme.detailsBg} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center border ${theme.detailsBorder}`}>
                        <div className='text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2'>💧</div>
                        <p className={`${theme.textSecondary} text-xs sm:text-sm mb-0.5 sm:mb-1 font-medium`}>Humidity</p>
                        <p className={`text-base sm:text-lg md:text-xl font-bold ${theme.textPrimary}`}>{weather.main.humidity}%</p>
                    </div>

                    {/* Wind Speed */}
                    <div className={`${theme.detailsBg} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center border ${theme.detailsBorder}`}>
                        <div className='text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2'>💨</div>
                        <p className={`${theme.textSecondary} text-xs sm:text-sm mb-0.5 sm:mb-1 font-medium`}>Wind Speed</p>
                        <p className={`text-base sm:text-lg md:text-xl font-bold ${theme.textPrimary}`}>{Math.round(weather.wind.speed * 3.6)} km/h</p>
                    </div>

                    {/* Feels Like */}
                    <div className={`${theme.detailsBg} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center border ${theme.detailsBorder}`}>
                        <div className='text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2'>🌡️</div>
                        <p className={`${theme.textSecondary} text-xs sm:text-sm mb-0.5 sm:mb-1 font-medium`}>Feels Like</p>
                        <p className={`text-base sm:text-lg md:text-xl font-bold ${theme.textPrimary}`}>{Math.round(weather.main.feels_like)}°C</p>
                    </div>

                    {/* Pressure */}
                    <div className={`${theme.detailsBg} rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center border ${theme.detailsBorder}`}>
                        <div className='text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2'>🔽</div>
                        <p className={`${theme.textSecondary} text-xs sm:text-sm mb-0.5 sm:mb-1 font-medium`}>Pressure</p>
                        <p className={`text-base sm:text-lg md:text-xl font-bold ${theme.textPrimary}`}>{weather.main.pressure} hPa</p>
                    </div>
                </div>
            </div>
        );
    }

    // Default State (No data yet)
    return (
        <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10`}>
            <div className='text-center'>
                <div className='flex justify-center text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 text-green-400'>
                    <IoEarth />
                </div>
                <p className={`${theme.textSecondary} text-sm sm:text-base md:text-lg px-4`}>
                    Enter a city name to see weather data
                </p>
            </div>
        </div>
    );
}