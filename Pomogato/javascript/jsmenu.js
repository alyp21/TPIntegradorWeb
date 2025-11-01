const contenedor = document.querySelector(".imagenes");
const imagenes = Array.from(contenedor.children);

imagenes.forEach(img => {
    const clon = img.cloneNode(true);
    contenedor.appendChild(clon);
});

let desplazamiento = 0;
let velocidad = 5;

function moverCarrousel() {
    desplazamiento -= velocidad;

  const anchoTotal = imagenes[0].clientWidth * imagenes.length;

    if (Math.abs(desplazamiento) >= anchoTotal) {
    desplazamiento = 0;
    }

    contenedor.style.transform = `translateX(${desplazamiento}px)`;
    requestAnimationFrame(moverCarrousel);
}

moverCarrousel();

contenedor.addEventListener("mouseenter", () => (velocidad = 0));
contenedor.addEventListener("mouseleave", () => (velocidad = 3));
