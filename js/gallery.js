const galleryElem = document.querySelector("#gallery");
const cameraButton = document.querySelector("#camera-button");

const images = JSON.parse(localStorage.getItem('weddingApp')); // läggs utanför alla funktioner för att allt skall kunna nå denna

//Hämtar från localstorage
function createImage(image) {
    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image.image);

    //skapar knapp för att ta bort bilder
    const deleteButton = document.createElement('button'); // skapar knappen = behövs ej göras ngt i HTML filen. 
    deleteButton.addEventListener('click', () => {
        console.log('picture deleted')
        imageElem.remove();
        deleteButton.remove(); // tar bort knappen efter att bilden raderas
        console.log(image);
        console.log(images);
        let newArr = images.filter(imageInFilter =>   //inageInFilter = går igenom alla bilders ID när dom raderas. Alla bilder vi vill behålla ligger i newArr

            image.image != imageInFilter.image  //Jag vill inte behålla den bilden jag just tog bort

        )
        console.log(newArr);
        localStorage.setItem('weddingApp', JSON.stringify(newArr))
    })

    galleryElem.append(imageElem); //Lägger in i galleriet
    galleryElem.append(deleteButton); // Lägger till deleteButton/knappen 

}

function getImages() {

    for (const image of images) {
        createImage(image);
    }
}





//Ta sig från galleri till kamera
cameraButton.addEventListener('click', () => {
    console.log("Button Working!");
    camera();
});


//Gör så att knappen tar oss vidare till en annan sida
function camera() {
    window.location.href = ("../camera.html");

}



getImages();