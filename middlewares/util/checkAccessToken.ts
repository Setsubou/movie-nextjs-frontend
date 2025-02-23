// Check whether token is still valid or not

import { cookies } from "next/headers";
import { getApiUrl } from "../../src/util/envVar";

export default async function checkAccessToken(): Promise<boolean> {
  const cookie = await cookies()
  const apiUrl = getApiUrl()

  const response = await fetch(`${apiUrl}/auth/verify-token`, {
    method: "POST",
    headers: { "Cookie": cookie.toString()},
    credentials: "include",
  });

  return response.ok;
}
