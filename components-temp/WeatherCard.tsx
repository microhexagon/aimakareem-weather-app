'use client';

import { IoEarth } from "react-icons/io5";

interface WeatherCardProps {
    weather: any;
    loading: boolean;
    error: string;
}

export default function WeatherCard({ weather, loading, error }: WeatherCardProps) {

    // Loading State
    if (loading) {
        return (
            <div className='bg-gradient-to-b from-blue-950 to-gray-700 border border-blue-400 rounded-3xl p-12'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='animate-spin text-6xl'>🌀</div>
                    <p className='text-white text-xl'>Loading weather data...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className='bg-red-500/20 border border-red-500 text-red-300 px-6 py-4 rounded-2xl text-center'>
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
            'Fog': '🌫️'
        };
        return icons[main] || '🌤️';
    };

    // Weather Data Display
    if (weather) {
        return (
            <div>
                {/* Main Weather Info */}
                <div className='bg-gradient-to-b from-blue-950 to-gray-700 border border-blue-400 rounded-3xl p-8 shadow-2xl'>
                    <div className='text-center mb-8'>
                        <div className='text-8xl mb-4'>
                            {getWeatherIcon(weather.weather[0].main)}
                        </div>
                        <h2 className='text-4xl font-bold text-white mb-2'>
                            {weather.name}, {weather.sys.country}
                        </h2>
                        <p className='text-6xl font-bold text-blue-300 mb-2'>
                            {Math.round(weather.main.temp)}°C
                        </p>
                        <p className='text-2xl text-gray-300 capitalize'>
                            {weather.weather[0].description}
                        </p>
                    </div>
                </div>

                {/* Weather Details Boxes */}
                <div className='grid grid-cols-2 gap-6 mt-6'>
                    {/* Humidity */}
                    <div className='bg-blue-900/30 rounded-2xl p-6 text-center border border-blue-400/30'>
                        <div className='text-4xl mb-2'>💧</div>
                        <p className='text-gray-400 text-sm mb-1'>Humidity</p>
                        <p className='text-2xl font-bold text-white'>{weather.main.humidity}%</p>
                    </div>

                    {/* Wind Speed */}
                    <div className='bg-blue-900/30 rounded-2xl p-6 text-center border border-blue-400/30'>
                        <div className='text-4xl mb-2'>💨</div>
                        <p className='text-gray-400 text-sm mb-1'>Wind Speed</p>
                        <p className='text-2xl font-bold text-white'>{Math.round(weather.wind.speed * 3.6)} km/h</p>
                    </div>

                    {/* Feels Like */}
                    <div className='bg-blue-900/30 rounded-2xl p-6 text-center border border-blue-400/30'>
                        <div className='text-4xl mb-2'>🌡️</div>
                        <p className='text-gray-400 text-sm mb-1'>Feels Like</p>
                        <p className='text-2xl font-bold text-white'>{Math.round(weather.main.feels_like)}°C</p>
                    </div>

                    {/* Pressure */}
                    <div className='bg-blue-900/30 rounded-2xl p-6 text-center border border-blue-400/30'>
                        <div className='text-4xl mb-2'>🔽</div>
                        <p className='text-gray-400 text-sm mb-1'>Pressure</p>
                        <p className='text-2xl font-bold text-white'>{weather.main.pressure} hPa</p>
                    </div>
                </div>
            </div>
        );
    }

    // Default State (No data yet)
    return (
        <div className='bg-gradient-to-b from-blue-950 to-gray-700 border border-blue-400 rounded-3xl p-12'>
            <div className='text-center'>
                <div className='flex justify-center text-6xl mb-4 text-green-400'>
                    <IoEarth />
                </div>
                <p className='text-gray-400 text-xl'>
                    Enter a city name to see weather data
                </p>
            </div>
        </div>
    );
}
