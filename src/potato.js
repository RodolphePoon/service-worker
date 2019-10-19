if ('function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);


    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      }),
    );

    workbox.routing.registerRoute(
      /(http|https):\/\/reqres.in(.*)/,
      new workbox.strategies.NetworkFirst({
        cacheName: 'reponse-cache',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ]
      })
    );

    workbox.routing.setCatchHandler((...args) => {
      console.error('setCatchHandler', args[0].event.request.destination);
      console.log('custom', { args });
    });



    workbox.routing.registerRoute(
      /(http|https):\/\/reqres.in(.*)/,
      new workbox.strategies.NetworkOnly({
        cacheName: 'post-cache',
        plugins: [
          new workbox.backgroundSync.Plugin('failedPost', {
            maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
          })
        ]
      }), 'POST'
    );



  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}