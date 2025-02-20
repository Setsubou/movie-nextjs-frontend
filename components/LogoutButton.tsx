"use client"

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
        <button onClick={handleLogout}>Logout</button>
    )
}