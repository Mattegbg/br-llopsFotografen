const startButton = document.querySelector("#start-button");


// Gör att knappen "lyssnar"
startButton.addEventListener('click', () => {
    console.log("Button Working!");
    start();
});


//Gör så att knappen tar oss vidare till en annan sida
function start() {
    window.location.replace("../camera.html");

}
