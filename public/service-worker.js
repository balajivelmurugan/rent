let accessToken = null;
let refreshToken = null;

// Listen for messages from React app
self.addEventListener("message", (event) => {
  const { type, token } = event.data;
  if (type === "SET_TOKENS") {
    accessToken = token.accessToken;
    refreshToken = token.refreshToken;

    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ type: "SET_TOKENS_ACK" });
    }
  }
  if (type === "LOGOUT") {
    accessToken = null;
    refreshToken = null;
  }

  if (type === "GET_TOKEN") {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({
        accessToken,
        refreshToken,
      });
    }
  }
});

// Intercept all fetch requests
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only intercept API calls (not assets)
  if (request.url.includes("/api/")) {
    event.respondWith(handleApiRequest(request));
  }
});

async function handleApiRequest(request) {
  if (!accessToken) return fetch(request);

  // Clone request so we can modify headers
  let newHeaders = new Headers(request.headers);
  newHeaders.set("Authorization", `Bearer ${accessToken}`);

  let authReq = new Request(request, { headers: newHeaders });

  let response = await fetch(authReq);

  // If token expired, try refresh
  if (response.status === 403 && refreshToken) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      newHeaders.set("Authorization", `Bearer ${accessToken}`);
      authReq = new Request(request, { headers: newHeaders });
      return fetch(authReq);
    }
  }

  return response;
}

async function refreshTokens() {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (res.ok) {
      const data = await res.json();
      accessToken = data.accessToken;
      refreshToken = data.refreshToken;
      return true;
    }
  } catch (e) {
    console.error("Failed to refresh token", e);
  }
  return false;
}
