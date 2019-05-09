/* eslint-disable no-console */

import { register } from 'register-service-worker'
import swal from 'sweetalert2'
require('sweetalert2/dist/sweetalert2.css')

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
      fetch('./version.txt')
        .then(response => response.text())
        .then(text => {
          if (text != undefined && text != '0.1.5') {
            swal.fire({
              title: 'New update 0.1.5 installed',
              text: 'The page will be reloaded',
              type: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              // true = reload current without browser cache
              window.location.reload(true)
            })
          }
        })
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
