/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./resources/js/offlineservicesworker.js ***!
  \***********************************************/
self.addEventListener("install", function (event) {
  event.waitUntil(); // Force the waiting service worker to become the active service worker.

  self.skipWaiting();
});
self.addEventListener("activate", function (event) {
  event.waitUntil(); // Tell the active service worker to take control of the page immediately.

  self.clients.claim();
});
self.addEventListener("fetch", function (event) {// We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  // If our if() condition is false, then this fetch handler won't intercept the
  // request. If there are any other fetch handlers registered, they will get a
  // chance to call event.respondWith(). If no fetch handlers call
  // event.respondWith(), the request will be handled by the browser as if there
  // were no service worker involvement.
});
/******/ })()
;