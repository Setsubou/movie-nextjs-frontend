"use client"

import { FormEvent } from "react";

export default function LoginForm() {
    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");
    
        const response = await fetch('http://localhost:8888/auth/', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username, password})
        })
    
        if (response.ok) {
          console.log("Login successful");
        } else {
          console.log("Login failed");
          console.log(response.status);
        }
      }

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <input type="text" name="username" required/>
          <input type="password" name="password" required/>
          <button type="submit">Login</button>
        </form>
      );
}