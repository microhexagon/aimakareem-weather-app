'use client';
import { useState } from "react";
import WeatherCard from "../../components/WeatherCard";
import SearchBar from "../../components/SearchBar";
import BackBtn from "../../components/BackBtn";

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [bgClass, setBgClass] = useState('from-gray-900 to-gray-800');

    const API_KEY = "40439cb064df3700bfbcf8a99017dcda";

    // Background change function
    const getWeatherBackground = (weatherMain: string) => {
        const weather = weatherMain?.toLowerCase();
        
        if (weather?.includes('clear') || weather?.includes('sunny')) {
            return 'from-orange-400 via-yellow-500 to-orange-600';
        } else if (weather?.includes('cloud')) {
            return 'from-gray-600 via-gray-700 to-gray-900';
        } else if (weather?.includes('rain') || weather?.includes('drizzle')) {
            return 'from-blue-700 via-blue-900 to-gray-900';
        } else if (weather?.includes('thunder') || weather?.includes('storm')) {
            return 'from-purple-900 via-gray-900 to-black';
        } else if (weather?.includes('snow')) {
            return 'from-blue-200 via-blue-300 to-gray-400';
        } else if (weather?.includes('mist') || weather?.includes('fog') || weather?.includes('haze')) {
            return 'from-gray-400 via-gray-500 to-gray-600';
        } else {
            return 'from-gray-900 to-gray-800';
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
            
            const newBg = getWeatherBackground(data.weather[0].main);
            setBgClass(newBg);
        } catch (err: any) {
            setError(err.message);
            setBgClass('from-red-900 to-gray-900');
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
                    
                    const newBg = getWeatherBackground(data.weather[0].main);
                    setBgClass(newBg);
                } catch (err: any) {
                    setError(err.message);
                    setBgClass('from-red-900 to-gray-900');
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setLoading(false);
                setError('Unable to retrieve your location. Please enable location access.');
                setBgClass('from-red-900 to-gray-900');
            }
        );
    };

    return (
        <div className={`min-h-screen flex justify-center items-center bg-gradient-to-b ${bgClass} p-3 sm:p-4 md:p-6 transition-all duration-500`}>
            <div className='flex flex-col border border-blue-400 w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6'>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
                    Weather Dashboard
                </h1>

                <SearchBar 
                    city={city} 
                    setCity={setCity} 
                    handleSearch={handleSearch}
                    handleGeolocation={handleGeolocation}
                />

                <div className="flex-1 flex items-center justify-center w-full">
                    <WeatherCard weather={weather} loading={loading} error={error} />
                </div>

                <div className="flex justify-center pt-2">
                    <BackBtn />
                </div>
            </div>
        </div>
    );
}