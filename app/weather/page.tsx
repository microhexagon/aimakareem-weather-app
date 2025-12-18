'use client';
import { useState } from "react";
import WeatherCard, { WeatherTheme } from "../../components/WeatherCard";
import SearchBar from "../../components/SearchBar";
import BackBtn from "../../components/BackBtn";

/* ================= THEMES ================= */

const coldTheme: WeatherTheme = {
    bgGradient: 'from-slate-800 via-gray-900 to-slate-900',
    cardBg: 'bg-gradient-to-br from-slate-700 via-gray-700 to-slate-800',
    cardBorder: 'border-slate-500',
    detailsBg: 'bg-slate-600/40',
    detailsBorder: 'border-slate-500',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    textAccent: 'text-sky-400',

    btnBg: 'bg-blue-600',
    btnText: 'text-white',
    btnHover: 'hover:bg-gray-600',
};

const hotTheme: WeatherTheme = {
    bgGradient: 'from-orange-100 via-amber-50 to-yellow-100',
    cardBg: 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500',
    cardBorder: 'border-orange-400',
    detailsBg: 'bg-orange-200',
    detailsBorder: 'border-orange-400',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-800',
    textAccent: 'text-gray-900',

    btnBg: 'bg-orange-500',
    btnText: 'text-white',
    btnHover: 'hover:bg-orange-600',
};

/* ================= PAGE ================= */

export default function WeatherPage() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [theme, setTheme] = useState<WeatherTheme>(coldTheme);

    const API_KEY = "40439cb064df3700bfbcf8a99017dcda";

    const getTheme = (main: string, temp: number) => {
      // Only hot weather gets the hot theme
    if (temp >= 30) {
        return hotTheme;
    }
      // Everything else gets dark theme
    return coldTheme;
    };

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
    setTheme(getTheme(data.weather[0].main, data.main.temp));
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
    setLoading(true);
    const { latitude, longitude } = pos.coords;
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    setWeather(data);
    setCity(data.name);
    setTheme(getTheme(data.weather[0].main, data.main.temp));
    setLoading(false);
    });
};

return (
    <div
    className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.bgGradient} p-3`}
    >
    <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-3 space-y-3">
        <h1 className={`text-xl sm:text-2xl font-bold text-center ${theme.textPrimary}`}>
            Weather Dashboard
        </h1>

        <SearchBar
        city={city}
        setCity={setCity}
        handleSearch={handleSearch}
        handleGeolocation={handleGeolocation}
        theme={theme}
        />

        <WeatherCard
        weather={weather}
        loading={loading}
        error={error}
        theme={theme}
        />

        <div className="flex justify-center">
            <BackBtn theme={theme} />
        </div>
        </div>
    </div>
);
}
