const startButton = document.querySelector("#start-button");



startButton.addEventListener('click', () => {
    console.log("Button Working!");
    start();
});



function start() {
    window.location.replace("../camera.html");

}
