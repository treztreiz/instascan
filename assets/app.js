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

import Instascan from 'instascan'

let scanner = new Instascan.Scanner({ 
    video: document.getElementById('preview') 
})

scanner.addListener('scan', function (content) {
    console.log(content);
})

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0])
    } else {
        console.error('No cameras found.')
    }
}).catch(function (e) {
    console.error(e)
})