// versión de prueba ahre

let tiempoTrabajo = 60;
let tiempoDescanso = 20
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

const mensajesTrabajo = [
    "¡Hora de descansar! dato 1",
    "¡Hora de descansar! dato 2",
    "¡Hora de descansar! dato 3",
    "¡Hora de descansar! dato 4",
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
}

iniciar.addEventListener("click", iniciarPomodoro);
pausar.addEventListener("click", pausarPomodoro);
reiniciar.addEventListener("click", reiniciarPomodoro);

actualizarDisplay();
