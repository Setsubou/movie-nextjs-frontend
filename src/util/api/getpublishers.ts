export async function getPublishers(apiUrl: string) {
    const response = await fetch(
        `${apiUrl}/api/v1/publishers/name/`,
        {
          method: "GET",
          credentials: "include",
        }
      );
    
      return response.json();
  }