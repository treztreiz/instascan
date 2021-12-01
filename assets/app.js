/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import 'bootstrap'

import {Html5Qrcode} from "html5-qrcode"

const qrCode = new Html5Qrcode("reader");
const cameraSelect = document.getElementById('cameras')

Html5Qrcode.getCameras().then(devices => {

    if(!devices || devices && !devices.length) {

        const option = document.createElement('option')
        option.innerHTML = 'Aucune camera accessible'
        cameraSelect.appendChild(option)

        return
    }

    for( let i = 0;  i < devices.length; i++) {

        const option = document.createElement('option')
        option.innerHTML = devices[i].label 
        option.value = devices[i].id
        cameraSelect.appendChild(option)

    }

    startQrCode(cameraSelect.value)

  }).catch(err => {
    console.error(err)
});

cameraSelect.addEventListener('change', (e) => {

    qrCode.stop().then((ignore) => {
        startQrCode(e.currentTarget.value)
    }).catch((err) => {
        console.error(err)
    });

    
})

function startQrCode(cameraId) {
    qrCode.start(
        cameraId, 
        {
          fps: 10,    // Optional, frame per seconds for qr code scanning
          qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
          // do something when code is read
            alert(decodedText)
        },
        (errorMessage) => {
            console.error(errorMessage)
        })
      .catch((err) => {
        // Start failed, handle it.
    });
}