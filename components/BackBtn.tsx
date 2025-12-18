'use client';
import Link from "next/link"; 
import { WeatherTheme } from "./WeatherCard";

interface BackBtnProps {
    theme: WeatherTheme;
}

export default function BackBtn({ theme }: BackBtnProps) {
    return (
        <Link href="/">
            <button className={`${theme.btnBg} ${theme.btnText} ${theme.btnHover} font-medium text-lg sm:text-xl rounded-2xl h-12 w-40 flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg`}>
                Back
            </button>
        </Link>
    );
}
