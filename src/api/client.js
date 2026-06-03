const REQUEST_TIMEOUT = 15000;

export class ApiError extends Error {
  constructor(status, message, path) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.path = path;
  }
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let message = `API error ${response.status} on ${path}`;
      try {
        const body = await response.json();
        if (body.message) message = body.message;
      } catch {
        // body is not JSON, keep default message
      }
      throw new ApiError(response.status, message, path);
    }

    try {
      return await response.json();
    } catch {
      throw new ApiError(
        response.status,
        `Invalid JSON response from ${path}`,
        path
      );
    }
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new ApiError(0, `Request timeout: ${path}`, path);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(0, `Network error: ${error.message}`, path);
  }
}

export const apiClient = {
  request,
};
