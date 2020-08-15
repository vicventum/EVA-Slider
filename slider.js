/**
 * Algoritmo:
 *  - Dentro del evento resize detectar si el ancho del slider cambia para asi cambiar los valores en las variables CSS
 */
// Relacion de Aspecto: 
/* 
    La relación de aspecto es la proporción entre la altura y la anchura. Por ejemplo, 3:2 es una de las proporciones más comunes de la fotografía. Si dividimos 3 entre 2 nos da 1,5. Quiere decir que si multiplicamos el lado menor por 1,5 nos saldrá la medida del lado mayor para seguir con la misma proporción. así descubrimos que 10x15 sigue esta relación de aspecto. Y aquí es donde comienzan los problemas para muchos de nosotros.
*/

// Variables ------------------------------------------------------------------------------------------------------
const proportionX = 16,
    proportionY = 9

const slider = document.getElementById('slider'),
    rootStyles = document.documentElement.style,
    rootStylesGet = window.getComputedStyle(document.documentElement),
    imgContainer = document.getElementById('slider__images');

let sliderSizeX = parseInt(rootStylesGet.getPropertyValue('--sizeX')),
    sliderSizeY = parseInt(rootStylesGet.getPropertyValue('--sizeY'))
countImg = 0;
console.log("->" + sliderSizeX);

// Events --------------------------------------------------------------------------------------------------------

addEventListener('DOMContentLoaded', loadImages(imgContainer))
addEventListener('DOMContentLoaded', resizeSlider)
addEventListener('resize', resizeSlider)

slider.addEventListener('click', (e) => {
    if (e.target.id === 'arrow-next' || e.target.id === 'arrow-prev')
        moveSlider(e.target.id, imgContainer);
})



// Functions ------------------------------------------------------------------------------------------------------
// const bp = matchMedia(`(max-width: ${sliderSizeX}px)`)
// bp.addListener(changeSize)
// changeSize(bp)

// function changeSize(mql) {
//     if (mql.matches) resizeSlider()
// }


function resizeSlider() {
    // current Slider width 
    const widthComputed = parseInt((getComputedStyle(slider).width).slice(0, -2))
    
    // const cantX = (sliderSizeX - widthComputed) * (sliderSizeY / sliderSizeX);
    // const cantX = (sliderSizeX - widthComputed) * (9 / 16);
    // const cantX = (widthComputed) * (sliderSizeY / sliderSizeX);
    // const cantX = (widthComputed) * (900 / 900);

    const widthContainer = parseInt(getComputedStyle(slider).width.slice(0, -2))
    const cantX = (widthComputed) * (proportionY / proportionX);
    rootStyles.setProperty('--sizeY', `${cantX}px`)
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