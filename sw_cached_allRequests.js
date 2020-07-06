const TAGSW = 'Service Worker:'
// const cachedName = 'v1'

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/code.js',
]

//call install events

// console.log(TAGSW, 'Installed')
self.addEventListener('install', (e) => {
    console.log(TAGSW, 'Installed')

    e.waitUntil(
        caches
            .open('v1')
            .then((cacheObj) => {
                // add, addAll, delete,keys,match,matchAll,put
                console.log('Caching files')
                cacheObj.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    )
})

// call activate event
self.addEventListener('activate', (e) => {
    console.log(TAGSW, 'activated')

    // console.log(caches) //delete, has, keys, match, open
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    if (cacheName !== 'v1') {
                        console.log(TAGSW, 'clearing old cache version')
                        caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

//call fetch event
self.addEventListener('fetch', (e) => {
    console.log(TAGSW, 'fetching')

    e.respondWith(
        fetch(e.request)
            .then((res) => {
                // Make copy/clone of response)
                const resClone = res.clone()
                //open cache
                caches
                    .open('v1')
                    .then((cacheObj) => cacheObj.put(e.request, resClone))
                    .catch((errr) => console.log('err', errr))
                return res
            })
            .catch((err) => caches.match(e.request).then((resp) => resp))
    )
})
