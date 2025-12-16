'use client';
import { useState } from "react";
import WeatherCard, { WeatherTheme } from "../../components/WeatherCard";
import SearchBar from "../../components/SearchBar";
import BackBtn from "../../components/BackBtn";

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [theme, setTheme] = useState<WeatherTheme>(getDefaultTheme());

    const API_KEY = "40439cb064df3700bfbcf8a99017dcda";

    // Get default theme
    function getDefaultTheme(): WeatherTheme {
        return {
            bgGradient: 'from-gray-900 to-gray-800',
            cardBg: 'bg-gradient-to-b from-blue-950 to-gray-700',
            cardBorder: 'border-blue-400',
            detailsBg: 'bg-blue-900/30',
            detailsBorder: 'border-blue-400/30',
            textPrimary: 'text-white',
            textSecondary: 'text-gray-300',
            textAccent: 'text-blue-300'
        };
    }

    // Comprehensive Weather Theme System with Switch Cases
    const getWeatherTheme = (weatherMain: string, temp: number): WeatherTheme => {
        const weather = weatherMain?.toLowerCase();

        // Temperature-based classification
        const isHot = temp >= 30;
        const isWarm = temp >= 20 && temp < 30;
        const isMild = temp >= 10 && temp < 20;
        const isCold = temp < 10;

        switch (weather) {
            // CLEAR/SUNNY WEATHER
            case 'clear':
                if (isHot) {
                    // Hot 
                    return {
                        bgGradient: 'from-gray-800 via-gray-700 to-gray-800', 
                        cardBg: 'bg-gradient-to-br from-orange-400 via-red-500 to-red-600', 
                        cardBorder: 'border-orange-300',
                        detailsBg: 'bg-red-600/60',
                        detailsBorder: 'border-orange-300/70',
                        textPrimary: 'text-white',
                        textSecondary: 'text-orange-50',
                        textAccent: 'text-yellow-100'
                    };
                } else if (isWarm) {
                    // Warm & Clear 
                    return {
                        bgGradient: 'from-gray-800 via-gray-700 to-gray-800', // Subtle dark background
                        cardBg: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500', // Very hot sunny card
                        cardBorder: 'border-yellow-300',
                        detailsBg: 'bg-orange-600/60',
                        detailsBorder: 'border-yellow-300/70',
                        textPrimary: 'text-white',
                        textSecondary: 'text-yellow-50',
                        textAccent: 'text-yellow-50'
                    };
                } else {
                    // Mild/Cold & Clear
                    return {
                        bgGradient: 'from-blue-400 via-sky-500 to-blue-600',
                        cardBg: 'bg-gradient-to-b from-blue-600/90 to-sky-700/90',
                        cardBorder: 'border-sky-300',
                        detailsBg: 'bg-blue-800/40',
                        detailsBorder: 'border-sky-400/50',
                        textPrimary: 'text-white',
                        textSecondary: 'text-sky-100',
                        textAccent: 'text-sky-200'
                    };
                }

            // CLOUDY WEATHER
            case 'clouds':
                if (isWarm || isHot) {
                    // Warm & Cloudy
                    return {
                        bgGradient: 'from-gray-800 via-gray-700 to-gray-800', 
                        cardBg: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500', 
                        cardBorder: 'border-yellow-300',
                        detailsBg: 'bg-orange-600/60',
                        detailsBorder: 'border-yellow-300/70',
                    };
                } else {
                    // Cold & Cloudy
                    return {
                        bgGradient: 'from-gray-600 via-gray-700 to-gray-900',
                        cardBg: 'bg-gradient-to-b from-gray-700/90 to-gray-900/90',
                        cardBorder: 'border-gray-500',
                        detailsBg: 'bg-gray-800/50',
                        detailsBorder: 'border-gray-600/50',
                        textPrimary: 'text-white',
                        textSecondary: 'text-gray-200',
                        textAccent: 'text-gray-300'
                    };
                }

            // RAINY WEATHER
            case 'rain':
            case 'drizzle':
                if (isWarm || isHot) {
                    // Warm Rain
                    return {
                        bgGradient: 'from-blue-600 via-cyan-700 to-blue-800',
                        cardBg: 'bg-gradient-to-b from-blue-700/90 to-cyan-900/90',
                        cardBorder: 'border-cyan-400',
                        detailsBg: 'bg-blue-900/50',
                        detailsBorder: 'border-cyan-500/50',
                        textPrimary: 'text-white',
                        textSecondary: 'text-cyan-100',
                        textAccent: 'text-cyan-200'
                    };
                } else {
                    // Cold Rain
                    return {
                        bgGradient: 'from-blue-800 via-blue-900 to-gray-900',
                        cardBg: 'bg-gradient-to-b from-blue-900/90 to-slate-900/90',
                        cardBorder: 'border-blue-500',
                        detailsBg: 'bg-blue-950/50',
                        detailsBorder: 'border-blue-600/50',
                        textPrimary: 'text-white',
                        textSecondary: 'text-blue-100',
                        textAccent: 'text-blue-200'
                    };
                }

            // THUNDERSTORM
            case 'thunderstorm':
                return {
                    bgGradient: 'from-purple-900 via-gray-900 to-black',
                    cardBg: 'bg-gradient-to-b from-purple-950/90 to-black/90',
                    cardBorder: 'border-purple-500',
                    detailsBg: 'bg-purple-950/50',
                    detailsBorder: 'border-purple-600/50',
                    textPrimary: 'text-white',
                    textSecondary: 'text-purple-100',
                    textAccent: 'text-purple-200'
                };

            // SNOW
            case 'snow':
                return {
                    bgGradient: 'from-blue-200 via-blue-300 to-gray-400',
                    cardBg: 'bg-gradient-to-b from-blue-300/90 to-slate-400/90',
                    cardBorder: 'border-blue-200',
                    detailsBg: 'bg-blue-400/40',
                    detailsBorder: 'border-blue-300/50',
                    textPrimary: 'text-gray-900',
                    textSecondary: 'text-gray-700',
                    textAccent: 'text-blue-700'
                };

            // MIST/FOG/HAZE
            case 'mist':
            case 'fog':
            case 'haze':
                return {
                    bgGradient: 'from-gray-400 via-gray-500 to-gray-600',
                    cardBg: 'bg-gradient-to-b from-gray-500/90 to-slate-600/90',
                    cardBorder: 'border-gray-400',
                    detailsBg: 'bg-gray-700/50',
                    detailsBorder: 'border-gray-500/50',
                    textPrimary: 'text-white',
                    textSecondary: 'text-gray-200',
                    textAccent: 'text-gray-300'
                };

            // SMOKE
            case 'smoke':
                return {
                    bgGradient: 'from-gray-600 via-slate-700 to-zinc-800',
                    cardBg: 'bg-gradient-to-b from-slate-700/90 to-zinc-800/90',
                    cardBorder: 'border-slate-500',
                    detailsBg: 'bg-slate-800/50',
                    detailsBorder: 'border-slate-600/50',
                    textPrimary: 'text-white',
                    textSecondary: 'text-slate-200',
                    textAccent: 'text-slate-300'
                };

            // DEFAULT
            default:
                return getDefaultTheme();
        }
    };

    // Search handler function
    const handleSearch = async () => {
        if (!city) return;

        setLoading(true);
        setError('');
        setWeather(null);

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (!res.ok) throw new Error('City not found');

            const data = await res.json();
            setWeather(data);
            
            const newTheme = getWeatherTheme(data.weather[0].main, data.main.temp);
            setTheme(newTheme);
        } catch (err: any) {
            setError(err.message);
            setTheme({
                bgGradient: 'from-red-900 to-gray-900',
                cardBg: 'bg-gradient-to-b from-red-950 to-gray-800',
                cardBorder: 'border-red-500',
                detailsBg: 'bg-red-900/30',
                detailsBorder: 'border-red-600/30',
                textPrimary: 'text-white',
                textSecondary: 'text-red-200',
                textAccent: 'text-red-300'
            });
        } finally {
            setLoading(false);
        }
    };

    // GEOLOCATION FUNCTION
    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);
        setError('');
        setWeather(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                    );

                    if (!res.ok) throw new Error('Unable to fetch weather data');

                    const data = await res.json();
                    setWeather(data);
                    setCity(data.name);
                    
                    const newTheme = getWeatherTheme(data.weather[0].main, data.main.temp);
                    setTheme(newTheme);
                } catch (err: any) {
                    setError(err.message);
                    setTheme({
                        bgGradient: 'from-red-900 to-gray-900',
                        cardBg: 'bg-gradient-to-b from-red-950 to-gray-800',
                        cardBorder: 'border-red-500',
                        detailsBg: 'bg-red-900/30',
                        detailsBorder: 'border-red-600/30',
                        textPrimary: 'text-white',
                        textSecondary: 'text-red-200',
                        textAccent: 'text-red-300'
                    });
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setLoading(false);
                setError('Unable to retrieve your location. Please enable location access.');
                setTheme({
                    bgGradient: 'from-red-900 to-gray-900',
                    cardBg: 'bg-gradient-to-b from-red-950 to-gray-800',
                    cardBorder: 'border-red-500',
                    detailsBg: 'bg-red-900/30',
                    detailsBorder: 'border-red-600/30',
                    textPrimary: 'text-white',
                    textSecondary: 'text-red-200',
                    textAccent: 'text-red-300'
                });
            }
        );
    };

    return (
        <div className={`min-h-screen flex justify-center items-center bg-gradient-to-b ${theme.bgGradient} p-3 sm:p-4 md:p-6 transition-all duration-700`}>
            <div className='flex flex-col border border-blue-400 w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5'>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
                    Weather Dashboard
                </h1>

                <SearchBar 
                    city={city} 
                    setCity={setCity} 
                    handleSearch={handleSearch}
                    handleGeolocation={handleGeolocation}
                />

                <div className="flex-1 flex items-center justify-center w-full">
                    <WeatherCard weather={weather} loading={loading} error={error} theme={theme} />
                </div>

                <div className="flex justify-center pt-2">
                    <BackBtn />
                </div>
            </div>
        </div>
    );
}


