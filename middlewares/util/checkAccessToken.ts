// Check whether token is still valid or not

import { cookies } from "next/headers";

export default async function checkAccessToken(): Promise<boolean> {
  const cookie = await cookies()

  const response = await fetch("http://localhost:8888/auth/verify-token", {
    method: "POST",
    headers: { "Cookie": cookie.toString()},
    credentials: "include",
  });

  return response.ok;
}
