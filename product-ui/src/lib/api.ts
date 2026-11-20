export const API_URL = "http://localhost:8081";

export const SERVER_API_URL = "http://localhost:8081";

export async function handleResponse<T>(
  response: Response
): Promise<T> {
  if (!response.ok) {
    let message = `Request failed: ${response.status}`;

    try {
      const data = await response.json();
      message = data.message ?? message;
    } catch {
      // Use default error message
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}