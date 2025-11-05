const contenedor = document.querySelector(".imagenes");
const imagenes = Array.from(contenedor.children);

const primera = imagenes[0].cloneNode(true);
const ultima = imagenes[imagenes.length - 1].cloneNode(true);

contenedor.appendChild(primera);
contenedor.insertBefore(ultima, imagenes[0]);

const carrouselCompleto = Array.from(contenedor.children);

let desplazamiento = -imagenes[0].clientWidth;
contenedor.style.transform = `translateX(${desplazamiento}px)`;

let velocidad = 2;

function moverCarrousel() {
    desplazamiento -= velocidad;
    contenedor.style.transition = "transform 0s linear";
    contenedor.style.transform = `translateX(${desplazamiento}px)`;

    const anchoImg = carrouselCompleto[0].clientWidth;
    const totalImgs = carrouselCompleto.length;

    if (Math.abs(desplazamiento) >= anchoImg * (totalImgs - 1)) {
        contenedor.style.transition = "none";
        desplazamiento = -anchoImg;
        contenedor.style.transform = `translateX(${desplazamiento}px)`;
    }

    if (desplazamiento > -anchoImg) {
        contenedor.style.transition = "none";
        desplazamiento = -anchoImg * totalImgs;
        contenedor.style.transform = `translateX(${desplazamiento}px)`;
    }

    requestAnimationFrame(moverCarrousel);
}

moverCarrousel();

contenedor.addEventListener("mouseenter", () => (velocidad = 0));
contenedor.addEventListener("mouseleave", () => (velocidad = 3));
