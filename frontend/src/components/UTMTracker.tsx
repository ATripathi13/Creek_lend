"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function UTMTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const utms = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

        utms.forEach(param => {
            const value = searchParams.get(param);
            if (value) {
                sessionStorage.setItem(param, value);
                console.log(`Stored ${param}: ${value}`);
            }
        });
    }, [searchParams]);

    return null;
}
