export async function getGenres(apiUrl: string) {
    const response = await fetch(`${apiUrl}/api/v1/movies/`, {
        method: "GET",
        credentials: "include",
      });
    
      return response.json();
  }