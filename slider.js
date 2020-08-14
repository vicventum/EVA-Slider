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
    // addEventListener('DOMContentLoaded', initialValues)
    addEventListener('DOMContentLoaded', loadImages(imgContainer))
    // addEventListener('resize', resizeSlider)
    slider.addEventListener('click', (e) => {
        // console.log(e.target.id);
        if (e.target.id === 'arrow-next' || e.target.id === 'arrow-prev') moveSlider(e.target.id, imgContainer);
    })

}

// Funciones ------------------------------------------------------------------------------------------------------
const bp = matchMedia(`(max-width: ${sliderSizeX}px)`)
// const bp = matchMedia(`(min-width: 600px})`)

bp.addListener(changeSize) 

function changeSize(mql) {
    if (mql.matches) {
        console.log('--->');
        const widthComp = parseInt((getComputedStyle(slider).width).slice(0, -2))
        console.log(widthComp);

        const cantX = (sliderSizeX - widthComp) * (sliderSizeY / sliderSizeX);
        rootStyles.setProperty('--sizeY', `${Math.ceil(sliderSizeY -  cantX)}px`)
        // rootStyles.setProperty('--sizeY', `${56.25}%`)

    } else {
        // rootStyles.setProperty('--sizeX', `${100}%`)
        // rootStyles.setProperty('--sizeY', `${100}%`)
        rootStyles.setProperty('--sizeY', `${sliderSizeY}px`)
    }
}
console.log(bp);

changeSize(bp)



function loadImages(imgContainer) {
    nImages = [...imgContainer.children]
    nImages.forEach(l => l.style.backgroundImage = `url(${l.dataset.img})`)
}

function moveSlider(id, imgContainer) {
    nImages = imgContainer.children.length;
    // console.log(nImages);
    if (id === 'arrow-next') {
        countImg--;
        if (countImg === -nImages) {
            countImg = 0;
        }
        // console.log("entra1: " + countImg);
        rootStyles.setProperty('--move', `${countImg * 100}%`);
    } else if (id === 'arrow-prev') {
        if (countImg === 0) countImg -= nImages - 1;
        else countImg++;
        // console.log("entra2: " + countImg);
        rootStyles.setProperty('--move', `${countImg * 100}%`);
    }
}