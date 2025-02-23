export function getApiUrl(): string {
  const apiHost = process.env.NEXT_PUBLIC_API_HOST;
  const apiPort = process.env.NEXT_PUBLIC_API_PORT;

  if (!apiHost || !apiPort) {
    throw new Error("Api URL is not set");
  }

  const apiUrl = `http://${apiHost}:${apiPort}`;

  return apiUrl;
}
