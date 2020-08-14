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
    sliderSizeY = parseInt(rootStylesGet.getPropertyValue('--sizeY'))
    countImg = 0;
console.log("->" + sliderSizeX);

// Eventos --------------------------------------------------------------------------------------------------------
eventListeners();
function eventListeners(){
    // addEventListener('DOMContentLoaded', resizeSlider)
    addEventListener('DOMContentLoaded', loadImages(imgContainer))
    addEventListener('resize', resizeSlider)

    slider.addEventListener('click', (e) => {
        if (e.target.id === 'arrow-next' || e.target.id === 'arrow-prev') 
            moveSlider(e.target.id, imgContainer);
    })

}

// Funciones ------------------------------------------------------------------------------------------------------
const bp = matchMedia(`(max-width: ${sliderSizeX}px)`)
bp.addListener(changeSize) 
changeSize(bp)

function changeSize(mql) {
    if (mql.matches) resizeSlider()
}


function resizeSlider() {
    // current Slider width 
    const widthComp = parseInt((getComputedStyle(slider).width).slice(0, -2))

    if (widthComp <= sliderSizeX) {
        const cantX = (sliderSizeX - widthComp) * (sliderSizeY / sliderSizeX);
        rootStyles.setProperty('--sizeY', `${Math.ceil(sliderSizeY -  cantX)}px`)
    } else {
        rootStyles.setProperty('--sizeY', `${sliderSizeY}px`)
    }
}


function loadImages(imgContainer) {
    nImages = [...imgContainer.children]
    nImages.forEach(l => l.style.backgroundImage = `url(${l.dataset.img})`)
}

function moveSlider(id, imgContainer) {
    const nImages = imgContainer.children.length;

    if (id === 'arrow-next') {
        countImg--;
        if (countImg === -nImages) {
            countImg = 0;
        }
        
        rootStyles.setProperty('--move', `${countImg * 100}%`);
        
    } else if (id === 'arrow-prev') {
        if (countImg === 0) countImg -= nImages - 1;
        else countImg++;
        
        rootStyles.setProperty('--move', `${countImg * 100}%`);
    }
}