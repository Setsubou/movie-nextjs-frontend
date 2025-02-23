"use client"

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout(): Promise<void> {
        await fetch("http://localhost:8888/auth/logout/", {
            method: "POST",
            credentials: "include",
          });
        
        router.push("/");
    }

    return (
        <button className="gap-2 flex flex-row items-center bg-accent text-white py-2 px-4 rounded-md text-step--1" onClick={handleLogout}>
            <p className="grow">Logout</p>
            <ArrowRightStartOnRectangleIcon className="w-5 h-5"/>
        </button>
    )
}