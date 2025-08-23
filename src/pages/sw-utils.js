export async function getTokensFromSW() {
  return new Promise((resolve) => {
    console.log(navigator.serviceWorker.controller);
    if (!navigator.serviceWorker.controller) {
      resolve(null);
      return;
    }

    const channel = new MessageChannel();
    channel.port1.onmessage = (event) => {
      resolve(event.data?.accessToken ?? null);
    };

    navigator.serviceWorker.controller.postMessage({ type: "GET_TOKEN" }, [
      channel.port2,
    ]);
  });
}
