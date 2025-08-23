// Simplified CRA-compatible registration
export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/rent/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((error) => {
          console.log("SW registration failed: ", error);
        });
    });
  }
}
