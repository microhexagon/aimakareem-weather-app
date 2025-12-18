'use client';
import { WiHumidity } from "react-icons/wi";
import { FaWind, FaTemperatureHigh } from "react-icons/fa6";
import { TbGauge } from "react-icons/tb";
import { LuLoaderPinwheel } from "react-icons/lu";
import { IoEarth } from "react-icons/io5";
import { 
    WiDaySunny, 
    WiCloudy, 
    WiRain, 
    WiSnow, 
    WiThunderstorm,
    WiFog,
    WiDayCloudyHigh 
} from "react-icons/wi";

export interface WeatherTheme {
    bgGradient: string;
    cardBg: string;
    cardBorder: string;
    detailsBg: string;
    detailsBorder: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
    btnBg: string;
    btnText: string;
    btnHover: string;
}

export default function WeatherCard({
    weather,
    loading,
    error,
    theme,
}: {
    weather: any;
    loading: boolean;
    error: string;
    theme: WeatherTheme;
}) {

const getWeatherIcon = (main: string, temp: number) => {
    const iconClass = "text-5xl sm:text-6xl md:text-7xl drop-shadow-lg";
    
    if (temp >= 30) {
        return <WiDaySunny className={`${iconClass} text-yellow-400 animate-pulse`} />;
    }
    
    switch (main?.toLowerCase()) {
        case 'clear':
        return <WiDaySunny className={`${iconClass} text-yellow-300`} />;
        case 'clouds':
            return <WiCloudy className={`${iconClass} text-gray-300`} />;
        case 'rain':
        case 'drizzle':
            return <WiRain className={`${iconClass} text-blue-400`} />;
        case 'snow':
            return <WiSnow className={`${iconClass} text-blue-200`} />;
        case 'thunderstorm':
            return <WiThunderstorm className={`${iconClass} text-purple-400`} />;
        case 'mist':
        case 'fog':
        case 'haze':
            return <WiFog className={`${iconClass} text-gray-400`} />;
        default:
        return <WiDayCloudyHigh className={`${iconClass} text-sky-400`} />;
    }
};

if (loading) {
    return (
    <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-xl backdrop-blur-sm h-full flex flex-col items-center justify-center`}>
        <LuLoaderPinwheel className={`text-3xl sm:text-4xl animate-spin mx-auto ${theme.textAccent}`} />
        <p className={`${theme.textSecondary} text-xs sm:text-sm mt-3`}>Fetching weather data...</p>
    </div>
    );
}

if (error) {
    return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-xl backdrop-blur-sm h-full flex items-center justify-center">
        <p className="text-red-400 font-medium text-sm sm:text-base">{error}</p>
    </div>
    );
}

if (!weather) {
    return (
    <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-xl backdrop-blur-sm h-full flex flex-col items-center justify-center`}>
        <IoEarth className={`text-4xl sm:text-5xl mx-auto ${theme.textAccent} mb-3`} />
        <p className={`${theme.textSecondary} text-xs sm:text-sm`}>
            Search a city to view weather
        </p>
    </div>
    );
}

    const temp = Math.round(weather.main.temp);
    const feelsLike = Math.round(weather.main.feels_like);
    const windSpeed = Math.round(weather.wind.speed * 3.6);

const weatherDetails = [
    { 
    icon: <WiHumidity />, 
    label: "Humidity", 
    value: `${weather.main.humidity}%`,
    color: "text-blue-400"
},
    { 
    icon: <FaWind />, 
    label: "Wind", 
    value: `${windSpeed} km/h`,
    color: "text-cyan-400"
},
    { 
    icon: <FaTemperatureHigh />, 
    label: "Feels Like", 
    value: `${feelsLike}°C`,
    color: temp >= 30 ? "text-orange-400" : "text-blue-300"
    },
    { 
    icon: <TbGauge />, 
    label: "Pressure", 
    value: `${weather.main.pressure} hPa`,
    color: "text-purple-400"
    },
];

return (
    <div className="space-y-2 sm:space-y-3 h-full flex flex-col animate-fadeIn">
      {/* Main weather info */}
        <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-2xl backdrop-blur-md bg-opacity-80 hover:shadow-3xl transition-all duration-300 flex-shrink-0`}>
            <p className={`text-base sm:text-lg md:text-xl font-bold ${theme.textPrimary} mb-1`}>
            {weather.name}, {weather.sys.country}
            </p>

          {/* Weather Icon */}
            <div className="flex justify-center my-2 transform hover:scale-110 transition-transform duration-300">
                {getWeatherIcon(weather.weather[0].main, temp)}
            </div>
            
            <p className={`text-3xl sm:text-4xl md:text-5xl font-bold ${theme.textAccent} mb-1`}>{temp}°C</p>
            <p className={`${theme.textSecondary} capitalize text-xs sm:text-sm md:text-base`}>
            {weather.weather[0].description}
            </p>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
            {weatherDetails.map((item, i) => (
            <div
                key={i}
                className={`${theme.detailsBg} border ${theme.detailsBorder} rounded-lg sm:rounded-xl p-2 sm:p-3 text-center shadow-lg backdrop-blur-sm hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-default flex flex-col items-center justify-center`}>
                <div className={`text-2xl sm:text-3xl md:text-4xl mx-auto ${item.color} drop-shadow-md mb-1`}>
                    {item.icon}
                </div>
                <p className={`${theme.textSecondary} text-[10px] sm:text-xs font-medium mb-0.5`}>
                    {item.label}
                </p>
                <p className={`font-bold text-sm sm:text-base md:text-lg ${theme.textPrimary}`}>
                    {item.value}
                </p>
            </div>
        ))}
        </div>
    </div>
);
}


