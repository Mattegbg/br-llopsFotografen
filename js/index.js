const cameraButton = document.querySelector("#start-camera");
const videoElem = document.querySelector("#camera")
const takePictureButton = document.querySelector("#take-picture");
const canvas = document.querySelector("#picture");
const galleryElem = document.querySelector("#gallery");

const ctx = canvas.getContext('2d');
let stream;
const images = [];

cameraButton.addEventListener('click', async () => {
    if ('mediaDevices' in navigator) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        console.log(stream);
        videoElem.srcObject = stream;
    }

});

takePictureButton.addEventListener('click', () => {
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png'); //Gör bilden till PNG

    images.push({
        id: images.length,
        image: imageData
    });


    localStorage.setItem('weddingApp', JSON.stringify(images)); //Sparar i local storage
});

function createImage(image) {
    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image.image);

    galleryElem.append(imageElem); //Lägger in i galleriet
}

function getImages() {
    const images = JSON.parse(localStorage.getItem('weddingApp'));

    for (const image of images) {
        createImage(image);
    }
}




function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../service-worker.js')
        .then(() => { console.log('Registered service worker')})
        .catch (() => { console.log('Could not register service worker') });
    }
}


registerServiceWorker();
getImages();