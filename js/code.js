//check if service worker is supported
const TAG = 'Service Worker:'
if ('serviceWorker' in navigator) {
    console.log(TAG, 'supported')
    window.addEventListener('load', () => {
        navigator.serviceWorker
            // .register('../sw_cached_site.js')
            .register('../sw_cached_allRequests.js')
            .then((reg) => console.log(TAG, 'registered'))
            .catch((err) => console.log(TAG, 'error: ' + err.message))
    })
}
