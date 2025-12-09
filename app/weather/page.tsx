'use client';
import { useState } from "react";
import WeatherCard from "@/components/WeatherCard";
import SearchBar from "@/components/SearchBar";
import BackBtn from "@/components/BackBtn";

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = "40439cb064df3700bfbcf8a99017dcda";

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
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4'>
            <div className='flex flex-col justify-between items-center h-[700px] gap-4 border border-blue-400 bg-gradient-to-b from-gray-950 to-gray-700 rounded-3xl p-8 sm:p-10 w-full max-w-lg'>
                
                {/* 🔹 Search Bar - TOP */}
                <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />

                {/* 🔹 Weather Card - CENTER */}
                <div className="flex-1 flex items-center justify-center w-full">
                    <WeatherCard weather={weather} loading={loading} error={error} />
                </div>

                {/* 🔹 Back Button - BOTTOM */}
                <BackBtn/>
            </div>
        </div>
    );
}