"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch("http://localhost:8888/auth/", {
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
    <form onSubmit={handleLogin} className="flex flex-col gap-2">
      <input type="text" name="username" required />
      <input type="password" name="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
