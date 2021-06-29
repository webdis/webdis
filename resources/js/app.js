console.log('Nothing to see here :)');

window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/js/servicesworker.js");
    }
  });
  