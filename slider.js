/**
 * Algoritmo:
 *  - Dentro del evento resize detectar si el ancho del slider cambia para asi cambiar los valores en las variables CSS
 */
// Se calcula dividiendo el largo entre la altura de la imagen visible en pantalla
// Variables ------------------------------------------------------------------------------------------------------
const slider   = document.getElementById('slider'),
    rootStyles = document.documentElement.style,
    rootStylesGet = window.getComputedStyle(document.documentElement),
    imgContainer = document.getElementById('slider__images');
    
let sliderSizeX = parseInt(rootStylesGet.getPropertyValue('--sizeX')),
    sliderSizeY = parseInt(rootStylesGet.getPropertyValue('--sizeY')),
    countImg=0;
console.log("->" + sliderSizeX);

// Eventos --------------------------------------------------------------------------------------------------------
eventListeners();
function eventListeners(){
    addEventListener('DOMContentLoaded', initialValues)
    addEventListener('DOMContentLoaded', loadImages(imgContainer))
    addEventListener('resize', resizeSlider)
    slider.addEventListener('click', (e) => {
        // console.log(e.target.id);
        if (e.target.id === 'arrow-next' || e.target.id === 'arrow-prev') moveSlider(e.target.id, imgContainer);
    })

}

// Funciones ------------------------------------------------------------------------------------------------------
function initialValues() {
    // cantX = (sliderSizeX - window.innerWidth) * (sliderSizeY / sliderSizeX);
    // cantX =  (sliderSizeY / sliderSizeX);
    // console.log(cantX);
    // console.log(window.innerWidth);
    cantX = (sliderSizeX - window.innerWidth) * (sliderSizeY / sliderSizeX);
       
    if (window.innerWidth <= sliderSizeX) {
        rootStyles.setProperty('--sizeY', `${Math.ceil(sliderSizeY -  cantX)}px`)
        rootStyles.setProperty('--sizeX', `${window.innerWidth}px`)

    }
    // rootStyles.setProperty('--sizeY', `${sliderSizeY}px`);
    // rootStyles.setProperty('--sizeX', `${sliderSizeX}px`);
}
        
function resizeSlider() {
    let cantX, cantY;
    if (window.innerWidth <= sliderSizeX) {
        cantX = (sliderSizeX - window.innerWidth) * (sliderSizeY / sliderSizeX);
        rootStyles.setProperty('--sizeY', `${Math.ceil(sliderSizeY -  cantX)}px`)
        console.log("cantX: " + cantX);
        console.log(Math.ceil(sliderSizeY -  cantX));

    }else {
        // rootStyles.setProperty('--sizeX', `${sliderSizeX}px`)
        // rootStyles.setProperty('--sizeY', `${sliderSizeY}px`)
        rootStyles.setProperty('--sizeX', `${100}%`)
        rootStyles.setProperty('--sizeY', `${sliderSizeY}px`)
    }

    console.log(window.innerWidth);
}

function loadImages(imgContainer) {
    nImages = [...imgContainer.children]
    nImages.forEach(l => l.style.backgroundImage = `url(${l.dataset.img})`)
}

function moveSlider(id, imgContainer) {
    nImages = imgContainer.children.length;
    console.log(nImages);
    if (id === 'arrow-next') {
        countImg--;
        if (countImg === -nImages) {
            countImg = 0;
        }
        console.log("entra1: " + countImg);
        rootStyles.setProperty('--move', `${countImg * 100}%`);
    } else if (id === 'arrow-prev') {
        if (countImg === 0) countImg -= nImages - 1;
        else countImg++;
        console.log("entra2: " + countImg);
        rootStyles.setProperty('--move', `${countImg * 100}%`);
    }
}