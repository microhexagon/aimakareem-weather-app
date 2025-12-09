'use client';
import Link from "next/link"; 
export default function BackBtn() {
    return (

        <Link href="/">
            <button className=" bg-blue-500 text-white font-medium text-xl 
            rounded-2xl  h-12 w-40 flex items-center justify-center
            hover:bg-gray-700 hover:scale-105 transition-transform">
                Back
            </button>
        </Link>
    );
}
