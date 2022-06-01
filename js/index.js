const videoElem = document.querySelector("#camera")
const takePictureButton = document.querySelector("#take-picture");
const canvas = document.querySelector("#picture");
const galleryElem = document.querySelector("#gallery");

const videoDiv = document.querySelector('#videoDiv');
const PictureDiv = document.querySelector('#picture-div');
const newPic = document.querySelector('#newPic');

const galleryButton = document.querySelector("#gallery-button")

const ctx = canvas.getContext('2d');
let stream;
let images;

//kollar om det finns bilder sparade sen tidigare och om det finns vill vi se dom.
let imagesFromStorage = JSON.parse(localStorage.getItem('weddingApp'))
if(imagesFromStorage){
    images = imagesFromStorage  // letar efter existerande bilder och lägger ihop nya + gamla
} else {
    images = []; // om inga bilder finns lägger vi till våra nya
}

async function cameraStart(){
    if ('mediaDevices' in navigator) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        console.log(stream);
        videoElem.srcObject = stream;
    }}

    cameraStart();

newPic.addEventListener('click', () => {
    PictureDiv.style.display='none' // göm pictureDiv när vi tar bilden
    videoDiv.style.display='flex' // visa videoDiv när vi tar bilden
})

takePictureButton.addEventListener('click', () => {
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png'); //Gör bilden till PNG
    videoDiv.style.display='none' // göm videoDiv när vi tar bilden
    PictureDiv.style.display='flex' // visa pictureDiv när vi tar bilden

    images.push({
        id: images.length,
        image: imageData


    });
    sendNotif();
    localStorage.setItem('weddingApp', JSON.stringify(images)); //Sparar i local storage
});    

        // Notis när bild tas
    
        var notificationPermission = ""; //spara svaret av notifikationsfrågan.


        function notifs() {
            if (!("Notification" in window)) { // nekar notifikationer för iphone
              alert("This browser does not support desktop notifications");
              return;
            }
            Notification.requestPermission().then(function(result) { // ber om notifikationer
              if (result === 'denied') {
                notificationPermission = "denied";
                console.log("Permission wasn't granted. Allow a retry.");
                return;
              }
              if (result === 'default') {
                notificationPermission = "default";
                console.log('The permission request was dismissed.');
                return;
              }
              notificationPermission = "granted";
              console.log('Permission was granted for notifications');
            });
          }
        
        notifs();
        
          function sendNotif() {
            if (notificationPermission !== "granted") { return; } // har dom godkänt notiser, då kan vi fortsätta
            let text = "Klick! Din bild är nu sparad, klicka här för att se den i galleriet!";
        
            const notification = new Notification('Bröllopsfotografen', {
              body: text,
              //icon: './favicon.ico', // lägg till kamera bild här från figma.
            });
        
            notification.onclick = function() {
              window.open('https://localhost/gallery.html');
            };
          }
    


    






function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../service-worker.js')
        .then(() => { console.log('Registered service worker')})
        .catch (() => { console.log('Could not register service worker') });
    }
}



//Ta sig från kameran till galleri
galleryButton.addEventListener('click', () => {
    console.log("Button Working!");
    gallery();
});


//Gör så att knappen tar oss vidare till en annan sida
function gallery() {
    window.location.href = ("../gallery.html");

}


registerServiceWorker();
