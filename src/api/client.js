const BASE_URL = "https://itx-frontend-test.onrender.com";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status} on ${path}`);
  }

  return response.json();
}

export const apiClient = {
  request,
};