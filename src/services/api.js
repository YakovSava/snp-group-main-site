const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export class ApiUnavailableError extends Error {
  constructor() {
    super('API is not configured');
    this.name = 'ApiUnavailableError';
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function postRequest(endpoint, body) {
  if (!API_URL) {
    if (import.meta.env.DEV) {
      await wait(500);
      return { ok: true };
    }
    throw new ApiUnavailableError();
  }

  const isFormData = body instanceof FormData;
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: isFormData ? body : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request to ${endpoint} failed with status ${response.status}`);
  }
  return response.json().catch(() => ({ ok: true }));
}
