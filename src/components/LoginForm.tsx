"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { getApiUrl } from "../util/envVar";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";

export default function LoginForm() {
  const router = useRouter();
  const apiUrl = getApiUrl();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch(`${apiUrl}/auth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include"
    });

    if (response.ok) {
      router.push("/movies");
    } else {
        location.reload()
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-step--1">Username</label>
        <input type="text" name="username" required className="rounded-md py-1 px-2 text-step-0 text-cardBackground"/>
      </div>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-step--1">Password</label>
        <input type="password" name="password" required className="rounded-md py-1 px-2 text-step-0 text-cardBackground"/>
      </div>

      <button type="submit" className="mt-4 flex flex-row items-center bg-secondary text-white py-2 px-4 rounded-md uppercase font-bold">
        <p className="grow">Login</p>
        <ArrowRightStartOnRectangleIcon className="w-5 h-5"/>
      </button>

    </form>
  );
}
