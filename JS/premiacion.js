const mensajes = [

    "Analizando resultados...",
    "Verificando puntuaciones...",
    "Calculando ganador...",
    "Preparando premiación...",
    "Validando respuestas...",
    "Generando resultados finales..."

];

let indice = 0;

const estadoTexto =
    document.getElementById("estadoTexto");


// CAMBIAR MENSAJES
setInterval(() => {

    indice++;

    if (indice >= mensajes.length) {
        indice = 0;
    }

    estadoTexto.textContent =
        mensajes[indice];

}, 3000);


// CONTADOR
let tiempo = 30;

const contador = document.getElementById("contadorFinal");

const intervalo = setInterval(() => {
    tiempo--;

    contador.textContent = `00:${tiempo < 10 ? "0" + tiempo : tiempo}`;

    if (tiempo <= 0) {
        clearInterval(intervalo);
        window.location.href = "ganadores.html?v=" + Date.now();
    }
}, 1000);