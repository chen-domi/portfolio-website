'use client';
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {time.toLocaleTimeString()}
        </div>
    );
}


export const Header = () => {
    return (
        <div className="flex justify-between">
            <span>Boston, USA</span>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <Clock />
            </div>
        </div>
    )
}



