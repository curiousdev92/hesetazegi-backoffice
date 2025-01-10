import { getCookie } from "@src/utils/cookies";

const token = getCookie("bo-tkn");

const fetchWithAbort = async <T>(
  url: string,
  options?: RequestInit,
  controller?: AbortController
): Promise<T> => {
  // Use provided controller or create a new one
  const abortController = controller || new AbortController();

  // Add the signal to the options
  const fetchOptions: RequestInit = {
    ...options,
    signal: abortController.signal,
  };

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const parsed = await response.json();
    if (parsed?.statusCode === 200) {
      return parsed.data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("Request was aborted");
    }
    throw error; // Re-throw other errors
  }
};

const GET = async <T>(
  url: string,
  controller?: AbortController
): Promise<T> => {
  return fetchWithAbort(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    controller
  );
};

const POST = async <T>(
  url: string,
  body: any,
  controller?: AbortController
): Promise<T> => {
  return fetchWithAbort(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
    controller
  );
};

export { GET, POST };
