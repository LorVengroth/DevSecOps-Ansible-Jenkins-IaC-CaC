export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (typeof window !== "undefined" && process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:8081");

export const SERVER_API_URL =
  process.env.SERVER_API_URL || "http://localhost:8081";

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

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}