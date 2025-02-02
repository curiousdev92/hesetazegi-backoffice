import { getCookie } from "@src/utils/cookies";

const token = getCookie("bo-tkn");

const handleStatusCodes = (statusCode: number) => {
  const statuses: { [key: number]: any } = {
    401: () => (location.href = "/401"),
    403: () => (location.href = "/403"),
  };

  if (statuses[statusCode]) {
    return statuses[statusCode]();
  } else {
  }
};

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
    const parsed = await response.json();

    if (parsed?.statusCode === 200) {
      return parsed.data;
    } else {
      return handleStatusCodes(response.status);
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
  cache?: RequestInit["cache"],
  controller?: AbortController,
  unAuth?: boolean
): Promise<T> => {
  return await fetchWithAbort(
    url,
    {
      headers: {
        "Content-Type": "application/json",
        ...(unAuth ? null : { Authorization: `Bearer ${token}` }),
      },
      cache: cache || "force-cache",
    },
    controller
  );
};

const POST = async <T>(
  url: string,
  body: any,
  controller?: AbortController,
  unAuth?: boolean
): Promise<T> => {
  return fetchWithAbort(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(unAuth ? null : { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    },
    controller
  );
};

const PUT = async <T>(
  url: string,
  body?: any,
  controller?: AbortController
): Promise<T> => {
  return fetchWithAbort(
    url,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
    controller
  );
};

const DELETE = async <T>(
  url: string,
  body?: any,
  controller?: AbortController
): Promise<T> => {
  return fetchWithAbort(
    url,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
    controller
  );
};

export { DELETE, GET, POST, PUT };
