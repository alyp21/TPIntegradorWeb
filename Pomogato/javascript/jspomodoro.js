let tiempoTrabajo = 1500;
let tiempoDescanso = 300;
let tiempoActual = tiempoTrabajo;
let enDescanso = false;
let temporizador = null;

const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");
const iniciar = document.getElementById("iniciar");
const pausar = document.getElementById("pausar");
const reiniciar = document.getElementById("reiniciar");
const mensaje = document.getElementById("mensaje");
const audioMiau = document.getElementById("gatitomiau");

const estadoGuardado = JSON.parse(localStorage.getItem("pomogatoEstado"));
if (estadoGuardado) {
  tiempoActual = estadoGuardado.tiempoActual;
  enDescanso = estadoGuardado.enDescanso;
  mensaje.textContent = estadoGuardado.mensajeTexto || "";
}
const mensajesTrabajo = [
    "¡Hora de descansar!" + "\n El protagonista (Heroe) tuvo varias inspiraciones reales" + "\n que ayudaron a desarrollar Stray.",
    "¡Hora de descansar!" + "\n Stray y Travel Cat tuvieron un acuerdo para sacar productos" + "\n especialmente para los felinos reales.",
    "¡Hora de descansar!" + "\n El juego esta ayudando a recaudar fondos para ayudar," + "\n a los gatos callejeros en la vida real. 🐾",
    "¡Hora de descansar!" + "\n Stray actualmente  esta en el top numero 1 en las" + "\n listas de juegos mas vendidos en Steam. ",
];

const mensajesDescanso = [
    "Descanso terminado, volvamos al trabajo! 🐈‍⬛",
    "Descanso terminado, volvamos al trabajo! 🐈‍⬛",
    "Descanso terminado, volvamos al trabajo! 🐈‍⬛",
    "Descanso terminado, volvamos al trabajo! 🐈‍⬛",
];

function mensajeAleatorio(lista) {
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
}

function actualizarDisplay() {
    let min = Math.floor(tiempoActual / 60);
    let seg = tiempoActual % 60;
    minutos.textContent = min.toString().padStart(2, "0");
    segundos.textContent = seg.toString().padStart(2, "0");
}


function iniciarPomodoro() {
    if (temporizador) return;
    temporizador = setInterval(() => {
        tiempoActual--;
        actualizarDisplay();

        if (tiempoActual <= 0) {
            clearInterval(temporizador);
            temporizador = null;
            audioMiau.play(); // tengo q buscar eso

            if (!enDescanso) {
                mensaje.textContent = mensajeAleatorio(mensajesTrabajo);
                enDescanso = true;
                tiempoActual = tiempoDescanso;
                setTimeout(iniciarPomodoro, 3000);
            } else {
                mensaje.textContent = mensajeAleatorio(mensajesDescanso);
                enDescanso = false;
                tiempoActual = tiempoTrabajo;
            }
        }
    }, 1000);
}

function pausarPomodoro() {
    clearInterval(temporizador);
    temporizador = null;
}

function reiniciarPomodoro() {
    clearInterval(temporizador);
    temporizador = null;
    enDescanso = false;
    tiempoActual = tiempoTrabajo;
    mensaje.textContent = "";
    actualizarDisplay();
    localStorage.removeItem("pomogatoEstado");
}

iniciar.addEventListener("click", iniciarPomodoro);
pausar.addEventListener("click", pausarPomodoro);
reiniciar.addEventListener("click", reiniciarPomodoro);

actualizarDisplay();

window.addEventListener("beforeunload", () => {
    const estado = {
    tiempoActual,
    enDescanso,
    mensajeTexto: mensaje.textContent,
    };
    localStorage.setItem("pomogatoEstado", JSON.stringify(estado));
});
