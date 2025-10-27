const imagenes = document.querySelector(".imagenes");
const botonIzquierda = document.getElementById("izquierda");
const botonDerecha = document.getElementById("derecha");
const listaImagenes = document.querySelectorAll(".imagenes img");

let indice = 0;
const total = listaImagenes.length;

function mostrarImagen() {
  const desplazamiento = -indice * listaImagenes[0].clientWidth;
    imagenes.style.transform = `translateX(${desplazamiento}px)`;
    imagenes.style.transition = "transform 0.6s ease";
}

botonDerecha.addEventListener("click", () => {
    indice = (indice + 1) % total;
    mostrarImagen();
});

botonIzquierda.addEventListener("click", () => {
    indice = (indice - 1 + total) % total;
    mostrarImagen();
});

setInterval(() => {
    indice = (indice + 1) % total;
    mostrarImagen();
}, 4000);

window.addEventListener("resize", mostrarImagen);
