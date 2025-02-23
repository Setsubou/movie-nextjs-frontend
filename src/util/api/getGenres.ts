export async function getGenres(apiUrl: string) {
    const response = await fetch(`${apiUrl}/api/v1/genres/`, {
        method: "GET",
        credentials: "include",
      });
    
      return response.json();
  }